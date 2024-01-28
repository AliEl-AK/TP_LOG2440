# Jest et tests unitaires

La bibliothèque <a href="https://jestjs.io/">Jest</a> est utilisée dans ce travail pratique. La librairie <a href="https://github.com/ladjs/supertest#readme">Supertest</a> sera également utilisée pour les tests des gestionnaires de routes HTTP de votre serveur.

Pour exécuter les tests unitaires de jest, vous pouvez utiliser la commande `npm run test` qui va exécuter vos tests dans le terminal.

## Tests du serveur avec Jest

Les tests sont une partie importante du développement d'applications. Ils permettent de valider le bon fonctionnement de votre application et de détecter les bogues. Dans ce travail pratique, vous allez implémenter quelques tests unitaires pour votre serveur afin de valider le bon fonctionnement de celui-ci.  

On vous fournit trois fichiers de tests unitaires dans le dossier `tests` : `logs.test.js`, `partner.test.js` et `review.test.js`. Ces fichiers de tests implémentent des tests unitaires pour les différentes routes de votre serveur. Ceux-ci couvrent la plupart des cas d'utilisation de votre serveur.

## Tests de `/logs`

Les tests dans `logs.test.js` vous sont fournis à titre d'exemples pour bien comprendre le fonctionnement des outils à utiliser. Notez le remplacement de la fonction `writeLog` par un `mock` vide pour éviter de remplir le fichier de journalisation de données bidons à chaque exécution de vos tests : ceci devra être fait pour tous les tests de votre projet.

Le dernier test valide que votre middleware est bien ajouté avant le gestionnaire de d'autres requêtes HTTP dans votre serveur.

## Tests de `/partner`

Les tests dans `partner.test.js` vous sont fournis à titre d'exemple pour bien comprendre le fonctionnement des outils à utiliser. Les tests ne couvrent pas l'ensemble des requêtes traitées sur la racine `/partner`, mais vous montrent un exemple de tests avec des requêtes HTTP avec et sans corps (utilisation de la méthode `send(body)` avec un objet quelconque).

**Important**: Notez que les deux derniers tests assument l'utilisation de la méthode `POST` pour la création d'un nouveau partenaire. Si votre implémentation diffère de cette hypothèse, vous devez modifier le test pour correspondre à votre implémentation.

## Tests de `/review`

Une partie des tests dans `review.test.js` vous sont fournis à titre d'exemple, notamment les tests des requêtes `GET` vers `/api/review` et `/api/review/:id`.

Vous devez compléter la vérification et les tests des gestionnaires des autres requêtes dans votre routeur. Utilisez les autres tests fournis pour vous aider avec votre implémentation. Vous devez notamment implémenter des tests unitaires pour les cas suivants :

- La création d'une nouvelle revue.
- La modification de l'attribut `like` d'une revue existante.
- La suppression d'une revue.
- (Pour chaque cas plus haut) la gestion d'une requête invalide (mauvais id, objet incomplet, etc.)

N'oubliez pas de valider le code de retour de la réponse HTTP envoyée.

Vous pouvez ajouter d'autres tests unitaires si vous le désirez. Ceux-ci doivent être implémentés dans le fichier `review.test.js`.  **Il est a noter que seulement vos tests de la racine `/reviews` vont être évalués.**  Vous serez évalués sur la pertinence et qualité de vos tests. Tous les tests implémentés doivent passer lors de la remise, sans quoi vous serrez pénalisés sur la qualité de vos tests.

**Rappel** : vous devez utiliser les notions de `Mock`, `Stub` et `Spy` pour bien implémenter vos tests **unitaires**. Référez-vous aux tests fournis pour bien implémenter les vôtres.

## Tests fonctionnels

Contrairement aux derniers TPs, les tests fonctionnels ne couvrent pas l'entièreté des fonctionnalités de votre application. Il est donc important de valider le fonctionnement de celles-ci tout au long de votre processus de développement. Pour ce faire, vous pouvez utiliser les outils de développement de votre navigateur web pour vous aider à déboguer votre code JS (raccourci <kbd>F12</kbd>). Vous pouvez également utiliser [Postman](https://www.postman.com/) pour tester vos requêtes ou bien [ThunderClient](https://www.thunderclient.com/).