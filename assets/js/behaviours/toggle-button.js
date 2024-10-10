export default function toggleButton(tree = document) {
  tree.querySelectorAll("[data-toggle-btn]").forEach((toggleBtn) => {
    const checkbox = toggleBtn.querySelector("input[role=switch]")
    const input = toggleBtn.querySelector("input[type=hidden]")
    const switchSpan = toggleBtn.querySelector("[data-toggle-btn-switch]")
    const textTrue = toggleBtn.querySelector("[data-toggle-btn-true]")
    const textFalse = toggleBtn.querySelector("[data-toggle-btn-false]")

    const isOn = () => checkbox.checked

    function toggle(value = isOn()) {
      if (value) {
        textTrue.hidden = false
        textFalse.hidden = true
        input.value = "true"
        switchSpan.removeAttribute("data-toggle-btn-off")
      } else {
        textTrue.hidden = true
        textFalse.hidden = false
        input.value = "false"
        switchSpan.setAttribute("data-toggle-btn-off", "")
      }
    }

    checkbox.addEventListener("click", () => toggle())
  })
}
