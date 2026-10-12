const STORAGE_KEY = "repuloJaratok";

const form = document.getElementById("jaratHozzaadasForm");
const lista = document.getElementById("jaratLista");
const jaratIdInput = document.getElementById("jaratId");
const statusMessage = document.getElementById("statusMessage");
const formMode = document.getElementById("formMode");
const submitButton = document.getElementById("submitButton");
const cancelButton = document.getElementById("cancelButton");
const flightCount = document.getElementById("flightCount");

const mezok = {
  jaratSzam: document.getElementById("jaratSzam"),
  indulasiIdo: document.getElementById("indulasiIdo"),
  erkezesiIdo: document.getElementById("erkezesiIdo"),
  indulasiHely: document.getElementById("indulasiHely"),
  erkezesiHely: document.getElementById("erkezesiHely"),
};

let objRepuloJaratok = betoltAdatokat();

function betoltAdatokat() {
  const mentettAdatok = localStorage.getItem(STORAGE_KEY);

  if (!mentettAdatok) {
    return uresJaratLista();
  }

  try {
    const adatok = JSON.parse(mentettAdatok);

    if (adatok && Array.isArray(adatok.atszallasok)) {
      return adatok;
    }
  } catch (error) {
    console.error("A mentett járatok betöltése sikertelen:", error);
  }

  return uresJaratLista();
}

function uresJaratLista() {
  return {
    id: 1,
    jaratSzam: "",
    indulasiIdo: "",
    erkezesiIdo: "",
    indulasiHely: "",
    erkezesiHely: "",
    atszallasok: [],
  };
}

function mentsdAzAdatokat() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(objRepuloJaratok));
}

function olvasdKiAzUrlapAdatokat() {
  return Object.fromEntries(
    Object.entries(mezok).map(([nev, mezo]) => [nev, mezo.value.trim()]),
  );
}

function toltsdKiAzUrlapot(jarat) {
  Object.entries(mezok).forEach(([nev, mezo]) => {
    mezo.value = jarat[nev];
  });
}

function jaratHozzaadasa(event) {
  event.preventDefault();

  if (!form.reportValidity()) {
    return;
  }

  const szerkesztettId = Number(jaratIdInput.value);
  const ujJarat = {
    ...olvasdKiAzUrlapAdatokat(),
    id: szerkesztettId || Date.now(),
  };

  if (jaratSzamMarLetezik(ujJarat, szerkesztettId)) {
    mutassUzenetet("Ez a járatszám már szerepel a listában.", true);
    return;
  }

  if (szerkesztettId) {
    frissitsdAJaratot(ujJarat);
  } else {
    objRepuloJaratok.atszallasok.push(ujJarat);
  }

  mentsdAzAdatokat();
  jelenitsdMegAJaratokat();
  alaphelyzetbeAllit();
  mutassUzenetet(
    szerkesztettId
      ? "A járat módosításai elmentve."
      : "A járat hozzáadva és elmentve.",
  );
}

function jaratSzamMarLetezik(jarat, kivetelId) {
  return objRepuloJaratok.atszallasok.some(
    (mentettJarat) =>
      mentettJarat.jaratSzam.toLowerCase() === jarat.jaratSzam.toLowerCase() &&
      mentettJarat.id !== kivetelId,
  );
}

function frissitsdAJaratot(frissitettJarat) {
  const index = objRepuloJaratok.atszallasok.findIndex(
    (jarat) => jarat.id === frissitettJarat.id,
  );

  if (index !== -1) {
    objRepuloJaratok.atszallasok[index] = frissitettJarat;
  }
}

function jaratModositas(id) {
  const jarat = keresdMegAJaratot(id);

  if (!jarat) {
    return;
  }

  toltsdKiAzUrlapot(jarat);
  jaratIdInput.value = id;
  valtsModositasiModusra(true);
  mezok.jaratSzam.focus();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function jaratTorles(id) {
  objRepuloJaratok.atszallasok = objRepuloJaratok.atszallasok.filter(
    (jarat) => jarat.id !== id,
  );

  mentsdAzAdatokat();
  jelenitsdMegAJaratokat();
  mutassUzenetet("A járat törölve lett.");
}

function keresdMegAJaratot(id) {
  return objRepuloJaratok.atszallasok.find((jarat) => jarat.id === id);
}

function valtsModositasiModusra(aktiv) {
  formMode.textContent = aktiv ? "Szerkesztés" : "Új járat";
  submitButton.textContent = aktiv ? "Mentés" : "Hozzáadás";
  cancelButton.hidden = !aktiv;
}

function alaphelyzetbeAllit() {
  form.reset();
  jaratIdInput.value = "";
  valtsModositasiModusra(false);
}

function jelenitsdMegAJaratokat() {
  lista.replaceChildren();
  flightCount.textContent = `${objRepuloJaratok.atszallasok.length} járat`;

  if (objRepuloJaratok.atszallasok.length === 0) {
    lista.innerHTML =
      '<div class="empty-state">Még nincs mentett járat. Töltsd ki a fenti űrlapot az első hozzáadásához.</div>';
    return;
  }

  objRepuloJaratok.atszallasok.forEach((jarat) => {
    lista.appendChild(keszitsJaratKartyat(jarat));
  });
}

function keszitsJaratKartyat(jarat) {
  const kartya = document.createElement("article");
  kartya.className = "flight-card";
  kartya.innerHTML = `
    <div class="flight-route">
      <span>${escapeHtml(jarat.indulasiHely)}</span>
      <b>→</b>
      <span>${escapeHtml(jarat.erkezesiHely)}</span>
    </div>
    <strong class="flight-number">${escapeHtml(jarat.jaratSzam)}</strong>
    <div class="flight-times">
      <span>Indulás<br><b>${formatDatum(jarat.indulasiIdo)}</b></span>
      <span>Érkezés<br><b>${formatDatum(jarat.erkezesiIdo)}</b></span>
    </div>
    <div class="card-actions">
      <button class="button button-secondary" type="button" data-edit="${jarat.id}">
        Módosítás
      </button>
      <button class="button button-danger" type="button" data-delete="${jarat.id}">
        Törlés
      </button>
    </div>
  `;

  return kartya;
}

function formatDatum(datum) {
  return new Intl.DateTimeFormat("hu-HU", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(datum));
}

function escapeHtml(value) {
  const karakterek = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };

  return String(value).replace(/[&<>"']/g, (karakter) => karakterek[karakter]);
}

function mutassUzenetet(szoveg, hiba = false) {
  statusMessage.textContent = szoveg;
  statusMessage.className = `status-message ${hiba ? "error" : "success"}`;

  setTimeout(() => {
    statusMessage.textContent = "";
    statusMessage.className = "status-message";
  }, 3500);
}

form.addEventListener("submit", jaratHozzaadasa);

cancelButton.addEventListener("click", alaphelyzetbeAllit);

document
  .getElementById("displayButton")
  .addEventListener("click", jelenitsdMegAJaratokat);

lista.addEventListener("click", (event) => {
  const szerkesztesGomb = event.target.closest("[data-edit]");
  const torlesGomb = event.target.closest("[data-delete]");

  if (szerkesztesGomb) {
    jaratModositas(Number(szerkesztesGomb.dataset.edit));
  }

  if (torlesGomb && confirm("Biztosan törlöd ezt a járatot?")) {
    jaratTorles(Number(torlesGomb.dataset.delete));
  }
});

jelenitsdMegAJaratokat();
