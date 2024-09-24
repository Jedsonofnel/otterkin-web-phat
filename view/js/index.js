import "htmx.org"
import "./avatar"

window.hideFlash = (elem) => {
  let message = elem.parentNode
  message.classList.add("removed")
}

window.closeModal = () => {
  modal = document.getElementById("modal")
  modal.classList.add("closing")
  modal.addEventListener("animationend", () => {
    modal.remove()
  })
}

// hamburger menu malarkey
const registerHamburger = () => {
  const hamburgerBtn = document.getElementById("hamburger")
  const hamburgerMenu = document.getElementById("hamburger-menu")
  let menuOpen = false
  hamburgerBtn.addEventListener("click", () => {
    if (!menuOpen) {
      hamburgerBtn.classList.add("open")
      hamburgerMenu.classList.add("open")
      menuOpen = true
    } else {
      hamburgerBtn.classList.remove("open")
      hamburgerMenu.classList.remove("open")
      menuOpen = false
    }
  })
}

window.addEventListener("DOMContentLoaded", () => {
  registerHamburger()
  document.addEventListener("htmx:beforeSwap", (evt) => {
    if (evt.detail.xhr.status === 422) {
      evt.detail.shouldSwap = true
      evt.detail.isError = false
    }
  })
  // because we don't have full page reloads thanks to fancy htmx
  // link tags
  document.addEventListener("htmx:afterSettle", (evt) => {
    // ie if we swap the contents of body, re-register hamburger
    if (evt.detail.target.tagName == "BODY") {
      registerHamburger()
    }
  })
})
