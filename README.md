# project1

To blink
```html
<div class="blink">blink!</div>
```
```js
$(`#${element}`).addClass("blink")
setTimeout(() => $(`#${element}`).removeClass("blink"), (index + 1) * 1000)
```
```css
.blink {
  animation: blinker 1s step-start infinite;
}

@keyframes blinker {
  50% {
    opacity: 50%;
  }
}
```
Note:
<!-- question mark &#10068  -->


__Time-based Scoring__
- user have 10 sec to follow each time the sequence is shown 
- timer is reset after user press buttons as much as the length of the sequence shown

```js
      if (playersSequence.length > Number(window.localStorage.getItem("maxScore")) && window.localStorage.getItem("")) {
        console.log(`compare: \n  playersSequence.length: ${playersSequence.length}, getMaxScore: ${window.localStorage.getItem("maxScore")}`)
        console.log(`before-update maxScore: ${window.localStorage.getItem("maxScore")}`)
        window.localStorage.setItem("maxScore", `${playersSequence.length}`)
        console.log(`timestamp: ${timestamp}`)
        $("#bestTime").text(`${timestamp}`)
        console.log(`updated maxScore: ${window.localStorage.getItem("maxScore")}`)
        $("#score").text(window.localStorage.getItem("maxScore"))
        console.log(window.localStorage)
      }
```
// if (personal score > person's best personal score)
// then

// if (personal score > everyone else's score) 
// then assign personal score to game's highest score

---



__Data Structure on localStorage__
```js
// Example data from localStorage
localStorage = [{
  users: [
    {
      username: "user1",
      password: "pwd1",
      maxScore: "03/04"
    },
    {
      username: "user2",
      password: "pwd2",
      maxScore: "03/06"      
    },
    {
      username: "user3",
      password: "pwd3",
      maxScore: "02/07"      
    }
  ],

  rank: [
    "03/04",
    "03/06",
    "02/07"
  ],

  hallOfFame: [
    
  ]
}]
```