function printRightHalfPyramid(size = 5) {
  console.log("Right Half Pyramid");
  for (let i = 1; i <= size; i++) {
    let row = "";
    for (let j = 1; j <= i; j++) {
      row += "* ";
    }
    console.log(row);
  }
}

function printLeftHalfPyramid(size = 5) {
  console.log("\nLeft Half Pyramid");
  for (let i = 1; i <= size; i++) {
    let row = "";
    for (let j = 1; j <= size - i; j++) {
      row += "  ";
    }
    for (let k = 1; k <= i; k++) {
      row += "* ";
    }
    console.log(row);
  }
}

function printFullPyramid(size = 5) {
  console.log("\nFull Pyramid");
  for (let i = 1; i <= size; i++) {
    let row = "";
    for (let j = 1; j <= size - i; j++) {
      row += " ";
    }
    for (let k = 1; k <= i * 2 - 1; k++) {
      row += "*";
    }
    console.log(row);
  }
}

function printInvertedRightHalfPyramid(size = 5) {
  console.log("\nInverted Right Half Pyramid");
  for (let i = size; i >= 1; i--) {
    let row = "";
    for (let j = 1; j <= i; j++) {
      row += "* ";
    }
    console.log(row);
  }
}

function printInvertedLeftHalfPyramid(size = 5) {
  console.log("\nInverted Left Half Pyramid");
  for (let i = size; i >= 1; i--) {
    let row = "";
    for (let j = 1; j <= size - i; j++) {
      row += "  ";
    }
    for (let k = 1; k <= i; k++) {
      row += "* ";
    }
    console.log(row);
  }
}

function printPatterns(size = 5) {
  printRightHalfPyramid(size);
  printLeftHalfPyramid(size);
  printFullPyramid(size);
  printInvertedRightHalfPyramid(size);
  printInvertedLeftHalfPyramid(size);
}

printPatterns();
