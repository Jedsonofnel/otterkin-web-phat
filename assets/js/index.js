import htmx from "./vendored/htmx.cjs"
import hamburgerMenu from "./behaviours/hamburger"
import toggleButton from "./behaviours/toggle-button"
import flashMessages from "./behaviours/flash-message"
import modal from "./behaviours/modal"
import imagePreview from "./behaviours/image-preview"
import avatarModal from "./behaviours/avatar-modal"

// add behaviours on page and htmx load
addEventListener("htmx:load", (e) => {
  hamburgerMenu(e.target)
  toggleButton(e.target)
  flashMessages(e.target)
  modal(e.target)
  imagePreview(e.target)
  avatarModal(e.target)
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

window.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("htmx:beforeSwap", (evt) => {
    if (evt.detail.xhr.status === 422) {
      evt.detail.shouldSwap = true
      evt.detail.isError = false
    }
  })
})
