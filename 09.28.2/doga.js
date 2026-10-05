function getGrade(s1, s2, s3) {
  const average = (s1 + s2 + s3) / 3;
  if (average >= 90) {
    return "A";
  }
  if (average >= 80) {
    return "B";
  }
  if (average >= 70) {
    return "C";
  }
  if (average >= 60) {
    return "D";
  } else {
    return "F";
  }
}

function findDifference(a, b) {
  let ValueA = a.reduce((acc, curr) => acc * curr, 1);
  let ValueB = b.reduce((acc, curr) => acc * curr, 1);
  return Math.abs(ValueA - ValueB);
}

function pattern1(n) {
  let pattern = "";
  let csillag = "*";
  for (let i = n; i > 0; i--) {
    pattern += csillag.repeat(i).padStart(n, " ") + "\n";
  }
  return pattern;
}

function pattern3(n) {
  let pattern = "";
  for (let i = 1; i <= n; i++) {
    pattern += " ".repeat(n - i) + "*".repeat(2 * i - 1) + "\n";
  }
  return pattern;
}

console.log(getGrade(95, 90, 93));
console.log(getGrade(82, 85, 87));
console.log(getGrade(75, 70, 79));
console.log(getGrade(58, 62, 70));
console.log(getGrade(58, 59, 60));

a = [2, 2, 3];
b = [5, 4, 1];

console.log(findDifference(a, b));

console.log(pattern1(5));

console.log(pattern3(5));
