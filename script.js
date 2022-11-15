let colorBtns = ["green", "red", "yellow", "blue"]

let sequence = []

let playersSequence = []

function addSequence() {
  console.log("call addSequence()");
  sequence.push(colorBtns[Math.floor(Math.random() * colorBtns.length)])
  console.log(sequence)
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

function listenToPlayer() {
  console.log("call listenToPlayer()");
  $("#green, #red, #yellow, #blue").on("click", e => {
    e.preventDefault()
    console.log(`select: ${e.target.id}`)
    playersSequence.push(e.target.id)
    console.log(`playersSequence: ${playersSequence}`)
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
    addSequence()
    showSequence()
    playersSequence = []
    console.log(`playersSequence: ${playersSequence}`)
  } else {
    console.log("WRONG");
    return
  }  
}


$("#start").on("click", e => {   
  e.preventDefault()
  addSequence()
  showSequence()
  listenToPlayer()
})



// Resources:
// https://stackoverflow.com/questions/16344354/how-to-make-blinking-flashing-text-with-css-3
// https://travishorn.com/delaying-foreach-iterations-2ebd4b29ad30