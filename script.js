let colorBtns = ["green", "red", "yellow", "blue"]

let sequence = []

let playersSequence = []

let setMaxScore = localStorage.setItem("maxScore", "0")

let getMaxScore = localStorage.getItem("maxScore")

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

// let setMaxScore = localStorage.setItem("maxScore", "0")

// let getMaxScore = localStorage.getItem("maxScore")

function logMax (match) {
  console.log("call logMax()")
  console.log(`playersSequence.length: ${playersSequence.length}`)
  // if (match === true) {
    if (playersSequence.length > Number(getMaxScore)) {
      console.log(`compare: \n  playersSequence.length: ${playersSequence.length}, getMaxScore: ${getMaxScore}`)
      localStorage.removeItem("maxScore")
      console.log(localStorage)
      localStorage.setItem("maxScore", `${playersSequence.length}`)
      console.log(localStorage)
      console.log(`updated maxScore: ${getMaxScore}`)
      // $("#score").text(`${getMaxScore}`)
      $("#score").text(localStorage.getItem("maxScore"))
    }
  // }
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
  $("#start").on("click", e => {   
    e.preventDefault()
    sequence = []
    playersSequence = [] 
    addSequence()
    showSequence()
    listenToPlayer()
  })
}

gameInit()













// Resources:
// https://stackoverflow.com/questions/16344354/how-to-make-blinking-flashing-text-with-css-3
// https://travishorn.com/delaying-foreach-iterations-2ebd4b29ad30