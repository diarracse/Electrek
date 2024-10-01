// Variables globales 
let conteneurBulles;

// Fonction pour charger et afficher le svg
function afficherBulles() {
    conteneurBulles = Snap("#bullesContainer");

    Snap.load("Bulles.svg", function (fragment) {
        conteneurBulles.append(fragment);

        // Sélectionner toutes les bulles
        const bullesElements = conteneurBulles.selectAll("circle");

        // Hover pour chaque bulle
        bullesElements.forEach(function(bulleElement) {
            bulleElement.mouseover(function() {
                this.animate({ transform: "s1.5" }, 300); // Agrandissemnt dde la bulle
            });

            // Événement lorsque la souris sort de la bulle
            bulleElement.mouseout(function() {
                this.animate({ transform: "s1" }, 300); // Revenir à la taille originale
            });
        });
    });
}

// quand le DOM a été entièrement chargé
window.addEventListener("load", afficherBulles);


