//Selectors***********************************
const listElement = document.getElementById("main-list");

//EventsListener***********************************
document.addEventListener("DOMContentLoaded", initialLoad);

//Variables***********************************


//funciones***********************************

// initial load
function initialLoad() {
  const dataInLocalStorage = localStorage.getItem("MISSIONES-MASS-EFFECT");
  if (dataInLocalStorage) {
    // console.log(JSON.parse(dataInLocalStorage));
    const missions = JSON.parse(dataInLocalStorage);
    loadMissions(missions);
  } else {
    getJson();
  }
}

//get the local json file
function getJson() {
  fetch("./misiones.json")
    .then((response) => response.json())
    .then((data) => {
      const missionsList = data;
      updateLocalStorage(missionsList);
      initialLoad();
    })
    .catch((error) => console.log(error));
}

// load data and display it
function loadMissions(data) {
  const mainMissions = data.principales;
  const typeInsertAdjacent = "beforeend";

  mainMissions.forEach((element) => {
    const liHtml = `<li>${element}</li>`;
    listElement.insertAdjacentHTML(typeInsertAdjacent, liHtml);
  });
}

// updata the data in local storage
function updateLocalStorage(missions) {
  localStorage.setItem("MISSIONES-MASS-EFFECT", JSON.stringify(missions));
}

// reset local storage
function resetLocal() {
    localStorage.clear();
    location.reload();
}