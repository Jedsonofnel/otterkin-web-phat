import "htmx.org"
window.htmx = require("htmx.org")

window.hideFlash = (flashType) => {
  let message = document.querySelector(`.flash.${flashType}`);
  message.classList.add("removed");
}

window.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("htmx:beforeSwap", (evt) => {
    if (evt.detail.xhr.status === 422) {
      evt.detail.shouldSwap = true
      evt.detail.isError = false
    }
  })
})
