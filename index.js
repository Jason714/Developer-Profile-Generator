const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const generateHTML = require("./generateHTML")




inquirer.prompt([
    {
        type: "input",
        name: "name",
        message: "What is your github user name?"
    },
    {
        type: "checkbox",
        message: "Choose a color for your background",
        name: "color",
        choices: [
            "Green",
            "Blue",
            "Pink",
            "Red"
        ]
    }
])
function writeToFile(fileName, data) {

}

function init() {
}

init();
