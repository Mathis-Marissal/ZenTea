function afficherPanier() {
    const panier = JSON.parse(localStorage.getItem('panier') || '[]')
    const liste = document.querySelector('.panier-liste')
    const totalBloc = document.getElementById('panier-total-bloc')
    const actionsBloc = document.getElementById('panier-actions')

    liste.innerHTML = ''

    // Panier vide
    if (panier.length === 0) {
        liste.innerHTML = `
            <div class="panier-vide">
                <p>Votre panier est vide.</p>
                <a href="/index.html">Découvrir nos thés</a>
            </div>
        `
        totalBloc.classList.remove('visible')
        actionsBloc.classList.remove('visible')
        return
    }

    // Articles
    let total = 0

    panier.forEach(item => {
        total += item.prix * item.quantite
        liste.innerHTML += `
            <div class="panier-item">
                <img src="${item.image}" alt="${item.nom}">
                <div class="panier-item-info">
                    <p class="panier-item-nom">${item.nom}</p>
                    <p class="panier-item-prix">${item.prix.toFixed(2)}€</p>
                </div>
                <div class="panier-item-controls">
                    <div class="panier-item-qty">
                        <button onclick="changerQty(${item.id}, -1)">−</button>
                        <span>${item.quantite}</span>
                        <button onclick="changerQty(${item.id}, 1)">+</button>
                    </div>
                    <button class="panier-item-delete" onclick="supprimerItem(${item.id})">🗑</button>
                </div>
            </div>
        `
    })

    document.querySelector('.panier-total-prix').textContent = total.toFixed(2) + '€'
    totalBloc.classList.add('visible')
    actionsBloc.classList.add('visible')
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
    majBadgePanier()
    afficherPanier()
}

function supprimerItem(id) {
    const panier = JSON.parse(localStorage.getItem('panier') || '[]')
    localStorage.setItem('panier', JSON.stringify(panier.filter(p => p.id !== id)))
    majBadgePanier()
    afficherPanier()
}

// Initialisation
afficherPanier()
