// trying out rsjs

export default function hamburgerMenu(tree = document) {
  tree.querySelectorAll("[data-hb-menu]").forEach((hbRoot) => {
    const hbBtn = hbRoot.querySelector("[data-hb-btn]")
    const hbMenu = hbRoot.querySelector("[data-hb-menu-list]")
    const isOpen = () => !hbMenu.hidden

    function toggleMenu(open = !isOpen()) {
      if (open) {
        hbMenu.hidden = false
        hbBtn.setAttribute("data-hb-open", "")
      } else {
        hbMenu.hidden = true
        hbBtn.removeAttribute("data-hb-open", "")
      }
    }

    // ie by default ensure that menu behaves according
    // to DOM representation (hidden attribute)
    toggleMenu(isOpen())
    hbBtn.addEventListener("click", () => toggleMenu())
  })
}
