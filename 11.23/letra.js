import fs from 'fs';

const fileName = "dobasok.txt";
const fileContent = fs.readFileSync(fileName, 'utf-8');

let dobasok = fileContent.split("\n")[0].replaceAll(' ', '').split(",").map(Number);

let sor = "";
let elotteLevo = 0;
let visszaLepes = 0;

for(let i = 0; i < dobasok.length; i++) {
    let location = elotteLevo + dobasok[i];
    if(location % 10 == 0){
        location -= 3;
        visszaLepes++;
    }
    elotteLevo = location;
    sor+= `${location} `;
}

console.log("2. feladat ");
console.log(sor);

console.log("3. feladat ");

console.log(`A játékos összesen ${visszaLepes} alkalommal lépett letrára.`);

console.log("4. feladat ");
console.log(elotteLevo > 45 ? "A játékot befejezte." : "A játékot abbahagyta.");

console.log("5. feladat ");
let ujDobasok = [];
for(let i = 0; i < 18; i++) {
    ujDobasok.push(Math.floor(Math.random() * 6) + 1);
}

fs.appendFileSync("dobasok.txt", `\n${ujDobasok.join(", ")}`);
console.log("Adatok hozzáadva a fájlhoz.");