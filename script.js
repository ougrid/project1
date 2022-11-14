let colorBtns = ["green", "red", "yellow", "blue"]

let sequence = []

let playersSequence = []

function addSequence() {
  sequence.push(colorBtns[Math.floor(Math.random() * colorBtns.length)])
  console.log(sequence)
}

function showSequence() {
  sequence.forEach((element, index) => {
    console.log(`show: ${element}`)
    $(`#${element}`).text("THIS")
    setTimeout(() => $(`#${element}`).addClass("opacity-50"), (index) * 500)
    setTimeout(() => $(`#${element}`).removeClass("opacity-50"), (index + 1) * 500)
    setTimeout(() => $(`#${element}`).addClass("opacity-100"), (index + 1) * 500)
    setTimeout(() => $(`#${element}`).removeClass("opacity-100"), (index + 1.5) * 500)
  })

  listenToPlayer()
}

function listenToPlayer() {
  $("#green, #red, #yellow, #blue").on("click", e => {
    e.preventDefault()
    console.log(`select: ${e.target.id}`)

    playersSequence.push(e.target.id)

    if (playersSequence.length < sequence.length) {
      // console.log(`playersSequence: ${playersSequence}`)
    } else if (playersSequence.length === sequence.length) {
      let matchCheck = true
      playersSequence.forEach((element, index) => {
        if (element === sequence[index]) {
          matchCheck = true
        } else {
          matchCheck = false
          return 
        }
        console.log(`matchCheck: ${matchCheck}`)
        return
      })
    } 
    })
}




$("#start").on("click", e => {   
  e.preventDefault()
  addSequence()
  showSequence()
})



// Resources:
// https://stackoverflow.com/questions/16344354/how-to-make-blinking-flashing-text-with-css-3
// https://travishorn.com/delaying-foreach-iterations-2ebd4b29ad30