export default function toggleButton(tree = document) {
  tree.querySelectorAll("[data-toggle-btn]").forEach((toggleBtn) => {
    const input = toggleBtn.querySelector("[role='switch']")
    const switchSpan = toggleBtn.querySelector("[data-toggle-btn-switch]")
    const textTrue = toggleBtn.querySelector("[data-toggle-btn-true]")
    const textFalse = toggleBtn.querySelector("[data-toggle-btn-false]")

    const isOn = () => input.checked

    function toggle(value = isOn()) {
      if (value == true) {
        textTrue.hidden = false
        textFalse.hidden = true
        switchSpan.removeAttribute("data-toggle-btn-off")
      } else {
        textTrue.hidden = true
        textFalse.hidden = false
        switchSpan.setAttribute("data-toggle-btn-off", "")
      }
    }

    input.addEventListener("click", () => toggle())
  })
}
