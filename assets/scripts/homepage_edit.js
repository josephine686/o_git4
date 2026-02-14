const modifier = document.getElementById("acces-modal")
const modalEdit = document.getElementById("modal-edit")
const modalExit = document.getElementsByClassName("logo-modal-droit")
const modalBoutonAjouter = document.getElementById("model-bouton-ajouter")
const modalForm = document.getElementById("modal-edit-form")
const modalFleche = document.getElementsByClassName("logo-modal-gauche")
const modalBackground = document.querySelectorAll(".modal-background")
const inputImgAdd = document.getElementById("img-import")
const btnOn = document.getElementById("btn-on")

let titreValue = ""
let cateValue = ""


modifier.addEventListener("click", () => {
    modalEdit.classList.remove("modal-hidden")
})

modalExit[0].addEventListener("click", () => {
    modalEdit.classList.add("modal-hidden")
})

modalBoutonAjouter.addEventListener("click", () => {
    modalEdit.classList.add("modal-hidden")
    modalForm.classList.remove("modal-hidden")
})

modalExit[1].addEventListener("click", () => {
    modalForm.classList.add("modal-hidden")
})

modalFleche[0].addEventListener("click", () => {
    modalForm.classList.add("modal-hidden")
    modalEdit.classList.remove("modal-hidden")
})

for (let i = 0; i < modalBackground.length; i++) {
    modalBackground[i].addEventListener("click", () => {
        modalEdit.classList.add("modal-hidden")
        modalForm.classList.add("modal-hidden")
    })
}

function logout() {
    const logout = document.getElementById("login")

    logout.addEventListener("click", () => {

        const token = sessionStorage.getItem("token")
        const userId = sessionStorage.getItem("userId")

        if (token && userId) {
            window.sessionStorage.removeItem("token")
            window.sessionStorage.removeItem("userId")
            window.location.href = "index.html"
        } else {
            window.location.href = "login.html"
        }
    })

}


async function getImageModal() {

    const responsePhoto = await fetch("http://localhost:5678/api/works")
    const imageApi = await responsePhoto.json()
    const modalAddImg = document.querySelector(".modal-grid-images")

    for (let i = 0; i < imageApi.length; i++) {

        const div = document.createElement("div")
        div.classList.add("img-modal-grid")
        div.id = imageApi[i].id
        const been = document.createElement("img")
        been.classList.add("been-logo")
        been.id = imageApi[i].id
        been.src = "./assets/icons/supprimer.svg"
        const img = document.createElement("img")
        img.classList.add("image-presentation")
        img.src = imageApi[i].imageUrl
        img.alt = imageApi[i].title

        div.appendChild(img)
        div.appendChild(been)
        modalAddImg.appendChild(div)

        been.addEventListener("click", async () => {
            console.log(been.id)
            const responseDel = await fetch("http://localhost:5678/api/works/" + been.id, {
                method: "DELETE",
                headers: {
                    "content-type": "text/html; charset=utf-8",
                    "Authorization": `Bearer ${window.sessionStorage.getItem("token")}`,
                }
            })
            div.remove()

            const reset = document.querySelector(".gallery")
            reset.innerHTML = ""
            await getImageHomePageEdit()
        })
    }
}

async function getCategory() {

    const reponse = await fetch("http://localhost:5678/api/categories")
    const categories = await reponse.json()
    const filterSelect = document.getElementById("categorie")

    const filter = document.createElement("option")

    filter.value = 0

    filter.innerText = 'Tous'

    filterSelect.appendChild(filter)

    for (let i = 0; i < categories.length; i++) {

        const filterSelect = document.getElementById("categorie")
        const filter = document.createElement("option")
        filter.value = categories[i].id
        filter.innerText = categories[i].name
        filterSelect.appendChild(filter)
    }
}

async function getImageHomePageEdit() {

    const responsePhoto = await fetch("http://localhost:5678/api/works")
    const imageApi = await responsePhoto.json()

    const EditAddImg = document.querySelector(".gallery")

    for (let i = 0; i < imageApi.length; i++) {

        const figure = document.createElement("figure")
        const img = document.createElement("img")
        const figcaption = document.createElement("figcaption")
        figcaption.innerText = imageApi[i].title
        img.src = imageApi[i].imageUrl
        img.alt = imageApi[i].title

        figure.appendChild(img)
        figure.appendChild(figcaption)
        EditAddImg.appendChild(figure)
    }
}

async function addImageHomePageEdit() {

    const inputImgAdd = document.getElementById("img-import")
    const imgChange = document.querySelector(".modal-image")
    const imgSwitch = document.querySelector(".modal-label-dyna")
    const titreAdd = document.querySelector("input[name='titre']")
    const cateAdd = document.querySelector("select[name='categorie']")

    const divImg = document.createElement("div")
    divImg.classList.add("img-change")
    divImg.classList.add("modal-hidden")
    const img = document.createElement("img")

    divImg.appendChild(img)
    imgChange.appendChild(divImg)

    titreValue = titreAdd.value
    cateValue = cateAdd.value
    btnControl()

    inputImgAdd.addEventListener("change", () => {

        let imgReader = inputImgAdd.files[0]
        let imgR = new FileReader()
        imgR.onload = function () {

            imgSwitch.style.display = "none"
            divImg.classList.remove("modal-hidden")
            img.src = imgR.result
        }
        imgR.readAsDataURL(imgReader)
    })

    titreAdd.addEventListener("input", () => {
        titreValue = titreAdd.value
        console.log(titreValue)
        btnControl()
    })

    cateAdd.addEventListener("input", () => {
        cateValue = cateAdd.value
        console.log(cateValue);
        btnControl()
    })

    modalAddValider()

}

function btnControl() {
    const inputImgAdd = document.getElementById("img-import")

    if (titreValue !== "" && cateValue !== "") {

        btnOn.classList.remove("btn-valider-false")
        btnOn.classList.add("btn-valider-true")
        btnOn.disabled = false

    } else {

        btnOn.classList.add("btn-valider-false")
        btnOn.classList.remove("btn-valider-true")
        btnOn.disabled = true
    }
}

async function modalAddValider() {
    const btnValider = document.getElementById("btn-on")
    btnValider.addEventListener("click", async (e) => {
        e.preventDefault()

        const data = new FormData()

        data.append("title", titreValue)
        data.append("image", inputImgAdd.files[0])
        data.append("category", Number(cateValue))

        console.log(inputImgAdd.files[0].type + inputImgAdd.files[0].size);
        

        if ((inputImgAdd.files[0].type === "image/png"
            || inputImgAdd.files[0].type === "image/jpeg")
            && inputImgAdd.files[0].size <= 4194304) {
            await fetch("http://localhost:5678/api/works", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${window.sessionStorage.getItem("token")}`,
                },
                body: data
            })
            const reset = document.querySelector(".gallery")
            reset.innerHTML = ""
            await getImageHomePageEdit()

            const modalReset = document.querySelector(".modal-grid-images")
            modalReset.innerHTML = ""
            await getImageModal()

            modalForm.classList.add("modal-hidden")

            const form = document.getElementById("form-modal-img")
            form.reset()

            const imgPreview = document.querySelector(".img-change")
            imgPreview.classList.add("modal-hidden")


            const imgSwitch = document.querySelector(".modal-label-dyna")
            imgSwitch.style.display = "flex"
        }
        else {
            alert("Verifier le type et poid du fichier.")
        }
    })
}

logout()
getCategory()
addImageHomePageEdit()
getImageModal()
getImageHomePageEdit()