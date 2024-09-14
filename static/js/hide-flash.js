// some javascript
function hideFlash(flashType) {
  let message = document.querySelector(`.flash.${flashType}`);
  message.classList.add("removed");
}
