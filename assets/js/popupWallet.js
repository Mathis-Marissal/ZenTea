// Popup supprimer
document.querySelector('.delete-btn').addEventListener('click', () => {
    document.querySelector('.popup-supprimer').classList.add('active')
    document.querySelector('.overlay-supprimer').classList.add('active')
})

document.querySelector('.overlay-supprimer').addEventListener('click', () => {
    document.querySelector('.popup-supprimer').classList.remove('active')
    document.querySelector('.overlay-supprimer').classList.remove('active')
})

document.querySelector('.btn-garder').addEventListener('click', () => {
    document.querySelector('.popup-supprimer').classList.remove('active')
    document.querySelector('.overlay-supprimer').classList.remove('active')
})

// Popup carte
document.querySelector('.add-card-btn').addEventListener('click', () => {
    document.querySelector('.popup-carte').classList.add('active')
    document.querySelector('.overlay-carte').classList.add('active')
})

document.querySelector('.overlay-carte').addEventListener('click', () => {
    document.querySelector('.popup-carte').classList.remove('active')
    document.querySelector('.overlay-carte').classList.remove('active')
})