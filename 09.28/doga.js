function divisors(integer) {
  if (integer < 2) {
    return undefined;
  }

  let divisorsArray = [];

  for (let i = 2; i < integer; i++) {
    if (integer % i == 0) {
      divisorsArray.push(i);
    }
  }
  if (divisorsArray.length === 0) {
    return `${integer} is prime`;
  }
  return divisorsArray;
}

console.log(divisors(12));
console.log(divisors(25));
console.log(divisors(13));

function factorial(n) {
  if (n < 0) {
    return undefined;
  }
  if (n === 0 || n === 1) {
    return 1;
  }
  return n * factorial(n - 1);
}

console.log(factorial(2));
console.log(factorial(3));
console.log(factorial(4));

function fizzbuzz(n) {
  if (n < 1) {
    return undefined;
  } else if (n % 3 === 0 && n % 5 === 0) {
    return "FizzBuzz";
  } else if (n % 3 === 0) {
    return "Fizz";
  } else if (n % 5 === 0) {
    return "Buzz";
  }
  return n;
}

console.log(fizzbuzz(6));
console.log(fizzbuzz(10));
console.log(fizzbuzz(15));
console.log(fizzbuzz(8));

function pattern(n) {
  if (n < 1) {
    return undefined;
  }

  let result = "";

  for (let i = n; i >= 1; i--) {
    for (let j = 1; j <= n - i; j++) {
      result += " ";
    }
    for (let j = 1; j <= 2 * i - 1; j++) {
      if (j === 1 || j === 2 * i - 1 || i === n) {
        result += "*";
      } else {
        result += " ";
      }
    }
    result += "\n";
  }
  return result;
}

console.log(pattern(5));
