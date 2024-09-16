import "htmx.org"
window.htmx = require("htmx.org")

window.hideFlash = (flashType) => {
  let message = document.querySelector(`.flash.${flashType}`);
  message.classList.add("removed");
}
