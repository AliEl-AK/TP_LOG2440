// TODO : Récupérer les bons éléments des fichiers externes
import HTTPManager from "./HTTPManager.js";
import SERVER_URL from "./consts.js";

const httpManager = new HTTPManager(SERVER_URL);

const submitButton = document.getElementById('submit-btn');
submitButton.addEventListener('click', async (e) => {
    const partnerFirstName = document.getElementById('first-name').value;
    const partnerLastName = document.getElementById('last-name').value;
    const partnerProgram = document.getElementById('program').value;
    const partnerSchool = document.getElementById('school').value;

    // TODO : Compléter la création de l'objet du partenaire

    const partner = {
        firstName: partnerFirstName,
        lastName: partnerLastName,
        program: partnerProgram,
        school: partnerSchool
    };
    // TODO : Ajouter un nouveau partenaire à travers le serveur.
    // TODO : Rediriger l'utilisateur vers index.html en cas de réussite ou /error.html en cas d'échec
    try {
        const response = await httpManager.post('/api/partner', partner);
        console.log(response)
        window.alert("Le partenaire " + partner.firstName + " a été créé avec succès !");
        window.location.href = 'index.html';
    } catch (error) {
        alert("Échec de la création du partenaire !" );
        window.location.href = 'error.html';
    }


});
