// avatar stuff
import htmx from "htmx.org"
import Croppie from "croppie"

htmx.onLoad((content) => {
  const avatarForm = content.querySelectorAll("#avatar-form")
  if (avatarForm[0]) {
    initializeAvatarMalarkey()
  }
})

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

const initializeAvatarMalarkey = () => {
  const avatarUploader = document.getElementById("avatar-uploader")
  const croppie = document.getElementById("croppie")
  const placeholder = document.getElementById("placeholder")
  const submitBtn = document.getElementById("avatar-submit")
  const avatarCroppie = new Croppie(croppie, croppieOptions)

  const readFile = (input) => {
    if (input.files && input.files[0]) {
      const reader = new FileReader()
      reader.readAsDataURL(input.files[0])
      reader.onload = () => {
        croppie.classList.remove("not-visible")
        placeholder.classList.add("not-visible")
        submitBtn.classList.remove("disabled")
        avatarCroppie.bind({ url: reader.result })
      }
    }
  }
  avatarUploader.addEventListener("change", () => readFile(avatarUploader))

  window.cropAvatar = (evt) => {
    // basically we need to wait for croppie to finish so we need to use
    // htmx:confirm to delay the request, do the croppie async stuff
    // then issueRequest()
    evt.preventDefault()

    avatarCroppie.result("blob", "original", "png", 1, false).then((result) => {
      const imageFile = new File([result], "avatar.png", {
        type: "image/png",
        lastModified: new Date(),
      })
      const dt = new DataTransfer()
      dt.items.add(imageFile)
      evt.detail.elt.avatar.files = dt.files
      evt.detail.issueRequest()
    })
  }
}
