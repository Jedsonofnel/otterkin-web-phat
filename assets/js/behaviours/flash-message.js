export default function flashMessages(tree = document) {
  tree.querySelectorAll("[data-flash-msg]").forEach((elem) => {
    const closeBtn = elem.querySelector("button.flash-close")

    closeBtn.addEventListener("click", () => {
      elem.setAttribute("hidden", "")
      elem.addEventListener("animationend", () => {
        elem.remove()
      })
    })
  })
}
