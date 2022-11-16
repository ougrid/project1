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



__Time-based Scoring__
- user have 10 sec to follow each time the sequence is shown 
- timer is reset after user press buttons as much as the length of the sequence shown