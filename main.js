"use strict";
// Shorten the name of document.querySelector
const dQS = (selector) => document.querySelector(selector);
// Select necessary DOM elements
const textArea = dQS("textarea#text");
const aCountTd = dQS("td#a-count");
const eCountTd = dQS("td#e-count");
const iCountTd = dQS("td#i-count");
const oCountTd = dQS("td#o-count");
const uCountTd = dQS("td#u-count");
const totalCountTd = dQS("td#total-count");
const visualResultP = dQS("p#visual-result");
// Update visual result
function updateVisualResult(vowels) {
    // Split the text to array of characters
    let result = vowels.text.split("");
    vowels.indexes.forEach((i) => {
        // Wrap an span tag around the vowel character
        result[i] = `<span class="vowel">${result[i]}</span>`;
    });
    // Update the element
    visualResultP.innerHTML = result.join("");
}
// Update vowel table
function updateTable(vowels) {
    aCountTd.innerText = vowels.a.toString();
    eCountTd.innerText = vowels.e.toString();
    iCountTd.innerText = vowels.i.toString();
    oCountTd.innerText = vowels.o.toString();
    uCountTd.innerText = vowels.u.toString();
    totalCountTd.innerText = vowels.total.toString();
}
function update() {
    // Get the text which is entered in the text area
    const text = textArea.value;
    // Regular expression that matches vowel characters
    const regex = /(a|e|i|o|u)/gi;
    // An object witch holds info about the result
    const vowels = {
        text: text,
        a: 0,
        e: 0,
        i: 0,
        o: 0,
        u: 0,
        total: 0,
        indexes: [],
    };
    let match = null;
    let letter;
    while (true) {
        match = regex.exec(text);
        if (!match)
            break;
        // Store matched letter inside the letter variable
        letter = match[0].toLowerCase();
        // Increase the counter of the corresponding letter
        vowels[letter]++;
        // Increase the total vowel counter
        vowels.total++;
        // Store it's index
        vowels.indexes.push(match.index);
    }
    updateTable(vowels);
    updateVisualResult(vowels);
    //return vowels;
}
// Listen for the keyup event
textArea === null || textArea === void 0 ? void 0 : textArea.addEventListener("keyup", update);
// Update once on page load with the default text
textArea.value = "It updates as you type.";
update();
