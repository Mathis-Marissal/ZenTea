const params = new URLSearchParams(window.location.search)
const id = parseInt(params.get('id'))
const the = thes.find(t => t.id === id)

if (the) {
    const labelTemps = the.typeTemps === "preparation" ? "Temps de préparation" : "Temps d'infusion"
    const categorieLabel = {
        "the-vert": "Thé Vert",
        "the-noir": "Thé Noir",
        "matcha": "Matcha",
        "tisane": "Tisane"
    }

    // Rempli la page
    document.querySelector('.product-image').src = the.image
    document.querySelector('.product-nom').textContent = the.nom
    document.querySelector('.product-categorie').textContent = categorieLabel[the.categorie]
    document.querySelector('.product-prix').textContent = the.prix.toFixed(2) + "€ / 100g"
    document.querySelector('.product-description').textContent = the.description
    document.querySelector('.product-temperature').textContent = the.temperature
    document.querySelector('.product-temps').textContent = the.temps
    document.querySelector('.product-label-temps').textContent = labelTemps
    document.title = `ZenTea - ${the.nom}`

    // Quantité
    let quantite = 1

    document.getElementById('minus').addEventListener('click', () => {
        if (quantite > 1) {
            quantite--
            document.getElementById('quantite').value = quantite
            majPrix()
        }
    })

    document.getElementById('plus').addEventListener('click', () => {
        quantite++
        document.getElementById('quantite').value = quantite
        majPrix()
    })

    document.getElementById('quantite').addEventListener('change', () => {
        quantite = parseInt(document.getElementById('quantite').value) || 1
        majPrix()
    })

    function majPrix() {
        const total = (the.prix * quantite).toFixed(2)
        const grammes = quantite * 100
        document.querySelector('.product-prix').textContent = `${total}€ / ${grammes}g`
    }

    // Ajouter au panier
    document.querySelector('.product-btn').addEventListener('click', () => {
        const panier = JSON.parse(localStorage.getItem('panier') || '[]')
        const existant = panier.find(p => p.id === the.id)

        if (existant) {
            existant.quantite += quantite
        } else {
            panier.push({
                id: the.id,
                nom: the.nom,
                prix: the.prix,
                image: the.image,
                quantite: quantite
            })
        }

        localStorage.setItem('panier', JSON.stringify(panier))
        afficherPanier()
        document.querySelector('.popup-panier').classList.add('active')
        document.querySelector('.overlay-panier').classList.add('active')
    })

    // Fermer le panier
    document.querySelector('.overlay-panier').addEventListener('click', () => {
        document.querySelector('.popup-panier').classList.remove('active')
        document.querySelector('.overlay-panier').classList.remove('active')
    })

    document.querySelector('.btn-continuer').addEventListener('click', () => {
        document.querySelector('.popup-panier').classList.remove('active')
        document.querySelector('.overlay-panier').classList.remove('active')
    })
}

// Affiche le contenu du panier
function afficherPanier() {
    const panier = JSON.parse(localStorage.getItem('panier') || '[]')
    const liste = document.querySelector('.panier-liste')
    const btnFinaliser = document.querySelector('.btn-finaliser')
    liste.innerHTML = ''

    let total = 0

    if (panier.length === 0) {
        btnFinaliser.style.display = 'none'
    } else {
        btnFinaliser.style.display = 'block'
    }

    panier.forEach(item => {
        const sousTotal = (item.prix * item.quantite).toFixed(2)
        total += item.prix * item.quantite

        liste.innerHTML += `
            <div class="panier-item">
                <img src="${item.image}" alt="${item.nom}">
                <div class="panier-item-info">
                    <p class="panier-item-nom">${item.nom}</p>
                    <p class="panier-item-prix">${item.prix.toFixed(2)}€ / 100g</p>
                </div>
                <div class="panier-item-qty">
                    <button onclick="changerQty(${item.id}, -1)">−</button>
                    <span>${item.quantite}</span>
                    <button onclick="changerQty(${item.id}, 1)">+</button>
                </div>
                <button class="panier-item-delete" onclick="supprimerItem(${item.id})">🗑</button>
            </div>
        `
    })

    document.querySelector('.panier-total-prix').textContent = total.toFixed(2) + "€"
}

function changerQty(id, delta) {
    const panier = JSON.parse(localStorage.getItem('panier') || '[]')
    const item = panier.find(p => p.id === id)
    if (item) {
        item.quantite += delta
        if (item.quantite <= 0) {
            panier.splice(panier.indexOf(item), 1)
        }
    }
    localStorage.setItem('panier', JSON.stringify(panier))
    afficherPanier()
}

function supprimerItem(id) {
    const panier = JSON.parse(localStorage.getItem('panier') || '[]')
    const nouveauPanier = panier.filter(p => p.id !== id)
    localStorage.setItem('panier', JSON.stringify(nouveauPanier))
    afficherPanier()
}

// Produits similaires
function afficherSimilaires() {
    const similaires = thes.filter(t => t.categorie === the.categorie && t.id !== the.id)
    
    const section = document.createElement('section')
    section.classList.add('similaires-section')
    section.innerHTML = `
        <h2 class="similaires-titre">Vous aimerez aussi</h2>
        <div class="similaires-grille"></div>
    `
    
    document.querySelector('.produit-container').after(section)
    
    const grille = section.querySelector('.similaires-grille')
    
    similaires.forEach(t => {
        const carte = document.createElement('div')
        carte.classList.add('carte-similaire')
        carte.innerHTML = `
            <a href="/product.html?id=${t.id}">
                <img src="${t.image}" alt="${t.nom}">
            </a>
            <p class="similaire-nom">${t.nom}</p>
            <p class="similaire-prix">${t.prix.toFixed(2)}€ / 100g</p>
            <button class="similaire-btn" data-id="${t.id}">Ajouter</button>
        `
        
        carte.querySelector('.similaire-btn').addEventListener('click', () => {
            ajouterAuPanier(t.id, 1)
            afficherPanier()
            document.querySelector('.popup-panier').classList.add('active')
            document.querySelector('.overlay-panier').classList.add('active')
        })
        
        grille.appendChild(carte)
    })
}

afficherSimilaires()
