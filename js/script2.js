// Variables globales
let BarContainer; 
let bars = []; 

// Données des bornes 
const bornesData = {
    "Brindas": { bornes: 2, electricVehicles: 174 },
    "Bron": { bornes: 2, electricVehicles: 466 },
    "Sainte-Foy-lès-Lyon": { bornes: 2, electricVehicles: 91 },
    "Saint-Fons": { bornes: 1, electricVehicles: 506 },
    "Vénissieux": { bornes: 2, electricVehicles: 1647 },
    "Vermaizon": { bornes: 2, electricVehicles: 401 },
    "Limas": { bornes: 2, electricVehicles: 85 },
    "Montagny": { bornes: 2, electricVehicles: 104 },
    "Francheville": { bornes: 2, electricVehicles: 544 },
    "Yzeron": { bornes: 2, electricVehicles: 1103 },
    "Caluire-et-Cuire": { bornes: 2, electricVehicles: 17 },
    "Villefranche-sur-Saône": { bornes: 4, electricVehicles: 1036 },
    "Solaize": { bornes: 4, electricVehicles: 510 },
    "Lyon": { bornes: 8, electricVehicles: 225 },
    "Dardilly": { bornes: 5, electricVehicles: 163 },
    "Communay": { bornes: 5, electricVehicles: 535 },
};

// Fonction pour animer les barres 
function animateBars() {
    BarContainer.selectAll("rect").forEach((bar) => {
        const initialHeight = bar.attr("height"); // Hauteur au debut
        const initialY = bar.attr("y"); // Position

        // Commencer l'animation avec une hauteur de 0
        bar.attr({
            height: 0, 
            y: +initialY + +initialHeight 
        });

        // Animation vers la hauteur de base
        bar.animate(
            {
                height: initialHeight, // Hauteur finale
                y: initialY // Position finale
            },
            1000,
            mina.easeinout 
        );
    });
}

// Fonction pour Observer
function observeBarres() {
    BarContainer = Snap("#barresContainer"); // Récupérer le svg

    // Charger le fichier SVG
    Snap.load("Bar.svg", function (fragment) {
        BarContainer.append(fragment); // Ajouter le svg
        setupListeners(fragment); 

        // Créer l'Intersection Observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // Déclenche l'animation si 10% est visible 
                if (entry.isIntersecting) {
                    animateBars(); 
                    observer.unobserve(entry.target); // Fin
                }
            });
        }, {
            threshold: 0.1 // Se déclenche quand 10% du graphique est visible
        });

        
        observer.observe(document.querySelector("#barresContainer"));
    });
}

// Fonction pour filtrer les barres
function filterBars(minBornes) {
    bars.forEach(bar => {
        const communeName = bar.attr("id");
        const data = bornesData[communeName];

        // Afficher les communes avec 5 bornes et plus
        if (data.bornes >= 5) { // Modifier la condition ici
            bar.attr({ display: "block" }); 
            gsap.to(bar.node, { opacity: 1, duration: 0.5 }); // Animation fluide
        } else {
            gsap.to(bar.node, { opacity: 0, duration: 0.5, onComplete: () => bar.attr({ display: "none" }) }); // Animation de disparition
        }
    });
}
// Fonction pour filtrer les barres avec le moins de bornes
function filterBarsMin() {
    bars.forEach(bar => {
        const communeName = bar.attr("id");
        const data = bornesData[communeName];

        // Afficher les communes avec 2 bornes ou moins
        if (data.bornes <= 2) {
            bar.attr({ display: "block" }); 
            gsap.to(bar.node, { opacity: 1, duration: 0.3 }); // Animation fluide
        } else {
            gsap.to(bar.node, { opacity: 0, duration: 0.3, onComplete: () => bar.attr({ display: "none" }) }); // Animation de disparition
        }
    });
}

// Fonction pour afficher toutes les barres
function showAllBars() {
    bars.forEach(bar => {
        bar.attr({ display: "block" }); // Affiche toutes les barres
        gsap.to(bar.node, { opacity: 1, duration: 0.5 }); // Animation fluide
    });
}

// Fonction pour les boutons de filtrage
function setupFilterButtons() {
    const filterButtonMax = document.getElementById("filterButtonMax");
    filterButtonMax.addEventListener("click", () => {
        filterBars(5); // Filtrer pour 5 bornes ou plus
    });

    const filterButtonMin = document.getElementById("filterButtonMin");
    filterButtonMin.addEventListener("click", filterBarsMin); // Filtrer pour le moins de bornes

    const showAllButton = document.getElementById("showAllButton");
    showAllButton.addEventListener("click", showAllBars); // Afficher toutes les barres
}

// Fonction pour la mise en place des abonnements
function setupListeners(fragment) {
    s = Snap("#barresContainer"); 

    const communes = Object.keys(bornesData); // Noms des communes

    // Sélectionner uniquement les barres des communes
    bars = communes.map(commune => s.select(`#${commune}`)).filter(bar => bar !== null);

    // Boutons de filtrage
    setupFilterButtons();
}

// quand le DOM a été entièrement chargé
window.addEventListener("load", observeBarres); 

