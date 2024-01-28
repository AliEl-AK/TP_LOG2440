const path = require("path");
const { HTTP_STATUS } = require("../utils/http");
const router = require("express").Router();
const { FileManager } = require("../managers/fileManager");
const { ReviewManager } = require("../managers/reviewManager");

const reviewManager = new ReviewManager(new FileManager(path.join(__dirname + "/../data/reviews.json")));

router.get("/", async (request, response) => {
    try {
        const reviews = await reviewManager.getReviews();

        if (reviews.length !== 0) {
            response.status(HTTP_STATUS.SUCCESS).json(reviews);
        } else {
            response.status(HTTP_STATUS.NO_CONTENT).send();
        }
    } catch (error) {
        response.status(HTTP_STATUS.SERVER_ERROR).json(error);
    }
});

router.get("/:partnerId", async (request, response) => {
    try {
        const reviews = await reviewManager.getReviewsForPartner(request.params.partnerId);

        if (reviews.length !== 0) {
            response.status(HTTP_STATUS.SUCCESS).json(reviews);
        } else {
            response.status(HTTP_STATUS.NO_CONTENT).send();
        }
    } catch (error) {
        response.status(HTTP_STATUS.SERVER_ERROR).json(error);
    }
});

/* TODO : Ajouter les routes nécessaires pour compléter les fonctionnalitées suivantes :
    - Incrémenter le compteur de "likes" d'une revue en fonction de son identifiant
    - Supprimer une revue en fonction de son identifant
    - Ajouter une nouvelle revue seulement après avoir validé que tous les éléments nécessaires sont envoyés
        - Envoyer la nouvelle revue dans la réponse HTTP
    Note : utilisez les méthodes HTTP et les codes de retour appropriés
*/
/**
 * Supprimer une revue en fonction de son identifiant
 * @memberof module:routes/review
 * @name DELETE /reviews/:id
 */
router.patch("/like/:reviewId", async (request, response) => {
    try {
        const liked = await reviewManager.likeReview(request.params.reviewId);

        if (liked) {
            response.status(HTTP_STATUS.SUCCESS).json(liked + 1 );
        } 
    }
        catch (error) {
            response.status(HTTP_STATUS.NOT_FOUND).send();
        }
});

router.delete("/:reviewId", async (request, response) => {
    try {
        const deleted = await reviewManager.deleteReviewsMatchingPredicate(request.params.reviewId);

        if (deleted) {
            response.status(HTTP_STATUS.SUCCESS).send();
        } else {
            response.status(HTTP_STATUS.NOT_FOUND).send();
        }
    } catch (error) {
        response.status(HTTP_STATUS.SERVER_ERROR).json(error);
    }
});

router.post("/", async (request, response) => {
    try {
        const reviews = await reviewManager.addReview(request.body);

        const addedReview = reviews[reviews.length - 1];

        response.status(HTTP_STATUS.CREATED).json(addedReview);
    } catch (error) {
        response.status(HTTP_STATUS.BAD_REQUEST).json(error);
    }
});
module.exports = { router, reviewManager };
