let colorBtns = ["green", "red", "yellow", "blue"]

let sequence = []

let playersSequence = []

// let setMaxScore = window.localStorage.setItem("maxScore", "0")

// let getMaxScore = window.localStorage.getItem("maxScore")

function addSequence() {
  console.log("call addSequence()");
  sequence.push(colorBtns[Math.floor(Math.random() * colorBtns.length)])
  console.log(`added sequence: [${sequence}]`)
}

function showSequence() {
  console.log("call showSequence()");
  sequence.forEach((element, index) => {
    console.log(`show: ${element}`)
    $(`#${element}`).text("THIS")
    setTimeout(() => $(`#${element}`).addClass("opacity-50"), (index) * 500)
    setTimeout(() => $(`#${element}`).removeClass("opacity-50"), (index + 1) * 500)
    setTimeout(() => $(`#${element}`).addClass("opacity-100"), (index + 1) * 500)
    setTimeout(() => $(`#${element}`).removeClass("opacity-100"), (index + 1.5) * 500)
  })
}

// TO DO: make buttons blink when player clicks
function listenToPlayer() {
  console.log("call listenToPlayer()");
  $("#green, #red, #yellow, #blue").on("click", e => {
    e.preventDefault()
    console.log(`target: ${e.target.id}`)
    playersSequence.push(e.target.id)
    console.log(`playersSequence: [${playersSequence}]`)
    if (playersSequence.length === sequence.length) {
      matchCheck()
    }
  })
}

// TO DO: make it return fault rigth when it detects the first wrong element
function matchCheck() {
  console.log("call matchCheck()")
  let match = true
  playersSequence.forEach((element, index) => {
    if (element === sequence[index]) {
      match = true
    } else {
      match = false
      return
    } 
  })
  console.log(`match: ${match}`)
  if (match === true) {
    logMax(match)
    addSequence()
    showSequence()
    playersSequence = []
    console.log(`playersSequence: ${playersSequence}`)
  } else {
    console.log("WRONG! Press 'Reset'");
    return
  }  
}

// let setMaxScore = window.localStorage.setItem("maxScore", "0")

// let getMaxScore = window.localStorage.getItem("maxScore")

function logMax (match) {
  console.log("call logMax()")
  console.log(`playersSequence.length: ${playersSequence.length}`)
    // if (playersSequence.length > Number(window.localStorage.getItem("maxScore")) || playersSequence.length > 0) {
    if (playersSequence.length > Number(window.localStorage.getItem("maxScore"))) {
      console.log(`compare: \n  playersSequence.length: ${playersSequence.length}, getMaxScore: ${window.localStorage.getItem("maxScore")}`)
      // window.localStorage.removeItem("maxScore")
      console.log(`before-update maxScore: ${window.localStorage.getItem("maxScore")}`)
      window.localStorage.setItem("maxScore", `${playersSequence.length}`)
      console.log(`updated maxScore: ${window.localStorage.getItem("maxScore")}`)
      // console.log(`updated maxScore: ${getMaxScore}`)
      // $("#score").text(`${getMaxScore}`)
      $("#score").text(window.localStorage.getItem("maxScore"))
      console.log(window.localStorage);
    }
}

// TO DO: log "RESET" when pressed
function reset () {
  $("reset").on("click", e => {
    e.preventDefault
    // console.log("RESET")
    gameInit()
  })
}

// To do: make 'start' stops listening when pressed 
function gameInit () {
  console.log(window.localStorage);
  $("#start").on("click", e => {   
    e.preventDefault()
    sequence = []
    playersSequence = []
    // $("#score").text(window.localStorage.getItem("maxScore")) 
    addSequence()
    showSequence()
    listenToPlayer()
  })
}

gameInit()

$(document).ready(function() {
  $("#score").text(window.localStorage.getItem("maxScore")) 
});













// Resources:
// https://stackoverflow.com/questions/16344354/how-to-make-blinking-flashing-text-with-css-3
// https://travishorn.com/delaying-foreach-iterations-2ebd4b29ad30
// https://www.byperth.com/2015/02/19/jquery-window-onload-%E0%B8%81%E0%B8%B1%E0%B8%9A-document-ready-%E0%B8%95%E0%B9%88%E0%B8%B2%E0%B8%87%E0%B8%81%E0%B8%B1%E0%B8%99%E0%B8%A2%E0%B8%B1%E0%B8%87%E0%B9%84%E0%B8%87/
// https://stackoverflow.com/questions/3698200/window-onload-vs-document-ready