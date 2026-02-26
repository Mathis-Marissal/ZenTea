// Affiche le total
const panier = JSON.parse(localStorage.getItem('panier') || '[]')
const total = panier.reduce((acc, item) => acc + item.prix * item.quantite, 0)
document.getElementById('pay-total-prix').textContent = total.toFixed(2) + '€'

majBadgePanier()

// Bouton procéder
document.getElementById('btn-proceder').addEventListener('click', () => {
    document.querySelector('.popup-merci').classList.add('active')
    document.querySelector('.overlay-merci').classList.add('active')
    // Vide le panier
    localStorage.removeItem('panier')
    majBadgePanier()
})

// Retour accueil
document.getElementById('btn-merci').addEventListener('click', () => {
    window.location.href = '/index.html'
})