import fs from 'fs';
import input from './input.js';

console.log("1. feladat");

const rendszam = await input("Kérem adja meg az autó azonosítóját: ");
console.log(`Az autó azonosítója: ${rendszam}`);
const content = fs.readFileSync(`${rendszam}.txt`, 'utf8');


let lines = content.trim().split('\n');
let data = [];

for (const line of lines) {
    let row = line.trim().split('\t');
    
    data.push(row.map(Number));
}

console.log("2. feladat");
console.log(`Az autó adatai: ${content}`);

const elindul = data[0][0];
console.log(`Az autó ${elindul} másodpercben indult el`);
const sebesseg = data[data.length - 1][1];
console.log(`Az autó végsebessége: ${sebesseg} km/h`);

console.log("3. feladat");
let atlepte = false;
for (const row of data) {
    if (row[1] > 14) {
        atlepte = true;
        break;
    }
}
console.log(`Az autó ${atlepte ? "átlépte" : "nem lépte át"} a 14 km/h sebességet`);
