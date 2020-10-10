let urlTeams = "https://api.football-data.org/v2/competitions/2002/teams";
let urlCurrentChampion = "https://api.football-data.org/v2/competitions/2002/";
let urlSingleTeam = "https://api.football-data.org/v2/teams/";
let urlSeasons = "";
let token = "6a96c6d0b2cd4041b3c195b17429608b";

var classes = [
  "info",
  "seasons",
  "teams",
  "current_table",
  "landing_page",
  "single_team",
];

window.onload = getLandingPage();

function scrollToTop() {
  document
    .getElementById("display")
    .scrollTo(0,0);
};

/*eventlisteners for buttons in menubar*/
document.getElementById("landingPage").addEventListener("click", function () {
  getLandingPage();
});

document.getElementById("seasons").addEventListener("click", function () {
  getSeasons();
});

document.getElementById("teams").addEventListener("click", function () {
  getTeams();
});

document.getElementById("gameTable").addEventListener("click", function () {});

document.getElementById("info").addEventListener("click", function () {
  getInformation();
});

/*load landingpage*/
function getLandingPage() {
  let head = "<div class='landing_header'>TOOOOR!!!!</div>";
  let langdingPageText =
    "<div class='goal_gif'><iframe src='https://giphy.com/embed/cCSI9U2TgESbu'" +
    " width='480' height='270' frameBorder='0' class='giphy-embed' allowFullScreen>" +
    "</iframe><p><a href='https://giphy.com/gifs/fcbayern-goal-legend-cCSI9U2TgESbu'></a></p><br>" +
    "<div class='landing_textbox'> Herzlich Willkommen auf meiner kleinen aber feinen Bundesliga Website" +
    "<br><br>" +
    "Beim erstellen dieser Website ging es darum Daten mittels REST API abzufragen und visuell darzustellen. " +
    "Hierzu nutzen wir die Datenbank von <a href='https://www.football-data.org/' target='blank'>football-data.org</a>, <br>" +
    "was erklärt warum jemand wie ich der gar kein Interesse an Fußball hat, plötzlich auf die Idee kommt " +
    "eine Bundesliga Website zu erstellen.</div>";

  document.getElementById("display_head").innerHTML = head;
  document.getElementById("table").innerHTML = langdingPageText;
  clearClassList();
  display.classList.add("landing_page");

  scrollToTop();
}

/*load list of all teams*/
function getTeams() {
  var source = document.getElementById("teams_template").innerHTML;
  var template = Handlebars.compile(source);

  fetch(urlTeams, {
    headers: {
      "x-auth-token": token,
    },
  })
    .then((response) => response.json())
    .then(function (data) {
      let head =
        "<div class='team_header'>Die Bundesliga besteht aus 18 Mannschaften</div>";
      let html = "";

      data.teams.forEach((element) => {
        html += template(element);
      });
      document.getElementById("display_head").innerHTML = head;
      document.getElementById("table").innerHTML = html;
      clearClassList();
      display.classList.add("teams");
    });

    scrollToTop();
}

function getTeamInfo(teamID) {
  var source1 = document.getElementById("single_team_head_template").innerHTML;
  var source2 = document.getElementById("single_team_body_template").innerHTML;
  var source3 = document.getElementById("squad-table-template").innerHTML;

  var headTemplate = Handlebars.compile(source1);
  var bodyTemplate = Handlebars.compile(source2);
  

  let url = urlSingleTeam + teamID;
  fetch(url, {
    headers: {
      "x-auth-token": token,
    },
  })
    .then((response) => response.json())
    .then(function (data) {
      let head = "";
      let info = "";
      let player = "";

      head = headTemplate(data);
      info = bodyTemplate(data);


      
      data.squad.forEach((element) => {
        element.dateOfBirth = (new Date(element.dateOfBirth).toLocaleDateString('de-DE'))

        var playerTemplate = Handlebars.compile(source3)
        
        player += playerTemplate(element)

      });

      document.getElementById("display_head").innerHTML = head;
      document.getElementById("table").innerHTML = info;
      document.getElementById("table").innerHTML = player
    });

  document.getElementById("display_head").innerHTML = teamID;
  clearClassList();
  display.classList.add("single_team");

  scrollToTop();
}

/*load information about site*/
function getInformation() {
  let head = "";
  let html = "";

  let infoText =
    "Name: 1. Fußball Bundesliga<br>Abkürzung: BL, Buli<br>" +
    "Verband: Deutsche Fußball Liga GmbH (DFL)<br>Erstaustragung: 28.07.1962<br>" +
    "Hierachie: 1. Liga<br>Mannschaften: 18<br><br>" +
    "Website: " +
    "<a href='https://www.bundesliga.de' target='blank'>www.bundesliga.de</a>";

  head += "<div class='info_header'>Information</div>";
  html +=
    "<div><img src='media/logo.jpg' alt='Bundesliga Logo'></img></div>" +
    "<div class='text_box'>" +
    infoText +
    "</div>";

  document.getElementById("display_head").innerHTML = head;
  document.getElementById("table").innerHTML = html;
  clearClassList();
  display.classList.add("info");
  scrollToTop();
}

/*remove all classes to delete css*/
function clearClassList() {
  classes.forEach((item) => display.classList.remove(item));
}

/*log to console for debugging*/
function test() {
  console.log("Test failed successfully");
}
