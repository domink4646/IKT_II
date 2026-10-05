const objRepuloJaratok = {
  id: 1,
  jaratSzam: "LH123",
  indulasiIdo: "2024-06-10T08:30:00",
  erkezesiIdo: "2024-06-10T12:45:00",
  indulasiHely: "Budapest",
  erkezesiHely: "Frankfurt",
  atszallasok: [
    {
      id: 1,
      jaratSzam: "LH456",
      indulasiIdo: "2024-06-10T09:30:00",
      erkezesiIdo: "2024-06-10T10:45:00",
      indulasiHely: "Budapest",
      erkezesiHely: "München",
    },
  ],
};

function jaratHozzaadas() {
  const jaratSzam = document.getElementById("jaratSzam").value;
  const indulasiIdo = document.getElementById("indulasiIdo").value;
  const erkezesiIdo = document.getElementById("erkezesiIdo").value;
  const indulasiHely = document.getElementById("indulasiHely").value;
  const erkezesiHely = document.getElementById("erkezesiHely").value;

  const ujJarat = {
    id: objRepuloJaratok.atszallasok.length + 1,
    jaratSzam: jaratSzam,
    indulasiIdo: indulasiIdo,
    erkezesiIdo: erkezesiIdo,
    indulasiHely: indulasiHely,
    erkezesiHely: erkezesiHely,
  };

  objRepuloJaratok.atszallasok.push(ujJarat);
}

function jaratTorles(id) {
  objRepuloJaratok.atszallasok = objRepuloJaratok.atszallasok.filter(
    (jarat) => jarat.id !== id,
  );
}

function jaratModositas(id) {
  const jarat = objRepuloJaratok.atszallasok.find((jarat) => jarat.id === id);
  if (jarat) {
    document.getElementById("jaratSzam").value = jarat.jaratSzam;
    document.getElementById("indulasiIdo").value = jarat.indulasiIdo;
    document.getElementById("erkezesiIdo").value = jarat.erkezesiIdo;
    document.getElementById("indulasiHely").value = jarat.indulasiHely;
    document.getElementById("erkezesiHely").value = jarat.erkezesiHely;
    document.getElementById("jaratId").value = jarat.id;
  }
}

function jaratMentese() {
  const id = parseInt(document.getElementById("jaratId").value);
  const jarat = objRepuloJaratok.atszallasok.find((jarat) => jarat.id === id);
  if (jarat) {
    jarat.jaratSzam = document.getElementById("jaratSzam").value;
    jarat.indulasiIdo = document.getElementById("indulasiIdo").value;
    jarat.erkezesiIdo = document.getElementById("erkezesiIdo").value;
    jarat.indulasiHely = document.getElementById("indulasiHely").value;
    jarat.erkezesiHely = document.getElementById("erkezesiHely").value;
  }
}

function jaratListaMegjelenitese() {
  const jaratLista = document.getElementById("jaratLista");
  jaratLista.innerHTML = "";
  objRepuloJaratok.atszallasok.forEach((jarat) => {
    const jaratElem = document.createElement("div");
    jaratElem.innerHTML = `
      <strong>${jarat.jaratSzam}</strong><br>
      Indulás: ${jarat.indulasiIdo}<br>
      Érkezés: ${jarat.erkezesiIdo}<br>
      Indulási hely: ${jarat.indulasiHely}<br>
      Érkezési hely: ${jarat.erkezesiHely}<br>
      <button onclick="jaratModositas(${jarat.id})">Módosítás</button>
      <button onclick="jaratTorles(${jarat.id})">Törlés</button>
    `;
    jaratLista.appendChild(jaratElem);
  });
}

document
  .getElementById("jaratHozzaadasForm")
  .addEventListener("submit", (event) => {
    event.preventDefault();
    const jaratId = document.getElementById("jaratId").value;
    if (jaratId) {
      jaratMentese();
    } else {
      jaratHozzaadas();
    }
  });

jaratListaMegjelenitese();
document.getElementById("jaratHozzaadasForm").reset();
document.getElementById("jaratId").value = "";
document.getElementById("jaratSzam").focus();
document.getElementById("indulasiIdo").value = "";
document.getElementById("erkezesiIdo").value = "";
document.getElementById("indulasiHely").value = "";
document.getElementById("erkezesiHely").value = "";
