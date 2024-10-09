export default function modal(tree = document) {
  // it's quite likely that the parent is the [data-modal]
  // but querySelectorAll only finds children so we need
  // to include the parent tree in the search
  ;[tree, ...tree.querySelectorAll("[data-modal]")]
    .filter((el) => el.matches("[data-modal]"))
    .forEach((modal) => {
      const modalUnderlay = modal.querySelector("[data-modal-underlay]")

      function closeModal() {
        modal.setAttribute("hidden", "")
        modal.addEventListener("animationend", () => {
          modal.remove()
        })
      }

      modalUnderlay.addEventListener("click", () => closeModal())

      modal.querySelectorAll("[data-modal-close-btn]").forEach((btn) => {
        btn.addEventListener("click", () => closeModal())
      })

      document.addEventListener("htmx:beforeSwap", (evt) => {
        // if the response includes this header close the modal
        if (evt.detail.xhr.getResponseHeader("data-modal-close")) {
          if (modal) {
            closeModal()
          }
        }
      })
    })
}
