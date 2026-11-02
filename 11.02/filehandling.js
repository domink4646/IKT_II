import fs from 'fs';

const path = "11.02/szoveg.txt";
let content = "";

try{
    content = fs.readFileSync(path, 'utf-8');
}
catch(err){
    console.error("Hiba a fájl olvasása közben: ", err);
}

console.log("A fájl tartalma: ", content);

const newContent = "Ez egy új sor a fájlban.\n";
try{
    fs.appendFileSync(path, newContent);
    console.log("Sikeresen hozzáadva a fájlhoz.");
}
catch(err){
    console.error("Hiba a fájl írása közben: ", err);
}

console.log("A fájl új tartalma: ", fs.readFileSync(path, 'utf-8'));

try{
    content = fs.readFileSync("adatok.json", 'utf-8');
    console.log("A JSON fájl tartalma: ", content);
    const adatok = JSON.parse(content);
    console.log("A JSON objektum: ", adatok);
    console.log(typeof adatok);
    adatok.id = 123;
    console.log("A módosított JSON objektum: ", adatok);
    content = JSON.stringify(adatok, null, 2);
    fs.writeFileSync("adatok.json", content);
    console.log("A módosított JSON fájl elmentve.");
}
catch(err){
    console.error("Hiba a JSON fájl olvasása közben: ", err);
}