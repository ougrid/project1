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