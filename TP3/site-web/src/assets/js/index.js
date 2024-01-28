import HTTPManager from "./HTTPManager.js";
import SERVER_URL from "./consts.js";

// TODO : Charger tous les partenaires du serveur
const httpManager = new HTTPManager(SERVER_URL);
async function loadPartners() {
    try {
        
        const partners = await httpManager.get('/api/partner');
        return partners;
    } catch (error) {
        console.error('Erreur:', error);
        
    }
}


async function initializePage() {
    const partnersList = await loadPartners();
    generateHTML(partnersList);
}


function generateHTML(partnersList) {
    const partnersContainer = document.getElementById('partners-container');
    
    if (partnersList && partnersList.length > 0) {
        partnersContainer.innerHTML = partnersList.map(partner => `
            <div class="partner">
                <h3>${partner.firstName} ${partner.lastName}</h3>
                <h4>${partner.school}</h4>
                <a href="partner.html?id=${partner.id}">Voir le profil</a>
            </div>
        `).join('');
    } else {
        
        partnersContainer.innerHTML = `
            <div class="partner">
                <h3>Aucun partenaire pour le moment.</h3>
                <img src="assets/img/no_students.png" alt="Aucun partenaire pour le moment.">
            </div>
        `;
    }
}


initializePage();

