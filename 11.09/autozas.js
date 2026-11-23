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
const sebesseg = data[data.length - 1][2];
console.log(`Az autó végsebessége: ${sebesseg} m/s`);

console.log("3. feladat");
let atlepte = false;
for (const row of data) {
    if (row[1] > 14) {
        atlepte = true;
        break;
    }
}
console.log(`Az autó ${atlepte ? "átlépte" : "nem lépte át"} a 14 km/h sebességet`);

console.log("4. feladat");

let all = [0, data[0][0]];
let stop = 0;


for (const row of data) {
    if (row[2] == 0) {
        stop = row[1];
    }
    if (row[2] > 0 && stop != 0) {
        if (row[0] - stop > all[1] - all[0]) {
            all = [stop, row[0]];
        }
        stop = 0;
    }
}

console.log(`A legnagyobb megállás: ${all[1] - all[0]} másodperc, kezdete: ${all[0]} másodperc, vége: ${all[1]} másodperc`); 

console.log("5. feladat");

const idopont = await input("Mikor vizsgáljuk az autó sebességét? ");
    
sebesseg = 0;
let elozo = 0;
for (const row of data) {
    if (row[0] <= idopont && idopont <= row[1]) {
        let [t1,t2,v2] = row;
        let v1 = elozo;
        sebesseg = v1 + (v2-v1) / (t2-t1) * (idopont-t1);
        break;
    }
    if (idopont <= row[0]) {
        sebesseg = elozo;
        break;
    }
    elozo = row[2];
}

console.log(`Az autó sebessége ${idopont} másodperckor: ${sebesseg.toFixed(2)} m/s`);

console.log("6. feladat");

let ut = 0;
let v1 = 0;

for(let row of data) {
    let [t1,t2,v2] = row;
    ut != v1 * (t2 - t1);
    ut += (v1 + v2) / 2 * (t2 - t1);
    v1 = v2;
}

console.log(`Az autó által megtett út: ${ut.toFixed(2)} m`);

console.log("7. feladat");

v1 = 0;

const path = `v${rendszam}.txt`;
fs.writeFileSync(path, '', "utf-8");

for(let row of data){
    fs.appendFileSync(path, `${row[0]}\t${v[1]}\n`, "utf-8");
    fs.appendFileSync(path, `${row[1]}\t${row[2]}\n`, "utf-8");
    v1 = row[2];
}

