// Affiche le total depuis le localStorage
const panier = JSON.parse(localStorage.getItem('panier') || '[]')
const total = panier.reduce((acc, item) => acc + item.prix * item.quantite, 0)
document.getElementById('liv-total-prix').textContent = total.toFixed(2) + '€'

majBadgePanier()