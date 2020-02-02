const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const generateHTML = require("./generateHTML");
const util = require("util");
const asyncWriteFile = util.promisify(fs.writeFile);
convertFactory = require("electron-html-to");

const questions = [{
    type: "input",
    name: "username",
    message: "What is your Github username?"
},
{
    type: "checkbox",
    name: "color",
    choices: ["green", "blue", "pink", "red"],
    message: "Chose a color for your background."
}];

function prompUser() {
    return inquirer.prompt(questions)
}

function writeToFile(fileName, data) {
    asyncWriteFile(fileName, data)

}

function init() {
    prompUser()
        .then(function (answers) {

            const queryUrl = `https://api.github.com/users/${answers.username}`;
            const starsUrl = `https://api.github.com/users/${answers.username}/starred`;

            axios.get(queryUrl).then((res) => {
                axios.get(starsUrl).then((stars) => {

                    res.data.color = answers.color
                    const html = generateHTML(res, stars);
                    writeToFile("profile.html", html);
                    console.log(res.data);

                    var conversion = convertFactory({
                        converterPath: convertFactory.converters.PDF
                    });

                    conversion({ html: html }, function (err, result) {
                        if (err) {
                            return console.error(err);
                        }

                        console.log(result.numberOfPages);
                        console.log(result.logs);
                        result.stream.pipe(fs.createWriteStream('./profile.pdf'));
                        conversion.kill();
                    });
                })
            })
        })
}
init();
