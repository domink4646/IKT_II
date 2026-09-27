function getOtoslottoSzamok() {
  const szamok = [];
  while (szamok.length < 5) {
    const szam = Math.floor(Math.random() * 90) + 1;
    if (!szamok.includes(szam)) {
      szamok.push(szam);
    }
  }
  return szamok;
}

function getSortedNumbers(numbers) {
  return numbers.sort((a, b) => a - b);
}

function getTalalatok(otoslottoSzamok, tippSzamok) {
  let talalatokSzama = 0;
  for (let i = 0; i < tippSzamok.length; i++) {
    if (otoslottoSzamok.includes(tippSzamok[i])) {
      talalatokSzama++;
    }
  }
  return talalatokSzama;
}

function getHaviLottoSzamok() {
  const haviSzamok = [];
  for (let i = 0; i < 4; i++) {
    haviSzamok.push(getOtoslottoSzamok());
  }
  return haviSzamok;
}

function getHaviKihuzottSzamok(haviSzamok) {
  const kihuzottSzamok = new Set();
  for (let i = 0; i < haviSzamok.length; i++) {
    for (let j = 0; j < haviSzamok[i].length; j++) {
      kihuzottSzamok.add(haviSzamok[i][j]);
    }
  }
  return Array.from(kihuzottSzamok).sort((a, b) => a - b);
}

function haviStatisztika(haviSzamok) {
  const statisztika = [];
  for (let i = 0; i < haviSzamok.length; i++) {
    const kihuzottSzamok = getHaviKihuzottSzamok(haviSzamok);
    for (let j = 0; j < haviSzamok[i].length; j++) {
      const szam = {
        szam: haviSzamok[i][j],
        kihuzasokSzama: kihuzottSzamok.includes(haviSzamok[i][j]) ? 1 : 0,
      };
      statisztika.push(szam);
    }
  }
  return statisztika;
}

b = getHaviLottoSzamok();
a = getHaviKihuzottSzamok(b);
console.log(b);
console.log(a);
console.log(haviStatisztika(b));
