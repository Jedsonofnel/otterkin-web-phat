export default function saveIndicator(tree=document) {
  tree.querySelectorAll("[data-save-indicator]").forEach(indicator => {
    const query = indicator.getAttribute("data-save-indicator")
    const monitoredInput = document.querySelector(query)

    if (!monitoredInput) {
      console.error(`Could not find: ${query}!`)
    }

    // if the corresponding id is an input, textarea or select
    monitoredInput.oninput = (() => {
      indicator.textContent = "Saving..."
      indicator.hidden=false
    })
  })
}
