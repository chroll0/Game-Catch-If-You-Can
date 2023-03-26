const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
const btnStart = document.querySelector(".btn-start");
const timer = document.getElementById("timer");
const score = document.getElementById("score");
const object = document.getElementById("object");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const textMessage = document.querySelector(".textMessage");
const textParagraph = document.querySelector(".textParagraph");
const playMusicBtn = document.querySelector(".playMusicBtn");

let realScore, highScore, realTimer, interval, IntervalCounter;
let hexColor = "#";
let countRounds = 0;
let TimeLineSound = new Audio();
TimeLineSound.src = "timeline.wav";

const initial = function () {
  realScore = 0;
  realTimer = 10;
  timer.textContent = "Timer:" + realTimer;
  highScore = 0;
  //  Random color
  for (let i = 0; i < 6; i++) {
    hexColor += hex[getRandomNumber()];
    function getRandomNumber() {
      return Math.floor(Math.random() * hex.length);
    }
  }
  // object.style.backgroundColor = hexColor;
  IntervalCounter = 1000;
};
playMusicBtn.addEventListener("click", function () {
  if (playMusicBtn.name == "volume-mute-outline") {
    TimeLineSound.play();
    playMusicBtn.name = "volume-high-outline";
  } else if (playMusicBtn.name == "volume-high-outline") {
    TimeLineSound.pause();
    playMusicBtn.name = "volume-mute-outline";
  }
});
btnStart.addEventListener("click", function () {
  object.classList.remove("hidden");
  overlay.classList.add("hidden");
  modal.classList.add("hidden");
  initial();
  interval = setInterval(StartTimer, IntervalCounter);
  randomCube();
});
object.addEventListener("click", function () {
  realScore++;
  score.textContent = "Score:" + realScore;
  realTimer += 1;
  timer.textContent = "Timer:" + realTimer;
  randomCube();
});
function randomCube() {
  let RandomPosX = Math.floor(Math.random() * 340);
  let RandomPosY = Math.floor(Math.random() * 650);
  let RandomScale = Math.floor(Math.random() * 50);
  if (RandomScale < 15) {
    RandomScale = 15;
    object.style.width = RandomScale + "px";
    object.style.height = RandomScale + "px";
  }
  if (RandomPosX < 10) {
    RandomPosX = 10;
  }
  if (RandomPosY < 10) {
    RandomPosY = 10;
  }
  object.style.marginLeft = RandomPosX + "px";
  object.style.marginTop = RandomPosY + "px";
  object.style.marginRight = RandomPosY + "px";
  object.style.marginBottom = RandomPosX + "px";
  object.style.width = RandomScale + "px";
  object.style.height = RandomScale + "px";
}
function StartTimer() {
  realTimer--;
  timer.textContent = "Timer:" + realTimer;
  if (realTimer == 0) {
    Endgame();
  }
}
function Endgame() {
  clearInterval(interval);
  overlay.classList.remove("hidden");
  modal.classList.remove("hidden");
  object.classList.add("hidden");
  textMessage.textContent = `Your score is ${realScore}`;
  textMessage.style.color = "white";
  textParagraph.textContent = `highScore:${highScore}`;
  textParagraph.style.color = "#ad2aab";
  btnStart.textContent = "Try again";
  if (realScore > highScore) {
    highScore = realScore;
    document.getElementById("highscore").textContent = "Highscore:" + highScore;
  }
  realScore = 0;
  realTimer = 10;
  score.textContent = "Score:" + realScore;
  // Random color
  hexColor = "#";
  for (let i = 0; i < 6; i++) {
    hexColor += hex[getRandomNumber()];
    function getRandomNumber() {
      return Math.floor(Math.random() * hex.length);
    }
  }
  countRounds++;
  if (countRounds > 4) {
    countRounds = 0;
  }
  // object.style.backgroundColor = hexColor;
  object.src = `object0${countRounds}.png`;
}
