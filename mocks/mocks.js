let checklistEl = document.querySelector("#beerChecklist")
let leaderboardEl = document.querySelector("#beerLeaderboard")
let postsEl = document.querySelector("#latestPosts")
let clButtonEl = document.querySelector("#clButton")
let lpButtonEl = document.querySelector("#lpButton")
let lbButtonEl = document.querySelector("#lbButton")

clButtonEl.addEventListener("click", toggleChecklist);
function toggleChecklist() {
    checklistEl.setAttribute("class", "");
    leaderboardEl.setAttribute("class", "hidden");
    postsEl.setAttribute("class", "hidden");
  }
  lpButtonEl.addEventListener("click", togglePost);
function togglePost() {
    checklistEl.setAttribute("class", "hidden");
    leaderboardEl.setAttribute("class", "hidden");
    postsEl.setAttribute("class", "");
  }
  lbButtonEl.addEventListener("click", toggleLeaderboard);
function toggleLeaderboard() {
    checklistEl.setAttribute("class", "hidden");
    leaderboardEl.setAttribute("class", "");
    postsEl.setAttribute("class", "hidden");
  }