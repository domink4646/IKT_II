import fs from "fs";
import input from "./input.js";

const fileName = "bedat.txt";

const content = fs.readFileSync(fileName, "utf-8");

let data = content.split("\n");

console.log("2. feladat");



for (let i = 0; i < data.length; i++) {
    data[i] = data[i].split(" ");
    data[i][0] = data[i][0]
    data[i][1] = (data[i][1]).split(":").map(Number);
    data[i][1] = parseInt(data[i][1][0]) * 60 + parseInt(data[i][1][1]);
    data[i][2] = parseInt(data[i][2]);
}

function padStart(str, length, padChar) {
    str = str.toString();
    while (str.length < length) {
        str = padChar + str;
    }
    return str;
}

console.log(`Az első tanuló ${padStart((data[0][1]) / 60, 2, '0')}:${padStart((data[0][1]) % 60, 2, '0')}-kor lépett be a főkapun.`);
console.log(`Az utolsó tanuló ${padStart(((data[data.length - 1][1]) / 60).toFixed(0) - 1, 2, '0')}:${padStart((data[data.length - 1][1]) % 60, 2, '0')}-kor lépett ki a főkapun.`);

const kesok = {
    tanulo: "",
    ido: ""
};

let menzasokSzama = 0;

let kolcsonzok = [];
let szunet_Elott = [];
let kiszoktek = [];

fs.writeFileSync("kesok.txt", "", "utf-8");

for (let i = 0; i < data.length; i++) {
    if (data[i][1] > 470 && data[i][1] < 496) {
        kesok.tanulo = data[i][0];
        kesok.ido = `${padStart(Math.floor((data[i][1]) / 60), 2, '0')}:${padStart((data[i][1]) % 60, 2, '0')}`;
        fs.appendFileSync("kesok.txt", `${kesok.ido} ${kesok.tanulo}\n`, "utf-8");
    }
    if (data[i][2] == 3) {
        menzasokSzama++;
    }
    if (data[i][2] == 4) {
        if (!kolcsonzok.includes(data[i][0])) {
            kolcsonzok.push(data[i][0]);
        }
    }
    if (data[i][2] == 1 && data[i][1] < 645) {
        szunet_Elott.push(data[i][0]);
    }
    if (szunet_Elott.includes(data[i][0]) && data[i][2] == 1 && data[i][1] >= 650 && data[i][1] < 661) {
        kiszoktek.push(data[i][0]);
    }
}

console.log(`${kiszoktek}`);


console.log(`A menzán aznap ${menzasokSzama} tanuló ebédelt.`);
console.log(`A kölcsönzők száma: ${kolcsonzok.length}`);
console.log(`${kolcsonzok.length > menzasokSzama ? "Többen voltak, mint a menzán." : "Nem voltak többen, mint a menzán."}`);

console.log(data);


