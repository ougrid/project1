let colorBtns = ["green", "red", "yellow", "blue"]

let sequence = []

function addSequence() {
  sequence.push(colorBtns[Math.floor(Math.random() * 4)])
  console.log(sequence)
}

$("#start").on("click", e => {   
  e.preventDefault()
  addSequence()
  $(`${sequence[0]}`).css("backgroundColor", "white")
})

$("#green, #red, #yellow, #blue").on("click", e => {
  e.preventDefault()
  console.log(e.target)

  if (colorBtns.includes(`${e.target.id}`) === true) {
    console.log(e.target.id)
  }
})  