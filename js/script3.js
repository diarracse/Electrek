// Variables globales
let title, image;

// Fonction d'animation pour le titre et l'image
function animateTitleAndImage() {
    // Animation titre
    gsap.from(title, { 
        y: -50, // Position de base
        opacity: 0, // Invisible au debut
        duration: 1, 
        ease: "power1.out" // Animation fluide
    });

    // Animation l'image 
    gsap.from(image, {
        x: 500, // Position de base
        opacity: 0, // Invisible au debut
        duration: 1.5, 
        ease: "power1.out" // Animation fluide
    });
}

// Fonction pour la mise en place des abonnements
function animation() {
    // Recuperation des élements dans le dom
    title = document.getElementById("titre"); // Titre
    image = document.getElementById("imgVoiture"); // Image

    // Lance l'animation après chargement du DOM
    animateTitleAndImage();
}

// quand le DOM a été entièrement chargé
window.addEventListener("load", animation); 
