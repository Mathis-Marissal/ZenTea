function afficherPanier() {
    const panier = JSON.parse(localStorage.getItem('panier') || '[]')
    const liste = document.querySelector('.panier-liste')
    const totalBloc = document.getElementById('panier-total-bloc')
    const actionsBloc = document.getElementById('panier-actions')
    const totalPrix = document.querySelector('.panier-total-prix')

    liste.innerHTML = ''

    // PANIER VIDE
    if (panier.length === 0) {
        liste.innerHTML = `
            <div class="panier-vide">
                <p>Votre panier est vide.</p>
                <a href="/index.html">Découvrir nos thés</a>
            </div>
        `
        totalBloc.classList.remove('visible')
        actionsBloc.classList.remove('visible')
        totalPrix.textContent = "0.00€"
        return
    }

    let total = 0

    panier.forEach(item => {
        total += item.prix * item.quantite

        const article = document.createElement('div')
        article.classList.add('panier-item')

        article.innerHTML = `
            <img src="${item.image}" alt="${item.nom}">
            
            <div class="panier-item-info">
                <p class="panier-item-nom">${item.nom}</p>
                <p class="panier-item-prix">${item.prix.toFixed(2)}€ / 100g</p>
            </div>

            <div class="panier-item-controls">
                <div class="panier-item-qty">
                    <button class="btn-moins">−</button>
                    <span>${item.quantite}</span>
                    <button class="btn-plus">+</button>
                </div>
                <button class="panier-item-delete">🗑</button>
            </div>
        `

        // Bouton +
        article.querySelector('.btn-plus')
            .addEventListener('click', () => changerQty(item.id, 1))

        // Bouton -
        article.querySelector('.btn-moins')
            .addEventListener('click', () => changerQty(item.id, -1))

        // Bouton supprimer
        article.querySelector('.panier-item-delete')
            .addEventListener('click', () => supprimerItem(item.id))

        liste.appendChild(article)
    })

    totalPrix.textContent = total.toFixed(2) + '€'
    totalBloc.classList.add('visible')
    actionsBloc.classList.add('visible')
}

function changerQty(id, delta) {
    const panier = JSON.parse(localStorage.getItem('panier') || '[]')
    const item = panier.find(p => p.id === id)

    if (item) {
        item.quantite += delta

        // BONUS SÉCURITÉ :
        // Si la quantité devient 0 ou négative → suppression automatique
        if (item.quantite <= 0) {
            const index = panier.indexOf(item)
            panier.splice(index, 1)
        }
    }

    localStorage.setItem('panier', JSON.stringify(panier))
    
    if (typeof majBadgePanier === "function") {
        majBadgePanier()
    }

    afficherPanier()
}

function supprimerItem(id) {
    const panier = JSON.parse(localStorage.getItem('panier') || '[]')
    const nouveauPanier = panier.filter(p => p.id !== id)

    localStorage.setItem('panier', JSON.stringify(nouveauPanier))

    if (typeof majBadgePanier === "function") {
        majBadgePanier()
    }

    afficherPanier()
}

// INITIALISATION
document.addEventListener("DOMContentLoaded", afficherPanier)