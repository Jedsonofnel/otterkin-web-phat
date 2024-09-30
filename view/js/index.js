import "htmx.org"
import "./avatar"
import htmx from "htmx.org"
import hamburgerMenu from "./behaviours/hamburger"
import toggleButton from "./behaviours/toggle-button"
import flashMessages from "./behaviours/flash-message"
import modal from "./behaviours/modal"

// add behaviours on page and htmx load
addEventListener("htmx:load", (e) => {
  hamburgerMenu(e.target)
  toggleButton(e.target)
  flashMessages(e.target)
  modal(e.target)
})

// htmx stuff
htmx.defineExtension("reset-on-success", {
  onEvent: (name, event) => {
    if (name !== "htmx:beforeSwap") return
    if (event.detail.isError || event.detail.xhr.status === 422) return

    const triggeringElt = event.detail.requestConfig.elt
    if (
      !triggeringElt.closest("[hx-reset-on-success]") &&
      !triggeringElt.closest("[data-hx-reset-on-success]")
    )
      return

    switch (triggeringElt.tagName) {
      case "INPUT":
      case "TEXTAREA":
        triggeringElt.value = triggeringElt.defaultValue
        break
      case "SELECT":
        //too much work
        break
      case "FORM":
        triggeringElt.reset()
        break
    }
  },
})

const registerImagePreview = () => {
  if (document.querySelector("#image") !== null) {
    const imgTag = document.getElementById("gallery-preview")
    const imgInput = document.getElementById("image")

    const readFile = (input) => {
      if (input.files && input.files[0]) {
        const reader = new FileReader()
        reader.readAsDataURL(input.files[0])
        reader.onload = () => {
          imgTag.setAttribute("src", reader.result)
          imgTag.classList.remove("hidden")
        }
      }
    }
    imgInput.addEventListener("change", () => readFile(imgInput))
  }
}

window.addEventListener("DOMContentLoaded", () => {
  registerImagePreview()
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
      registerImagePreview()
    }
  })
})
