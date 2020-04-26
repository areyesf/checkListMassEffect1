//Selectors***********************************
const mainListElement = document.getElementById("main-list");
const secondaryListElement = document.getElementById("secondary-list");
const resetElement = document.getElementById("reset");
const chartElement = document.querySelector(".chart");

//EventsListener***********************************
document.addEventListener("DOMContentLoaded", validateLocalData);
mainListElement.addEventListener("click", checkUncheck);
secondaryListElement.addEventListener("click", checkUncheck);
resetElement.addEventListener("click", resetLocal);

//Variables***********************************
let dataInLocalStorage = localStorage.getItem("MISSIONES-MASS-EFFECT");
let missionsList =
  dataInLocalStorage !== null ? JSON.parse(dataInLocalStorage) : [];
// dataInLocalStorage ? JSON.parse(dataInLocalStorage):{};

//funciones***********************************

// initial load
function validateLocalData() {
  if (dataInLocalStorage !== null) {
    console.log(`dentro del if:`);
    missionsList = JSON.parse(dataInLocalStorage);
  } else {
    console.log("dentro del else");
    getJson();
  }

  displayMissions();
}

//get the local json file
function getJson() {
  fetch("./statics/misiones.json")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      missionsList = data;
      updateLocalStorage();
      location.reload();
    })
    .catch((error) => console.log(error));
}

// display missions
function displayMissions() {
  mainListElement.innerHTML = "";
  secondaryListElement.innerHTML = "";

  const mainMissions = missionsList.principales;
  const secondaryMission = missionsList.secundarias;

  //create elements to main mission
  mainMissions.forEach((element, index) => {
    const newLi = document.createElement("li");
    mainListElement.appendChild(newLi);
    newLi.setAttribute("id", index);
    newLi.classList.toggle("mission");

    if (element.status) {
      newLi.classList.toggle("completed");
    } else {
      newLi.classList.toggle("uncompleted");
    }

    const iconStatusMain = missionsList.principales[index].status
      ? '<i class="fas fa-check"></i>'
      : '<i class="fas fa-star"></i>';

    newLi.innerHTML = `${iconStatusMain}${element.titulo}`;
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
      newLi.classList.toggle("mission");

      newUl.appendChild(newLi);
      newLi.setAttribute("id", index);

      if ((element.status)) {
        newLi.classList.toggle("completed");
      } else {
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
// calculate complete percent

//create chart
const chart = new EasyPieChart(chartElement, {
  // your options goes here
});

//change data chart
function changeChart() {
  const totalMissions = document.querySelectorAll("li").length;
  const numCompleted = document.querySelectorAll(".completed").length;
  console.log(totalMissions);
  console.log(numCompleted);

  // chart.update(50);
}
