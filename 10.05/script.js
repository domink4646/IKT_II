const STORAGE_KEY = "repuloJaratok";
const DEFAULT_DATA_URL = "flights.json";

const form = document.getElementById("jaratHozzaadasForm");
const flightList = document.getElementById("jaratLista");
const flightIdInput = document.getElementById("jaratId");
const statusMessage = document.getElementById("statusMessage");
const formMode = document.getElementById("formMode");
const submitButton = document.getElementById("submitButton");
const cancelButton = document.getElementById("cancelButton");
const flightCount = document.getElementById("flightCount");

const fields = {
  flightNumber: document.getElementById("jaratSzam"),
  departureTime: document.getElementById("indulasiIdo"),
  arrivalTime: document.getElementById("erkezesiIdo"),
  departureLocation: document.getElementById("indulasiHely"),
  arrivalLocation: document.getElementById("erkezesiHely"),
};

let flightData = createEmptyFlightData();
let messageTimeoutId;

function createEmptyFlightData() {
  return { flights: [] };
}

function normalizeFlightData(data) {
  const flights = Array.isArray(data?.flights)
    ? data.flights
    : Array.isArray(data?.atszallasok)
      ? data.atszallasok.map((flight) => ({
          id: flight.id,
          flightNumber: flight.jaratSzam,
          departureTime: flight.indulasiIdo,
          arrivalTime: flight.erkezesiIdo,
          departureLocation: flight.indulasiHely,
          arrivalLocation: flight.erkezesiHely,
        }))
      : null;

  if (!flights) {
    return null;
  }

  return {
    flights: flights
      .filter((flight) => flight && Number.isFinite(Number(flight.id)))
      .map((flight) => ({
        id: Number(flight.id),
        flightNumber: String(flight.flightNumber || "").trim(),
        departureTime: String(flight.departureTime || ""),
        arrivalTime: String(flight.arrivalTime || ""),
        departureLocation: String(flight.departureLocation || "").trim(),
        arrivalLocation: String(flight.arrivalLocation || "").trim(),
      })),
  };
}

function readStoredData() {
  try {
    const storedData = localStorage.getItem(STORAGE_KEY);

    if (!storedData) {
      return null;
    }

    return normalizeFlightData(JSON.parse(storedData));
  } catch (error) {
    console.error("A mentett járatok betöltése sikertelen:", error);
    return null;
  }
}

async function loadFlightData() {
  const storedData = readStoredData();

  if (storedData) {
    return storedData;
  }

  try {
    const response = await fetch(DEFAULT_DATA_URL, { cache: "no-store" });

    if (!response.ok) {
      throw new Error(`A kezdő adatok betöltése sikertelen (${response.status}).`);
    }

    const defaultData = normalizeFlightData(await response.json());

    if (!defaultData) {
      throw new Error("A kezdő adatok formátuma érvénytelen.");
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
    return defaultData;
  } catch (error) {
    console.error("A kezdő járatok betöltése sikertelen:", error);
    return createEmptyFlightData();
  }
}

function saveFlightData() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(flightData));
  } catch (error) {
    console.error("A járatok mentése sikertelen:", error);
    showMessage("A járatok mentése sikertelen.", true);
  }
}

function readFormData() {
  return Object.fromEntries(
    Object.entries(fields).map(([name, field]) => [name, field.value.trim()]),
  );
}

function fillForm(flight) {
  Object.entries(fields).forEach(([name, field]) => {
    field.value = flight[name];
  });
}

function validateFlightTimes(flight) {
  const departure = new Date(flight.departureTime);
  const arrival = new Date(flight.arrivalTime);

  if (Number.isNaN(departure.getTime()) || Number.isNaN(arrival.getTime())) {
    return "Adj meg érvényes indulási és érkezési időt.";
  }

  if (arrival <= departure) {
    return "Az érkezési időnek későbbinek kell lennie az indulási időnél.";
  }

  return "";
}

function handleFormSubmit(event) {
  event.preventDefault();

  if (!form.reportValidity()) {
    return;
  }

  const editedId = Number(flightIdInput.value);
  const updatedFlight = {
    ...readFormData(),
    id: editedId || Date.now(),
  };
  const timeError = validateFlightTimes(updatedFlight);

  if (timeError) {
    showMessage(timeError, true);
    return;
  }

  if (flightNumberExists(updatedFlight, editedId)) {
    showMessage("Ez a járatszám már szerepel a listában.", true);
    return;
  }

  if (editedId) {
    updateFlight(updatedFlight);
  } else {
    flightData.flights.push(updatedFlight);
  }

  saveFlightData();
  renderFlights();
  resetForm();
  showMessage(
    editedId
      ? "A járat módosításai elmentve."
      : "A járat hozzáadva és elmentve.",
  );
}

function flightNumberExists(flight, excludedId) {
  return flightData.flights.some(
    (savedFlight) =>
      savedFlight.flightNumber.toLocaleLowerCase() ===
        flight.flightNumber.toLocaleLowerCase() &&
      savedFlight.id !== excludedId,
  );
}

function updateFlight(updatedFlight) {
  const index = flightData.flights.findIndex(
    (flight) => flight.id === updatedFlight.id,
  );

  if (index !== -1) {
    flightData.flights[index] = updatedFlight;
  }
}

function editFlight(id) {
  const flight = findFlight(id);

  if (!flight) {
    return;
  }

  fillForm(flight);
  flightIdInput.value = id;
  setEditMode(true);
  fields.flightNumber.focus();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function deleteFlight(id) {
  flightData.flights = flightData.flights.filter((flight) => flight.id !== id);
  saveFlightData();
  renderFlights();
  showMessage("A járat törölve lett.");
}

function findFlight(id) {
  return flightData.flights.find((flight) => flight.id === id);
}

function setEditMode(active) {
  formMode.textContent = active ? "Szerkesztés" : "Új járat";
  submitButton.textContent = active ? "Mentés" : "Hozzáadás";
  cancelButton.hidden = !active;
}

function resetForm() {
  form.reset();
  flightIdInput.value = "";
  setEditMode(false);
}

function renderFlights() {
  flightList.replaceChildren();
  flightCount.textContent = `${flightData.flights.length} járat`;

  if (flightData.flights.length === 0) {
    flightList.innerHTML =
      '<div class="empty-state">Még nincs mentett járat. Töltsd ki a fenti űrlapot az első hozzáadásához.</div>';
    return;
  }

  flightData.flights.forEach((flight) => {
    flightList.appendChild(createFlightCard(flight));
  });
}

function createFlightCard(flight) {
  const card = document.createElement("article");
  card.className = "flight-card";
  card.innerHTML = `
    <div class="flight-route">
      <span>${escapeHtml(flight.departureLocation)}</span>
      <b>→</b>
      <span>${escapeHtml(flight.arrivalLocation)}</span>
    </div>
    <strong class="flight-number">${escapeHtml(flight.flightNumber)}</strong>
    <div class="flight-times">
      <span>Indulás<br><b>${formatDate(flight.departureTime)}</b></span>
      <span>Érkezés<br><b>${formatDate(flight.arrivalTime)}</b></span>
    </div>
    <div class="card-actions">
      <button class="button button-secondary" type="button" data-edit="${flight.id}">
        Módosítás
      </button>
      <button class="button button-danger" type="button" data-delete="${flight.id}">
        Törlés
      </button>
    </div>
  `;

  return card;
}

function formatDate(value) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Érvénytelen időpont";
  }

  return new Intl.DateTimeFormat("hu-HU", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function escapeHtml(value) {
  const characters = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };

  return String(value).replace(/[&<>"']/g, (character) => characters[character]);
}

function showMessage(message, isError = false) {
  statusMessage.textContent = message;
  statusMessage.className = `status-message ${isError ? "error" : "success"}`;

  clearTimeout(messageTimeoutId);
  messageTimeoutId = setTimeout(() => {
    statusMessage.textContent = "";
    statusMessage.className = "status-message";
  }, 3500);
}

async function initializeApp() {
  flightData = await loadFlightData();
  renderFlights();
}

form.addEventListener("submit", handleFormSubmit);
cancelButton.addEventListener("click", resetForm);
document
  .getElementById("displayButton")
  .addEventListener("click", renderFlights);

flightList.addEventListener("click", (event) => {
  const editButton = event.target.closest("[data-edit]");
  const deleteButton = event.target.closest("[data-delete]");

  if (editButton) {
    editFlight(Number(editButton.dataset.edit));
  }

  if (deleteButton && confirm("Biztosan törlöd ezt a járatot?")) {
    deleteFlight(Number(deleteButton.dataset.delete));
  }
});

initializeApp();
