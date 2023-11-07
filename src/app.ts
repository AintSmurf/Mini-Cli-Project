#!/usr/bin/env node
import { Command } from "commander";
import { palindrome, checkLowerCase, checkifItsNumber, checkifItsArmStrong } from "./utils/utils.js";
import { CountriesApiService } from "./utils/requests.js"
import { createInterface } from 'readline';

const program = new Command();
const cas = new CountriesApiService();

program
    .option('-1, --Palindrome', 'Check if input is Palindrome.')
    .option('-2, --Lower', 'Check if all the characters in the input are lowercase.')
    .option('-3, --Digits', 'Check if all the characters in the input are digits.')
    .option('-4, --ArmStrong', 'Check if the input is "Arm Strong" number.')
    .option('-5, --Nationalize', 'Check nationality probability of given first name.')
    .option('-6, --Exit', 'Close the application.')
    .description("Cli with TypeScript");

program.parse(process.argv);

const options = program.opts();

async function handleUserInput() {
    const inputNumber = parseInt(options[0]);
    const inputString = options[1] || "";

    if (isNaN(inputNumber)) {
        console.log("Invalid input. Please provide a valid number.");
    } else {
        switch (inputNumber) {
            case 1:
                console.log(`Result ${palindrome(inputString)}`);
                break;
            case 2:
                console.log(`Result ${checkLowerCase(inputString)}`);
                break;
            case 3:
                console.log(`Result ${checkifItsNumber(inputString)}`);
                break;
            case 4:
                console.log(`Result ${checkifItsArmStrong(inputString)}`);
                break;
            case 5:
                const result = await cas.getCountryByName(inputString);
                console.log(`Result ${result}`);
                break;
            case 6:
                console.log("Exiting the application...");
                process.exit();
                break;
            default:
                console.log("No valid option specified.");
                break;
        }
    }
}

const readline = createInterface({
    input: process.stdin,
    output: process.stdout
});

async function getUserInput() {
    const option = await new Promise((resolve) => {
        readline.question('Enter option (1-6): ', (input) => {
            resolve(input);
        });
    });

    if (typeof option === 'string') {
        options[0] = parseInt(option);
        if (options[0] > 6) {
            console.error("Enter valid Number (1-6)");
            getUserInput()

        }
    }

    if (option === '6') {
        readline.close();
    } else {
        const string = await new Promise((resolve) => {
            readline.question('Enter your value: ', (input) => {
                resolve(input);
            });
        });
        options[1] = string;
        await handleUserInput();
        getUserInput();
    }
}

getUserInput();
