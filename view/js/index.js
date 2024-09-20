import "htmx.org"
window.htmx = require("htmx.org")

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

window.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("htmx:beforeSwap", (evt) => {
        if (evt.detail.xhr.status === 422) {
            evt.detail.shouldSwap = true
            evt.detail.isError = false
        }
    })
})
