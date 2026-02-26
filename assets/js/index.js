//Le filtre
function filtrer(categorie) {
    if (categorie === 'all') {
        afficherProduits(thes)
    } else {
        const filtre = thes.filter(the => the.categorie === categorie)
        afficherProduits(filtre)
    }
}

document.querySelectorAll('.filtre-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filtre-btn').forEach(b => b.classList.remove('active'))
        btn.classList.add('active')
        filtrer(btn.dataset.categorie)
    })
})

afficherProduits(thes)

//Les meilleurs thés
function afficherMeilleurs() {
    const idsMeilleurs = [9, 12]
    const meilleurs = thes.filter(the => idsMeilleurs.includes(the.id))
    const container = document.querySelector('.grille-meilleurs')

    meilleurs.forEach(the => {
    const carte = document.createElement('a')  
    carte.classList.add('carte')
    carte.href = `product.html?id=${the.id}` 
    carte.innerHTML = `
        <img src="${the.image}" alt="${the.nom}">
        <p class="carte-nom">${the.nom}</p>
        <p class="carte-prix">${the.prix.toFixed(2)}€</p>
        <button>Ajouter</button>
    `
    container.appendChild(carte)
})
}

afficherMeilleurs()

