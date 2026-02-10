let elements = []

async function getCategory() {

    const reponse = await fetch ("http://localhost:5678/api/categories")
    const categories = await reponse.json()
    const btnFilter = document.getElementById("btn-filter")

    const btnFilterInput = document.createElement("input")
    const btnFilterLabel = document.createElement("label")
    const indexAddImg = document.querySelector(".gallery")

    btnFilterInput.type = 'radio'
    btnFilterInput.name = 'filter'
    btnFilterInput.id = 0
    btnFilterInput.checked = true

    btnFilterLabel.htmlFor = 0
    btnFilterLabel.textContent = 'Tous'

    btnFilterInput.classList.add("btn-filter")
    btnFilterLabel.classList.add("objets")

    btnFilter.appendChild(btnFilterInput)
    btnFilter.appendChild(btnFilterLabel)


    btnFilterInput.addEventListener("change", ()=>{
        indexAddImg.innerHTML = ""
        if(Number(btnFilterInput.id) === 0){
            afficherElements(elements)
        }
    })

    for (let i = 0; i < categories.length; i++) {
        
        const btnFilterInput = document.createElement("input")
        const btnFilterLabel = document.createElement("label")

        btnFilterInput.type = 'radio'
        btnFilterInput.name = 'filter'
        btnFilterInput.id = categories[i].id

        btnFilterLabel.htmlFor = btnFilterInput.id
        btnFilterLabel.textContent = categories[i].name

        btnFilterInput.classList.add("btn-filter")
        btnFilterLabel.classList.add("objets")

        btnFilter.appendChild(btnFilterInput)
        btnFilter.appendChild(btnFilterLabel)

        btnFilterInput.addEventListener("change", ()=>{
            const btnSelect = Number(btnFilterInput.id)
            indexAddImg.innerHTML = ""
            const elementFiltre = elements.filter((indexElement)=>indexElement.categoryId === btnSelect)
            afficherElements(elementFiltre)            
        })
    }
}

async function getElements() {
    
    const reponse = await fetch ("http://localhost:5678/api/works")
    elements = await reponse.json()
    afficherElements(elements)
}

async function afficherElements(elements) {
    
    const indexAddImg = document.querySelector(".gallery")

    for (let i = 0; i < elements.length; i++) {
        
        const figure = document.createElement("figure")
        const img = document.createElement("img")
        const figcaption = document.createElement("figcaption")

        figcaption.innerText = elements[i].title
        img.src = elements[i].imageUrl
        img.alt = elements[i].title

        figure.appendChild(img)
        figure.appendChild(figcaption)
        indexAddImg.appendChild(figure)
        
        console.log(elements[i]);
    }
}

getCategory()
getElements()
afficherElements(elements)
