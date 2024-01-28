const { randomUUID } = require("crypto");

class PartnerManager {
    constructor(fileManager) {
        this.fileManager = fileManager;
    }

    /**
     * TODO : Récupérer les partenaires du fichier JSON
     * @returns {Object[]} la liste des partenaires du fichier JSON
     */
    async getPartners() {
        const partners = await this.fileManager.readFile();
        return JSON.parse(partners);
    }


    /**
     * TODO : Récupérer un partenaire en fonction de son identifiant
     * @param {string} partnerId l'identifiant du partenaire
     * @returns {Object| undefined} le partenaire, si existant
     */
    async getPartner(partnerId) {
        const partners = await this.getPartners();
        return partners.find(partner => partner.id === partnerId);
    }

    /**
     * TODO : Ajouter un nouveau partenaire au fichier JSON
     * @param {Object} partner le partenaire à ajouter
     * @returns {Object} le nouveau partenaire ajouté
     */
    async addPartner(partner) {
        partner.id = randomUUID();

        const partners = await this.getPartners();
        partners.push(partner);
        await this.fileManager.writeFile(JSON.stringify(partners));
        return partners;
    }


    /**
     * TODO : Supprimer un partenaire du fichier JSON
     * @param {string} partnerId l'identifiant du partenaire
     * @returns {boolean} true si suppression, false sinon
     */
    async deletePartner(partnerId) {


        const partners = await this.getPartners();
        const remainingPartners = partners.filter((partner) => partner.id !== partnerId);
        await this.fileManager.writeFile(JSON.stringify(remainingPartners, null, 2));

        return remainingPartners.length !== partners.length;

    }
}

module.exports = { PartnerManager };
