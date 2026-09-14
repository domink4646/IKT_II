import input from "./input.js";

async function firstfiveChars() {
  let firstfive = await input("Enter a string: ");
  return firstfive.slice(0, 5);
}

console.log(await firstfiveChars());

async function fromthirdToEighthChar() {
  let thirdToEighth = await input("Enter a string: ");
  return thirdToEighth.slice(2, 8);
}

console.log(await fromthirdToEighthChar());

async function fromFifth() {
  let fromFifth = await input("Enter a string: ");
  return fromFifth.slice(4);
}

console.log(await fromFifth());

async function fromFifthSixLength() {
  let fromFifthSixth = await input("Enter a string: ");
  return fromFifthSixth.slice(4, 10);
}

console.log(await fromFifthSixLength());

async function upperCase() {
  let upper = await input("Enter a string: ");
  return upper.toUpperCase();
}

console.log(await upperCase());

async function everySecondUpper() {
  let everySecond = await input("Enter a string: ");
  for (let i = 0; i < everySecond.length; i++) {
    if (i % 2 === 0) {
      everySecond =
        everySecond.substring(0, i) +
        everySecond.charAt(i).toUpperCase() +
        everySecond.substring(i + 1);
    }
  }
  return everySecond;
}

console.log(await everySecondUpper());

async function everyE_Upper() {
  let everyE = await input("Enter a string: ");
  for (let i = 0; i < everyE.length; i++) {
    if (everyE.charAt(i).toLowerCase() === "e") {
      everyE =
        everyE.substring(0, i) +
        everyE.charAt(i).toUpperCase() +
        everyE.substring(i + 1);
    }
  }
  return everyE;
}

console.log(await everyE_Upper());

async function splitE() {
  let splitE = await input("Enter a string: ");
  let splitArray = splitE.split("e");
  return splitArray;
}

console.log(await splitE());
