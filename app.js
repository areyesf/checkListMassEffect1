//Selectors***********************************
const mainListElement = document.getElementById("main-list");
const secondaryListElement = document.getElementById("secondary-list");

//EventsListener***********************************
document.addEventListener("DOMContentLoaded", validateLocalData);
mainListElement.addEventListener("click", checkUncheck);
secondaryListElement.addEventListener("click", checkUncheck);

//Variables***********************************
let dataInLocalStorage = localStorage.getItem("MISSIONES-MASS-EFFECT");
let missionsList =
  dataInLocalStorage == false ? [] : JSON.parse(dataInLocalStorage);

//funciones***********************************

// initial load
function validateLocalData() {
  if (missionsList) {
    displayMissions();
  } else {
    getJson();
    location.reload;
    displayMissions();
  }
}

//get the local json file
function getJson() {
  fetch("./misiones.json")
    .then((response) => response.json())
    .then((data) => {
      missionsList = data;
      updateLocalStorage();
    })
    .catch((error) => console.log(error));
}

// display missions
function displayMissions() {
  mainListElement.innerHTML = "";
  secondaryListElement.innerHTML = "";

  const mainMissions = missionsList.principales;
  const secondaryMission = missionsList.secundarias;

  const typeInsertAdjacent = "beforeend";
  let idProperty = 0;

  //create elements to main mission
  mainMissions.forEach((element) => {
    const missionStatus = missionsList.principales[idProperty].status
      ? "completed"
      : "uncompleted";

    const iconStatusMain = missionsList.principales[idProperty].status
      ? '<i class="fas fa-check"></i>'
      : '<i class="fas fa-star"></i>';

    const liHtml = `<li id="${idProperty}" class=${missionStatus}>${iconStatusMain} ${element.titulo}</li>`;

    mainListElement.insertAdjacentHTML(typeInsertAdjacent, liHtml);

    idProperty++;
  });

  //create elements to secondary missions
  secondaryMission.forEach((element, index) => {
    const newLi = document.createElement("li");
    const newH4 = document.createElement("h4");
    const newUl = document.createElement("ul");

    newLi.appendChild(newH4);
    newLi.appendChild(newUl);
    newLi.setAttribute("id", index);

    newH4.innerText = element.titulo;

    secondaryListElement.appendChild(newLi);

    const missions = element.misiones;

    missions.forEach((element, index) => {
      const newLi = document.createElement("li");

      newUl.appendChild(newLi);
      newLi.setAttribute("id", index);

      if ((missionStatus = element.status)) {
        newLi.classList.toggle("completed");
      }else{
        newLi.classList.toggle("uncompleted");
      }

      const iconStatusSecondary = element.status
        ? '<i class="fas fa-check"></i>'
        : '<i class="fas fa-circle"></i>';

      newLi.innerHTML = `${iconStatusSecondary}${element.titulo}`;
    });
  });
}

// updata the data in local storage
function updateLocalStorage() {
  localStorage.setItem("MISSIONES-MASS-EFFECT", JSON.stringify(missionsList));
}

// reset local storage
function resetLocal() {
  if (missionsList) {
    localStorage.clear();
    location.reload();
  }
}
//completed
function checkUncheck(e) {
  const idMission = e.target.id;
  const idSecondary = e.target.parentElement.parentElement.id;

  if (e.target.parentElement.id == "main-list") {
    const statusMainMission = missionsList.principales[idMission].status;

    if (statusMainMission) {
      missionsList.principales[idMission].status = false;
    } else {
      missionsList.principales[idMission].status = true;
    }
  } else if (
    e.target.parentElement.parentElement.parentElement.id == "secondary-list"
  ) {
    const statusSecondaryMission =
      missionsList.secundarias[idSecondary].misiones[idMission].status;

    if (statusSecondaryMission) {
      missionsList.secundarias[idSecondary].misiones[idMission].status = false;
    } else {
      missionsList.secundarias[idSecondary].misiones[idMission].status = true;
    }
  }

  updateLocalStorage();
  displayMissions();
}
