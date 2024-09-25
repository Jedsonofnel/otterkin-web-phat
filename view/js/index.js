import "htmx.org"
import "./avatar"

import htmx from "htmx.org"

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

const registerToggles = () => {
  const toggleButtonWrappers = document.querySelectorAll(
    ".toggle-button-wrapper"
  )

  if (toggleButtonWrappers.length === 0) return

  Array.from(toggleButtonWrappers, (wrapper) => {
    const button = wrapper.querySelector(".toggle-button")
    const input = wrapper.querySelector(".toggle-input")
    const trueLabel = wrapper.querySelector("p.true")
    const falseLabel = wrapper.querySelector("p.false")
    if (input.value === "true") {
      button.classList.add("true")
      falseLabel.classList.add("hidden")
    } else {
      trueLabel.classList.add("hidden")
    }

    button.addEventListener("click", () => {
      if (input.value === "true") {
        input.value = "false"
        button.classList.remove("true")
        trueLabel.classList.add("hidden")
        falseLabel.classList.remove("hidden")
      } else {
        input.value = "true"
        button.classList.add("true")
        falseLabel.classList.add("hidden")
        trueLabel.classList.remove("hidden")
      }
    })
  })
}

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
  registerHamburger()
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
      registerHamburger()
      registerImagePreview()
      registerToggles()
    }
  })
})
