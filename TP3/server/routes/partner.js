const path = require("path");
const { HTTP_STATUS } = require("../utils/http");
const router = require("express").Router();
const { FileManager } = require("../managers/fileManager");
const { PartnerManager } = require("../managers/partnerManager");
const { ReviewManager } = require("../managers/reviewManager");

const partnerManager = new PartnerManager(new FileManager(path.join(__dirname + "/../data/partners.json")));

//on cree une instance de reviewManager
const reviewManager = new ReviewManager(new FileManager(path.join(__dirname + "/../data/reviews.json")));

router.get("/", async (request, response) => {
    try {
        const partners = await partnerManager.getPartners();

        if (partners.length !== 0) {
            return response.status(HTTP_STATUS.SUCCESS).json(partners);
        } else {
            response.status(HTTP_STATUS.NO_CONTENT).send();
        }
    } catch (error) {
        response.status(HTTP_STATUS.SERVER_ERROR).json(error);
    }
});

/* TODO : Ajouter les routes nécessaires pour compléter les fonctionnalitées suivantes :
    - Obtenir un partenaire en fonction de son identifiant
    - Supprimer un partenaire en fonction de son identifiant ET supprimer toutes les revues pour ce partenaire
    - Ajouter un nouveau partenaire
        - Envoyer le nouveau partenaire dans la réponse HTTP
    Note : utilisez les méthodes HTTP et les codes de retour appropriés
*/
router.put("/like/:id", async (request, response) => {
    try {
        const reviewLiked = await reviewManager.likeReview(request.params.id);

        if (reviewLiked) {
            response.status(HTTP_STATUS.SUCCESS).send();
        } else {
            response.status(HTTP_STATUS.NOT_FOUND).send();
        }
    } catch (error) {
        response.status(HTTP_STATUS.SERVER_ERROR).json(error);
    }
});


/**
 * obtenir un partenaire en fonction de son identifiant
 * @memberof module:routes/partner
 * @name GET /partners/:id
 */
router.get("/:id", async (request, response) => {
    try {
        const partner = await partnerManager.getPartner(request.params.id);
        if (partner) {
            return response.status(HTTP_STATUS.SUCCESS).json(partner);
        } else {
            response.status(HTTP_STATUS.NOT_FOUND).send();
        }
    } catch (error) {
        response.status(HTTP_STATUS.SERVER_ERROR).json(error);
    }
});

/**
 * Supprimer un partenaire en fonction de son identifiant 
 * ET supprimer toutes les revues pour ce partenaire
 * 
 * @memberof module:routes/partner
 * @name DELETE /partners/:id
 */

router.delete("/:id", async (request, response) => {
    try {
       const partnerDelete = await partnerManager.deletePartner(request.params.id);

        if (partnerDelete ) {
            
            const reviewDelete = await reviewManager.deleteReviewsMatchingPredicate((review) =>
            review.reviewedPartnerId === request.params.id);
            
            response.status(HTTP_STATUS.SUCCESS).send();

        } else {
            response.status(HTTP_STATUS.NOT_FOUND).send();
        }

    } catch (error) {
        response.status(HTTP_STATUS.SERVER_ERROR).json(error);
    }

});


/**
 * Ajouter un nouveau partenaire
 * Utisliser le nouveau partenaire dans la réponse HTTP
 * 
 * @memberof module:routes/partner
 * @name POST /partners
 */


router.post("/", async (request, response) => {
    try {
        const { firstName, lastName, school, program } = request.body;
        if (!firstName || !lastName || !school || !program) {
            return response.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Missing required fields" });
        }

        const newPartner = await partnerManager.addPartner(request.body);
        response.status(HTTP_STATUS.CREATED).json(newPartner);
    } catch (error) {
        response.status(HTTP_STATUS.BAD_REQUEST).json(error);
    }
});


module.exports = { router, partnerManager };
