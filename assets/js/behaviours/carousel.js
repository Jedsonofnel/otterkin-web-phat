export default function carousel(tree = document) {
  tree.querySelectorAll("[data-carousel]").forEach((container) => {
    // will either be max width number in px or NaN
    const maxWidth = Number(container.getAttribute("data-carousel"))

    const mq =
      maxWidth !== NaN
        ? window.matchMedia(`(max-width: ${maxWidth}px)`)
        : window.matchMedia("(max-width: 100000px)")

    function addCarousel(matches) {
      // do stuff
    }
    addCarousel(mq.matches)

    mq.addEventListener("change", (e) => addCarousel(e.matches))
  })
}
