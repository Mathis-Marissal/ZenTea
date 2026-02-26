// Menuburger
const hamMenu = document.querySelector('.ham-menu')

const offScreenMenu = document.querySelector('.off-screen-menu')

hamMenu.addEventListener('click', () => {
    hamMenu.classList.toggle('active')
    offScreenMenu.classList.toggle('active')
})

const thes = [
    {
        id: 1,
        nom: "Thé Noir aux Boutons de Rose",
        prix: 12.90,
        categorie: "the-noir",
        image: "/assets/img/blacktea/blacktea.jpg",
        description: "Un thé noir intense et corsé délicatement parfumé par des boutons de rose. L'alliance offre une tasse ronde, florale et légèrement sucrée en fin de bouche. Idéal le matin ou pour une pause élégante dans la journée.",
        temperature: "90–95°C",
        temps: "3 à 4 minutes",
        typeTemps: "infusion"
    },
    {
        id: 2,
        nom: "Tisane Floral aux Pétales",
        prix: 11.90,
        categorie: "tisane",
        image: "/assets/img/tisane/tisane4.jpg",
        description: "Une tisane léger sublimé par un mélange de pétales colorés. Frais, végétal et subtilement fleuri, il offre une tasse délicate et rafraîchissante.",
        temperature: "75–80°C",
        temps: "2 à 3 minutes",
        typeTemps: "infusion"
    },
    {
        id: 3,
        nom: "Thé Vert Menthe",
        prix: 10.90,
        categorie: "the-vert",
        image: "/assets/img/greentea/greentea2.jpg",
        description: "Un classique incontournable : la fraîcheur intense de la menthe associée à un thé vert doux. Désaltérant et tonique, parfait après un repas ou servi glacé.",
        temperature: "75–80°C",
        temps: "2 à 3 minutes",
        typeTemps: "infusion"
    },
    {
        id: 4,
        nom: "Tisane Fleuri aux Fleurs Entières",
        prix: 13.90,
        categorie: "tisane",
        image: "/assets/img/tisane/tisane2.jpg",
        description: "Un mélange raffiné de fleurs entières (rose, camomille, souci…). Une tisane parfumée, douce et légèrement miellée, parfaite pour un moment cocooning.",
        temperature: "80°C",
        temps: "3 minutes",
        typeTemps: "infusion"
    },
    {
        id: 5,
        nom: "Thé Noir Rooibos Épicé",
        prix: 9.90,
        categorie: "the-noir",
        image: "/assets/img/blacktea/blacktea2.jpg",
        description: "Un rooibos généreux aux notes chaudes et boisées, relevé d'épices douces. Naturelle thé noir, il se déguste à tout moment de la journée.",
        temperature: "95°C",
        temps: "5 à 7 minutes",
        typeTemps: "infusion"
    },
    {
        id: 6,
        nom: "Thé Vert en Vrac",
        prix: 10.90,
        categorie: "the-vert",
        image: "/assets/img/greentea/greentea3.jpg",
        description: "Un thé vert nature aux feuilles longues et régulières. Saveur végétale, légèrement herbacée, avec une belle fraîcheur en bouche.",
        temperature: "75–80°C",
        temps: "2 à 3 minutes",
        typeTemps: "infusion"
    },
    {
        id: 7,
        nom: "Thé Vert Agrumes et Plantes",
        prix: 9.90,
        categorie: "the-vert",
        image: "/assets/img/greentea/greentea4.jpg",
        description: "Un mélange vivifiant aux écorces d'agrumes et plantes aromatiques. Un thé vert délicieux, légèrement acidulée, idéale pour une pause revitalisante.",
        temperature: "95°C",
        temps: "5 à 7 minutes",
        typeTemps: "infusion"
    },
    {
        id: 8,
        nom: "Matcha Midori",
        prix: 24.90,
        categorie: "matcha",
        image: "/assets/img/matcha/matcha2.jpg",
        description: "Un thé vert japonais réduit en fine poudre. Saveur végétale intense, légèrement umami, texture onctueuse et mousse délicate.",
        temperature: "70–80°C",
        temps: "30 secondes à 1 minute",
        typeTemps: "preparation"
    },
    {
        id: 9,
        nom: "Matcha Signature",
        prix: 59.90,
        categorie: "matcha",
        image: "/assets/img/matcha/matcha.jpg",
        description: "Un thé noir aux notes boisées et légèrement fumées. Puissant et enveloppant, il accompagne parfaitement un petit-déjeuner ou une dégustation salée.",
        temperature: "70–80°C",
        temps: "30 secondes à 1 minute",
        typeTemps: "preparation"
    },
    {
        id: 10,
        nom: "Thé Noir Nature en Vrac",
        prix: 11.90,
        categorie: "the-noir",
        image: "/assets/img/blacktea/blacktea3.jpg",
        description: "Un thé noir classique aux feuilles torsadées. Saveur robuste, légèrement maltée, avec une belle longueur en bouche.",
        temperature: "90–95°C",
        temps: "3 à 5 minutes",
        typeTemps: "infusion"
    },
    {
        id: 11,
        nom: "Tisane Chaï aux Épices",
        prix: 12.90,
        categorie: "tisane",
        image: "/assets/img/tisane/tisane3.jpg",
        description: "Une tisane chaleureux, cannelle, clou de girofle et épices parfumées. Rond et épicé, délicieux nature ou avec un nuage de lait.",
        temperature: "95°C",
        temps: "4 à 5 minutes",
        typeTemps: "infusion"
    },
    {
        id: 12,
        nom: "Thé Vert Éclat Floral",
        prix: 15.90,
        categorie: "the-vert",
        image: "/assets/img/greentea/GreenTea.jpg",
        description: "Un thé vert délicatement parfumé, sublimé par des éclats de fruits et de pétales colorés. Sa fraîcheur végétale se mêle à des notes fruitées légèrement sucrées, offrant une infusion lumineuse et raffinée.",
        temperature: "80°C",
        temps: "2 à 3 minutes",
        typeTemps: "infusion"
    }
]

//Les thés
function afficherProduits(liste) {
    const container = document.querySelector('.grille-produits')
    container.innerHTML = ''

    liste.forEach(the => {
    const labelTemps = the.typeTemps === "preparation" ? "Préparation" : "Infusion"

    const carte = document.createElement('div')
    carte.classList.add('carte')
    carte.innerHTML = `
        <a href="product.html?id=${the.id}">
            <img src="${the.image}" alt="${the.nom}">
        </a>
        <p class="carte-nom">${the.nom}</p>
        <p class="carte-prix">${the.prix.toFixed(2)}€ / 100g</p>
        <button>Ajouter</button>
`
    container.appendChild(carte)
    })
}

function afficherParCategorie(categorie) {
    const produitsFiltres = thes.filter(the => the.categorie === categorie)
    afficherProduits(produitsFiltres)
}

