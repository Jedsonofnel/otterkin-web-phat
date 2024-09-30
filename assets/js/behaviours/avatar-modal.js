import Croppie from "../vendored/croppie.cjs"

const croppieOptions = {
  showZoomer: true,
  enableOrientation: true,
  mouseWheelZoom: "ctrl",
  viewport: {
    width: 220,
    height: 220,
    type: "circle",
  },
  boundary: {
    width: "320px",
    height: "320px",
  },
}

export default function avatarModal(tree = document) {
  tree.querySelectorAll("[data-avatar-modal-form]").forEach((form) => {
    const avatarInput = form.querySelector("[data-avatar-modal-input]")
    const croppie = form.querySelector("[data-avatar-modal-croppie]")
    const placeholder = form.querySelector("[data-avatar-modal-placeholder]")
    const submitBtn = form.querySelector("[data-avatar-modal-submit]")

    // the thing with the logic
    const avatarCroppie = new Croppie(croppie, croppieOptions)

    const readFile = (input) => {
      if (input.files && input.files[0]) {
        const reader = new FileReader()
        reader.readAsDataURL(input.files[0])
        reader.onload = () => {
          croppie.removeAttribute("hidden")
          placeholder.setAttribute("hidden", "")
          submitBtn.removeAttribute("disabled")
          avatarCroppie.bind({ url: reader.result })
        }
      }
    }
    avatarInput.addEventListener("change", () => readFile(avatarInput))

    // crop image before form send
    document.body.addEventListener("htmx:confirm", (evt) => {
      // ensure this is the avatar form event
      if (!evt.detail.elt.getAttribute("data-avatar-modal-form")) return

      // otherwise prevent default behaviour and crop image
      evt.preventDefault()
      avatarCroppie
        .result("blob", "original", "png", 1, false)
        .then((result) => {
          const imageFile = new File([result], "avatar.png", {
            type: "image/png",
            lastModified: new Date(),
          })
          const dt = new DataTransfer()
          dt.items.add(imageFile)
          evt.detail.elt.avatar.files = dt.files
          evt.detail.issueRequest()
        })
    })
  })
}
