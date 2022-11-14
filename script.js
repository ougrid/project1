let colorBtns = ["green", "red", "yellow", "blue"]

let sequence = []

let playersSequence = []

function addSequence() {
  sequence.push(colorBtns[Math.floor(Math.random() * colorBtns.length)])
  console.log(sequence)
}

function showSequence() {
  
  sequence.forEach((element) => {
    console.log(`show: ${element}`)
    $(`#${element}`).text("THIS")
    // setTimeout(element => $(`#${element}`).addClass("opacity-50"), 2000)
    // $(`#${element}`).removeClass("opacity-50")
    $(`#${element}`).addClass("opacity-50")
    // TO DO: make it waits for a while then remove the class added!
  })

  listenToPlayer()
}

function listenToPlayer() {
  $("#green, #red, #yellow, #blue").on("click", e => {
    e.preventDefault()
    console.log(e.target)

    if (playersSequence.length < sequence.length) {
      playersSequence.push(e.target.id)
      console.log(e.target.id);
      console.log(`playersSequence: ${playersSequence}`)
    } else if (playersSequence.length === sequence.length) {
      let matchCheck = true
      playersSequence.forEach((element, index) => {
        if (element === sequence[index]) {
          matchCheck = true
        } else {
          matchCheck = false
          console.log('WRONG! Press "reset" to try again')
          return 
        }
      })
    } 
    })
}




$("#start").on("click", e => {   
  e.preventDefault()
  sequence = []
  addSequence()
  showSequence()
})

