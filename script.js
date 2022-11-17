let colorBtns = ["green", "red", "yellow", "blue"]

let sequence = []

let playersSequence = []

let timerInterval = null

// let defaultUser = ""

class Player {
  constructor(username, password) {
    this.username = username
    this.password = password
    this.highestScore = "0"
  }

  logIn = (inputUsername, inputPassword) => {
    this.username = inputUsername
    this.password = inputPassword
    let logInInfo = window.localStorage.getItem(`${this.username}`)
    console.log(logInInfo)
  }

  addUser = (inputUsername, inputPassword) => {
    this.username = inputUsername
    this.password = inputPassword
    this.highestScore = "0"
    window.localStorage.setItem(`${this.username}`, JSON.stringify([this.username, this.password, this.highestScore]))
    console.log(`update: ${JSON.parse(window.localStorage.getItem(`${this.username}`))}`)
  }

  updateHighestScore = (inputHighestScore) => {
    this.highestScore = inputHighestScore
  }
} 

// TO DO: make a template player instance just to relay and store users' data in localStorage
let newPlayer = new Player("username1", "password1")
let currentPlayer = new Player("username2", "password2")

// $("#signUpBtn").on("click", e => {
//   e.preventDefault()
//   $(`#${e.target.id}`).addClass("opacity-50")
//   setTimeout(() => $(`#${e.target.id}`).removeClass("opacity-50"), 250)
//   setTimeout(() => $(`#${e.target.id}`).addClass("opacity-100"), 500)
//   setTimeout(() => $(`#${e.target.id}`).removeClass("opacity-100"), 1000)
//   let newPlayerInfo = prompt(`Type new player's username and password:\n(Example format: player_2_username | player_2_password)`).split(" | ")
//   console.log(newPlayerInfo)
//   newPlayer.addUser(newPlayerInfo[0], newPlayerInfo[1])
//   $("#username").text(`${newPlayerInfo[0]}`)
//   $("#prompt").text("- New Player Added -")
// })

$("#signUpBtn").on("click", e => {
  e.preventDefault()
  $(`#${e.target.id}`).addClass("opacity-50")
  setTimeout(() => $(`#${e.target.id}`).removeClass("opacity-50"), 250)
  setTimeout(() => $(`#${e.target.id}`).addClass("opacity-100"), 500)
  setTimeout(() => $(`#${e.target.id}`).removeClass("opacity-100"), 1000)
  let newPlayerInfo = [$("#inputUsername").val(), $("#inputPassword").val()]
  console.log(`newPlayerInfo: ${newPlayerInfo}`)
  newPlayer.addUser(newPlayerInfo[0], newPlayerInfo[1])
  $("#username").text(newPlayerInfo[0])
  $("#prompt").text("- New Player Added -")
})

$("#learnMore").mouseover(e => {
  e.preventDefault()
  $("#learnMore").animate({
    left: '-2px',
    opacity: '0.5'
    }, "fast")
})

$("#learnMore").mouseleave(e => {
  e.preventDefault()
  $("#learnMore").animate({
    left: '2px',
    opacity: '1'
    }, "fast")
})

function addSequence() {
  console.log("call addSequence()");
  sequence.push(colorBtns[Math.floor(Math.random() * colorBtns.length)])
  console.log(`added sequence: [${sequence}]`)
}

function showSequence() {
  console.log("call showSequence()");
  sequence.forEach((element, index) => {
    console.log(`show: ${element}`)
    // $(`#${element}`).text("THIS")
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

    $(`#${e.target.id}`).addClass("opacity-50")
    setTimeout(() => $(`#${e.target.id}`).removeClass("opacity-50"), 250)
    setTimeout(() => $(`#${e.target.id}`).addClass("opacity-100"), 500)
    setTimeout(() => $(`#${e.target.id}`).removeClass("opacity-100"), 1500)

    console.log(`playersSequence: [${playersSequence}]`)
    if (playersSequence.length === sequence.length) {
      timerReset()
      timerStart()
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
    $("#prompt").text("- WRONG! press 'Reset' button -")
    console.log("WRONG! press 'Reset' button")
    return
  }  
}

function logMax (match) {
  console.log("call logMax()")
  console.log(`playersSequence.length: ${playersSequence.length}`)
    // if (playersSequence.length > Number(window.localStorage.getItem("maxScore")) || playersSequence.length > 0) {
    if (playersSequence.length > Number(window.localStorage.getItem("maxScore"))) {
      console.log(`compare: \n  playersSequence.length: ${playersSequence.length}, getMaxScore: ${window.localStorage.getItem("maxScore")}`)
      // window.localStorage.removeItem("maxScore")
      console.log(`before-update maxScore: ${window.localStorage.getItem("maxScore")}`)
      window.localStorage.setItem("maxScore", `${playersSequence.length}`)
      // console.log(`timestamp: ${$("#bestTime").val()}`);
      console.log(`updated maxScore: ${window.localStorage.getItem("maxScore")}`)
      // console.log(`updated maxScore: ${getMaxScore}`)
      // $("#score").text(`${getMaxScore}`)
      $("#score").text(window.localStorage.getItem("maxScore"))
      console.log(window.localStorage)
    }
}

function timerStart() {
  let counter = 10

  timerInterval = setInterval(function () {
    $("#time").text(`${counter}`)
    if (counter <= 0) {
      clearInterval(timerInterval)
      $("prompt").text("- Time's up! -")
      console.log("Time's up!")
      $("#start").show()
    }
    counter--
  }, 1000)
  // addSequence()
  // showSequence()
}

function timerReset() {
  clearInterval(timerInterval)
  $("#time").text("00")
  console.log("TIMER RESET")
  // timerStart()
}

// $("#test-timer").on("click", e => {
//   e.preventDefault()
//   timerReset()
//   $(`#${e.target.id}`).addClass("opacity-50")
//   setTimeout(() => $(`#${e.target.id}`).removeClass("opacity-50"), 250)
// })

// function reset () {
  $("#reset").on("click", e => {
    e.preventDefault
    $(`#${e.target.id}`).addClass("opacity-50")
    setTimeout(() => $(`#${e.target.id}`).removeClass("opacity-50"), 250)
    setTimeout(() => $(`#${e.target.id}`).addClass("opacity-100"), 500)
    setTimeout(() => $(`#${e.target.id}`).removeClass("opacity-100"), 1000)
    $("#prompt").text("- Game Reset -")
    console.log("RESET")
    $("#start").show()
    timerReset()
    gameInit()
  })
// }

// To do: make 'start' stops listening when pressed 
function gameInit () {
  console.log(window.localStorage);
  $("#start").on("click", e => {   
    e.preventDefault()
    $(`#${e.target.id}`).addClass("opacity-50")
    setTimeout(() => $(`#${e.target.id}`).removeClass("opacity-50"), 250)
    setTimeout(() => $(`#${e.target.id}`).addClass("opacity-100"), 500)
    setTimeout(() => $(`#${e.target.id}`).removeClass("opacity-100"), 1000)
    sequence = []
    playersSequence = []
    addSequence()
    showSequence()
    timerStart()
    listenToPlayer()
    $("#prompt").text("- Game Starts! -")
  })
}

gameInit()

$(document).ready(function() {
  $("#score").text(window.localStorage.getItem("maxScore"))
  console.log(window.localStorage.getItem("user1")) 
  let obj = JSON.parse(window.localStorage.getItem("user1"))
  console.log(obj)
  console.log(obj[0]) 
  $("#username").text(obj[0])
  setTimeout(() => $("#hi").css("transform", "rotateZ(" + -45 + "deg)"), 500)
  setTimeout(() => $("#hi").css("transform", "rotateZ(" + 45 + "deg)"), 1000)
  setTimeout(() => $("#hi").css("transform", "rotateZ(" + -45 + "deg)"), 1500)
  setTimeout(() => $("#hi").css("transform", "rotateZ(" + 0 + "deg)"), 2000)
  // $("#hi").css("transform", "rotateZ(" + -90 + "deg)")


$(test-timestamp)
})









// Resources:
// https://stackoverflow.com/questions/16344354/how-to-make-blinking-flashing-text-with-css-3
// https://travishorn.com/delaying-foreach-iterations-2ebd4b29ad30
// https://www.byperth.com/2015/02/19/jquery-window-onload-%E0%B8%81%E0%B8%B1%E0%B8%9A-document-ready-%E0%B8%95%E0%B9%88%E0%B8%B2%E0%B8%87%E0%B8%81%E0%B8%B1%E0%B8%99%E0%B8%A2%E0%B8%B1%E0%B8%87%E0%B9%84%E0%B8%87/
// https://stackoverflow.com/questions/3698200/window-onload-vs-document-ready
// https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_countdown
// https://stackoverflow.com/questions/3089475/how-can-i-create-a-5-second-countdown-timer-with-jquery-that-ends-with-a-login-p
// https://codehs.com/tutorial/rachel/user-input-in-javascript
// https://www.sitepoint.com/delay-sleep-pause-wait/
// https://www.tutorialspoint.com/how-to-stop-a-function-during-its-execution-in-javascript
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create
// https://stackoverflow.com/questions/28803076/javascript-how-to-create-new-instance-of-functions
// https://stackoverflow.com/questions/30223174/formatted-string-to-js-array
// https://stackoverflow.com/questions/10808096/using-css-transform-property-in-jquery
// https://stackoverflow.com/questions/24961795/how-can-i-use-css3-transform-on-a-span
// https://getbootstrap.com/docs/5.0/forms/overview/
// https://www.w3schools.com/tags/tag_sup.asp
// 

// https://github.com/Keyframes/jQuery.Keyframes
// http://keyframes.github.io/jQuery.Keyframes/
// https://api.jquery.com/animate/
// https://www.jqueryscript.net/animation/Set-CSS-Keyframes-jQuery.html
