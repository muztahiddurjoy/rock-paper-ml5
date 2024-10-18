const statBtn = document.getElementById('startButton')
const gesture = document.getElementById('gesture')
const video = document.getElementById('stream')
const gameResult =  document.getElementById('gameResult')

const modelURL = "https://teachablemachine.withgoogle.com/models/LCFjaO7WV/model.json"
let userChoice = ""
let classifier = ml5.imageClassifier(modelURL, modelLoaded)

function modelLoaded(){
    console.log("Model loaded")
    stream()
    
}

async function stream(){
    const stream = await navigator.mediaDevices.getUserMedia({video: true})
    video.srcObject = stream
    video.play()
    classifyGesture()
}

function classifyGesture() {
    classifier.classify(video, (result) => {
        userChoice = result[0].label
        gesture.innerText = `You chose: ${userChoice}`
        classifyGesture()
    })
  }
  
statBtn.addEventListener("click", () => {
    playGame(userChoice);
});
  
  function playGame(userChoice) {
    let choices = ["Rock", "Paper", "Scissors"];
    let randomNumber = Math.floor(Math.random() * choices.length);
    let computerChoice = choices[randomNumber];
    let result = "";
    if (userChoice === computerChoice) {
      result = "It's a tie!";
    } else if (
      (userChoice === "Rock" && computerChoice === "Scissors") ||
      (userChoice === "Scissors" && computerChoice === "Paper") ||
      (userChoice === "Paper" && computerChoice === "Rock")
    ) {
      result = "You win!";
    } else {
      result = "You lose!";
    }
    gameResult.innerText = `Computer chose: ${computerChoice}. ${result}`;
  }