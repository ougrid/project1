let colorBtns = ["green", "red", "yellow", "blue"]

let sequence = []

function addSequence() {
  sequence.push(colorBtns[Math.floor(Math.random() * 4)])
  console.log(sequence)
}

function showSequence() {
  sequence.forEach(element => {
    console.log(`show: ${element}`)
    // $(`#${element}`).css("background-color", "secondary")
    // $(`#${element}`).toggleClass("bg-secondary")
    $(`#${element}`).text("THIS")
    $(`#${element}`).addClass("opacity-75")
    setTimeout(2000)
    $(`#${element}`).removeClass("opacity-75")
  })
}

$("#start").on("click", e => {   
  e.preventDefault()
  sequence = []
  addSequence()
  showSequence()
})

$("#green, #red, #yellow, #blue").on("click", e => {
  e.preventDefault()
  console.log(e.target)

  if (colorBtns.includes(`${e.target.id}`) === true) {
    console.log(e.target.id)
  }
})  