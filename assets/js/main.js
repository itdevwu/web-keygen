// Copyright 2024 itdevwu

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at

//   http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { getRandomSequence, getRandomHex } from "./rng.js";
import { fullBip39WordList } from "./bip39.js";

document.addEventListener("DOMContentLoaded", () => {
    const passwordTab = document.getElementById("password-tab");
    const keyTab = document.getElementById("key-tab");
    const passwordContent = document.getElementById("password-content");
    const keyContent = document.getElementById("key-content");

    const lengthInput = document.getElementById("length");
    const lengthRange = document.getElementById("length-range");
    const uppercaseCheckbox = document.getElementById("uppercase");
    const lowercaseCheckbox = document.getElementById("lowercase");
    const numbersCheckbox = document.getElementById("numbers");
    const symbolsCheckbox = document.getElementById("symbols");
    const avoidAmbiguousCheckbox = document.getElementById("avoidAmbiguous");
    const generateButton = document.getElementById("generate");
    const passwordTextarea = document.getElementById("password");
    const copyButton = document.getElementById("copy");

    const bip39WordsSelect = document.getElementById("bip39-words");
    const hexLengthSelect = document.getElementById("hex-length");
    const keyTypeBip39 = document.getElementById("bip39");
    const keyTypeHex = document.getElementById("hex");
    const generateKeyButton = document.getElementById("generate-key");
    const keyTextarea = document.getElementById("key");
    const copyKeyButton = document.getElementById("copy-key");

    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+[]{}|;:,.<>?";
    const ambiguousChars = "Il1O0";

    // Select alphanumeric characters by default
    if (!uppercaseCheckbox.checked && !lowercaseCheckbox.checked && !numbersCheckbox.checked && !symbolsCheckbox.checked) {
        uppercaseCheckbox.checked = true;
        lowercaseCheckbox.checked = true;
        numbersCheckbox.checked = true;
    }

    // Forbid all of char type checkboxes to be unchecked
    const top4Checkboxes = [uppercaseCheckbox, lowercaseCheckbox, numbersCheckbox, symbolsCheckbox];
    top4Checkboxes.forEach(checkbox => {
        checkbox.addEventListener("change", () => {
            if (top4Checkboxes.every(checkbox => !checkbox.checked)) {
                checkbox.checked = true;
                alert("Please select at least one character type.");
            }
        }
        )
    }
    );

    // Function to adjust textarea height
    function adjustTextareaHeight(textarea) {
        textarea.style.height = "auto"; // Reset height
        textarea.style.height = `${textarea.scrollHeight}px`; // Set height based on content
    }

    // BIP-39 word list
    const bip39WordList = fullBip39WordList;

    // Synchronize length input and range input
    lengthInput.addEventListener("input", () => {
        lengthRange.value = lengthInput.value;
    });
    lengthRange.addEventListener("input", () => {
        lengthInput.value = lengthRange.value;
    });

    lengthInput.addEventListener("change", () => {
        generateButton.click();
        adjustTextareaHeight(passwordTextarea);
    });
    lengthRange.addEventListener("change", () => {
        generateButton.click();
        adjustTextareaHeight(passwordTextarea);
    });

    // Password Generator logic
    generateButton.addEventListener("click", () => {
        let characterPool = "";
        let length = parseInt(lengthInput.value);

        if (uppercaseCheckbox.checked) {
            characterPool += uppercaseChars;
        }
        if (lowercaseCheckbox.checked) {
            characterPool += lowercaseChars;
        }
        if (numbersCheckbox.checked) {
            characterPool += numberChars;
        }
        if (symbolsCheckbox.checked) {
            characterPool += symbolChars;
        }

        if (avoidAmbiguousCheckbox.checked) {
            characterPool = characterPool
                .split("")
                .filter((char) => !ambiguousChars.includes(char))
                .join("");
        }

        if (characterPool === "") {
            alert("Please select at least one character type.");
            return;
        }

        const password = getRandomSequence(length, characterPool);
        passwordTextarea.value = password;
        adjustTextareaHeight(passwordTextarea);
    });

    copyButton.addEventListener("click", () => {
        passwordTextarea.select();
        document.execCommand("copy");
        alert("Password copied to clipboard!");
    });

    // Options change logic
    uppercaseCheckbox.addEventListener("change", () => {
        generateButton.click();
        adjustTextareaHeight(passwordTextarea);
    });
    lowercaseCheckbox.addEventListener("change", () => {
        generateButton.click();
        adjustTextareaHeight(passwordTextarea);
    });
    numbersCheckbox.addEventListener("change", () => {
        generateButton.click();
        adjustTextareaHeight(passwordTextarea);
    });
    symbolsCheckbox.addEventListener("change", () => {
        generateButton.click();
        adjustTextareaHeight(passwordTextarea);
    });
    avoidAmbiguousCheckbox.addEventListener("change", () => {
        generateButton.click();
        adjustTextareaHeight(passwordTextarea);
    });

    // Key Generator logic
    keyTypeBip39.addEventListener("change", () => {
        document.getElementById("bip39-settings").style.display = "block";
        document.getElementById("hex-settings").style.display = "none";

        generateKeyButton.click();
        adjustTextareaHeight(keyTextarea);
    });

    keyTypeHex.addEventListener("change", () => {
        document.getElementById("bip39-settings").style.display = "none";
        document.getElementById("hex-settings").style.display = "block";

        generateKeyButton.click();
        adjustTextareaHeight(keyTextarea);
    });

    // Tab switching logic
    passwordTab.addEventListener("click", () => {
        passwordTab.classList.add("active");
        keyTab.classList.remove("active");
        passwordContent.style.display = "block";
        keyContent.style.display = "none";

        generateButton.click();
        adjustTextareaHeight(passwordTextarea);
    });

    keyTab.addEventListener("click", () => {
        keyTab.classList.add("active");
        passwordTab.classList.remove("active");
        passwordContent.style.display = "none";
        keyContent.style.display = "block";

        // check which key type is selected
        if (keyTypeBip39.checked) {
            document.getElementById("bip39-settings").style.display = "block";
            document.getElementById("hex-settings").style.display = "none";
        } else {
            document.getElementById("bip39-settings").style.display = "none";
            document.getElementById("hex-settings").style.display = "block";
        }

        generateKeyButton.click();
        adjustTextareaHeight(keyTextarea);
    });

    generateKeyButton.addEventListener("click", () => {
        if (keyTypeBip39.checked) {
            const numberOfWords = parseInt(bip39WordsSelect.value);
            const bip39Words = [];
            for (let i = 0; i < numberOfWords; i++) {
                const randomValues = new Uint32Array(1);
                crypto.getRandomValues(randomValues);
                const randomIndex = randomValues[0] % bip39WordList.length;
                bip39Words.push(bip39WordList[randomIndex]);
            }
            const bip39Key = bip39Words.join(" ");
            keyTextarea.value = bip39Key;
            adjustTextareaHeight(keyTextarea);
        } else if (keyTypeHex.checked) {
            const bitLength = parseInt(hexLengthSelect.value);
            const hexKey = getRandomHex(bitLength);
            keyTextarea.value = hexKey;
            adjustTextareaHeight(keyTextarea);
        }
    });

    bip39WordsSelect.addEventListener("change", () => {
        generateKeyButton.click();
        adjustTextareaHeight(keyTextarea);
    });
    hexLengthSelect.addEventListener("change", () => {
        generateKeyButton.click();
        adjustTextareaHeight(keyTextarea);
    });

    copyKeyButton.addEventListener("click", () => {
        keyTextarea.select();
        document.execCommand("copy");
        alert("Key copied to clipboard!");
    });

    // Initial setup
    passwordTab.click();
    generateButton.click();
    adjustTextareaHeight(passwordTextarea);
});
