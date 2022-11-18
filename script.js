let colorBtns = ["green", "red", "yellow", "blue"]

let sequence = []

let playersSequence = []

let timerInterval = null

let timeUsed = "00"

let defaultChecked = false

let parsedUsers = JSON.parse(localStorage.getItem("users"))
console.log(`parsedUsers: ${parsedUsers}`)

class Player {
  constructor(username, password) {
    this.username = username
    this.password = password
    this.highestScore = "00/00"
  }

  logIn = (inputUsername, inputPassword) => {
    // let logInInfo = JSON.parse(window.localStorage.getItem(`${inputUsername}`))
    // let parsedUsers = JSON.parse(localStorage.getItem("users"))
    let usersInfo = [ parsedUsers[`${inputUsername}`]["username"], parsedUsers[`${inputUsername}`]["password"], parsedUsers[`${inputUsername}`]["maxScore"] ]
    console.log(usersInfo)
    try {
      if (usersInfo[1] === inputPassword) {
        this.username = inputUsername
        this.password = inputPassword
        this.highestScore = usersInfo[2]
        $("#username").text(`${this.username}`)
        console.log(`player found: ${usersInfo}`)

        let maxSteps_bestTime = this.highestScore.split("/")
        $("#bestSteps").text(`${maxSteps_bestTime[0]}`)
        $("#bestTime").text(`${maxSteps_bestTime[1]}`)
      } 
      if (defaultChecked === true) {
        localStorage.setItem("default", `${this.username}`)
        console.log(`updated default: ${localStorage.getItem("default")}`)
        console.log(`currentPlayer: ${currentPlayer.username}, ${currentPlayer.password}, ${currentPlayer.highestScore}`);
      }
    } catch (error) {
      console.log(error)
      promptPlayer("Incorrect Username and/ or Password")
    } 
  }

  addUser = (inputUsername, inputPassword) => {
    
    this.username = inputUsername
    this.password = inputPassword
    
    //
    let usersInfo = [ parsedUsers[`${inputUsername}`]["username"], parsedUsers[`${inputUsername}`]["password"], parsedUsers[`${inputUsername}`]["maxScore"] ]
    console.log(usersInfo)
    
    if (usersInfo[0] === inputUsername) {
      console.log("Username already taken")
      promptPlayer("Username Already Taken")
    } else {
      parsedUsers[this.username] = {}
      parsedUsers[this.username]["username"] = this.username
      parsedUsers[this.username]["password"] = this.password
      parsedUsers[this.username]["maxScore"] = this.highestScore
      localStorage.setItem("users", JSON.stringify(parsedUsers))
  
      $("#username").text(`${this.username}`)
      console.log(`player added: ${this.username}`)
  
      let maxSteps_bestTime = this.highestScore.split("/")
      $("#bestSteps").text(`${maxSteps_bestTime[0]}`)
      $("#bestTime").text(`${maxSteps_bestTime[1]}`)
    }
    //

    if (defaultChecked === true) {
      localStorage.setItem("default", `${this.username}`)
      console.log(`updated default: ${localStorage.getItem("default")}`)
    }
    
  } 

  updateHighestScore = (inputHighestScore) => {
    this.highestScore = inputHighestScore
  }
} 

// TO DO: make a template player instance just to relay and store users' data in localStorage
let newPlayer = new Player("username1", "password1")
let currentPlayer = new Player("username2", "password2")

$("#logInBtn").on("click", e => {
  e.preventDefault()
  let playerInfo = [$("#inputUsername").val(), $("#inputPassword").val()]
  currentPlayer.logIn(playerInfo[0], playerInfo[1])
  $("form").trigger("reset")
})

$("#signUpBtn").on("click", e => {
  e.preventDefault()
  $(`#${e.target.id}`).addClass("opacity-50")
  setTimeout(() => $(`#${e.target.id}`).removeClass("opacity-50"), 250)
  setTimeout(() => $(`#${e.target.id}`).addClass("opacity-100"), 500)
  setTimeout(() => $(`#${e.target.id}`).removeClass("opacity-100"), 1000)
  let newPlayerInfo = [$("#inputUsername").val(), $("#inputPassword").val()]
  if (JSON.stringify(newPlayerInfo) === JSON.stringify(["", ""])) {
    promptPlayer("Type username and password first!")
    console.log("Type username and password first!")
  } else {
    console.log(`newPlayerInfo: ${newPlayerInfo}`)
    newPlayer.addUser(newPlayerInfo[0], newPlayerInfo[1])
    // $("#username").text(newPlayerInfo[0])
    // promptPlayer("New Player Added")
  }
  $("form").trigger("reset")
})

$("#defaultCheck").on("change", e => {
  e.preventDefault()
  defaultChecked = true
  console.log("default checked")
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
    promptPlayer("WRONG! press 'Reset' button")
    console.log("WRONG! press 'Reset' button")
  }  
}

function logMax (match) {
  console.log("call logMax()")
  console.log(`playersSequence.length: ${playersSequence.length}`)
    // // if (playersSequence.length > Number(window.localStorage.getItem("maxScore")) || playersSequence.length > 0) {
    // if (playersSequence.length > Number(window.localStorage.getItem("maxScore"))) {
    //   console.log(`compare: \n  playersSequence.length: ${playersSequence.length}, getMaxScore: ${window.localStorage.getItem("maxScore")}`)
    //   // window.localStorage.removeItem("maxScore")
    //   console.log(`before-update maxScore: ${window.localStorage.getItem("maxScore")}`)
    //   window.localStorage.setItem("maxScore", `${playersSequence.length}`)
    //   // console.log(`timestamp: ${$("#time").text()}`)
    //   console.log(`timestamp: ${timestamp}`)
    //   // $("#bestTime").text(`${$("#time").text()}`)
    //   $("#bestTime").text(`${timestamp}`)
    //   console.log(`updated maxScore: ${window.localStorage.getItem("maxScore")}`)
    //   // console.log(`updated maxScore: ${getMaxScore}`)
    //   // $("#score").text(`${getMaxScore}`)
    //   $("#score").text(window.localStorage.getItem("maxScore"))
    //   console.log(window.localStorage)
    // }

    // test01: try log bestTime
    // if (playersSequence.length > Number(window.localStorage.getItem("maxScore")) || playersSequence.length > 0) {
      if (playersSequence.length > Number(maxSteps_bestTime[0]) && Number(timeUsed) < Number(maxSteps_bestTime[1]) ) {
        console.log(Number(maxSteps_bestTime[1]))
        // console.log(`compare: \n  playersSequence.length: ${playersSequence.length}, getMaxScore: ${window.localStorage.getItem("maxScore")}`)
        // console.log(`before-update maxScore: ${window.localStorage.getItem("maxScore")}`)
        // if ()
        localStorage.setItem("maxScore", `${playersSequence.length}`)
        console.log(`timestamp: ${timestamp}`)
        $("#bestTime").text(`${timestamp}`)
        console.log(`updated maxScore: ${window.localStorage.getItem("maxScore")}`)
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

    if (counter < 10) {
      timeUsed = `0${counter}`
    } else {
      timeUsed = 10 - counter
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

$("#reset").on("click", e => {
  e.preventDefault
  $(`#${e.target.id}`).addClass("opacity-50")
  setTimeout(() => $(`#${e.target.id}`).removeClass("opacity-50"), 250)
  setTimeout(() => $(`#${e.target.id}`).addClass("opacity-100"), 500)
  setTimeout(() => $(`#${e.target.id}`).removeClass("opacity-100"), 1000)
  promptPlayer("Game Reset")
  console.log("RESET")
  $("#start").toggle()
  timerReset()
  gameInit()
})

function promptPlayer (inputText) {
  return $("#prompt").text(`- ${inputText} -`).fadeOut(200).fadeIn(50)
}

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
    promptPlayer("Game Starts!")
    $("#start").toggle()
  })
}

gameInit()

// Set parameters after the page loaded
let maxSteps_bestTime = currentPlayer.highestScore.split("/")

$(document).ready(function() {
  // let parsedUsers = JSON.parse(localStorage.getItem("users"))

  console.log(parsedUsers);
  currentPlayer.username = localStorage.getItem("default")
  console.log(currentPlayer.username)
  currentPlayer.highestScore = parsedUsers[currentPlayer.username]["maxScore"]

  $("#bestSteps").text(`${maxSteps_bestTime[0]}`)
  $("#bestTime").text(`${maxSteps_bestTime[1]}`)
  $("#username").text(currentPlayer.username)



  // console.log(window.localStorage.getItem("user1")) 
  // let obj = JSON.parse(window.localStorage.getItem("user1"))
  // console.log(obj)
  // console.log(obj[0])
  
  // window.localStorage.getItem(window.localStorage.getItem("default"))
  // let defaultUser = JSON.parse(localStorage.getItem("default"))
  // console.log(`default user: ${defaultUser}`)



  promptPlayer("Press 'Start'")
  setTimeout(() => $("#hi").css("transform", "rotateZ(" + -45 + "deg)"), 500)
  setTimeout(() => $("#hi").css("transform", "rotateZ(" + 45 + "deg)"), 1000)
  setTimeout(() => $("#hi").css("transform", "rotateZ(" + -45 + "deg)"), 1500)
  setTimeout(() => $("#hi").css("transform", "rotateZ(" + 0 + "deg)"), 2000)
  
  // localStorage.setItem("users", "[]")  
  // console.log(JSON.parse(localStorage.getItem("users")));
  // localStorage.setItem("user1", JSON.stringify({username: "user1", password: "pwd1", maxScore: "03/a10"}))
  // localStorage.setItem("user2", JSON.stringify({username: "user2", password: "pwd2", maxScore: "03/a09"}))
  // localStorage.setItem("user3", JSON.stringify({username: "user3", password: "pwd3", maxScore: "02/a03"}))
  // localStorage.removeItem("user1")
  // localStorage.removeItem("user2")
  // localStorage.removeItem("user3")
  // localStorage.clear()


  // // Setting Dummy Data:
  // localStorage.setItem(
  //   "users",
  //   JSON.stringify({
  //     user1: {
  //       username: "user1",
  //       password: "pwd1",
  //       maxScore: "03/04",
  //     },
  //     user2: {
  //       username: "user2",
  //       password: "pwd2",
  //       maxScore: "03/06",
  //     },
  //     user3: {
  //       username: "user3",
  //       password: "pwd3",
  //       maxScore: "02/07",
  //     },
  //   })
  // )
  // localStorage.setItem("rank", JSON.stringify(
  //   [
  //     "03/04",
  //     "03/06",
  //     "02/07"
  //   ]
  // ))
  // localStorage.setItem("default", "user1")
  // localStorage.setItem("hallOfFame", "[]")



  console.log(localStorage);
 


})




// // see real-time timestamp (uncomment the button in html first)
// $("#test-timestamp").on("click", e => { 
//   console.log($("#time").text());
//   console.log(timestamp);
// })







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
// https://stackoverflow.com/questions/7837456/how-to-compare-arrays-in-javascript
// https://www.w3resource.com/jquery-exercises/part1/jquery-practical-exercise-6.php
// https://api.jquery.com/input-selector/
// https://stackoverflow.com/questions/8701812/clear-form-after-submission-with-jquery
// https://stackoverflow.com/questions/14544104/checkbox-check-event-listener
// https://www.javascripttutorial.net/javascript-dom/javascript-checkbox/
// https://stackoverflow.com/questions/28413947/space-efficient-way-to-encode-numbers-as-sortable-strings
// https://stackoverflow.com/questions/30676488/how-to-time-functions-in-javascript-similar-to-python-timeit
// https://stackoverflow.com/questions/2793847/sort-outer-array-based-on-values-in-inner-array-javascript
// https://stackoverflow.com/questions/2824145/sorting-a-multidimensional-array-in-javascript
// https://riptutorial.com/javascript/example/3443/sorting-multidimensional-array
// https://stackoverflow.com/questions/2577172/how-to-get-objects-value-if-its-name-contains-dots
// 

// Resources (reviewed but were not used):
// https://github.com/Keyframes/jQuery.Keyframes
// http://keyframes.github.io/jQuery.Keyframes/
// https://api.jquery.com/animate/
// https://www.jqueryscript.net/animation/Set-CSS-Keyframes-jQuery.html
