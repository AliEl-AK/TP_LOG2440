## Cypress et tests bout en bout (`e2e`)

La bibliothèque <a href="https://www.cypress.io/">Cypress</a> est utilisée dans ce travail pratique, tout comme le TP1. Pour exécuter l'ensemble des tests, vous avez la possibilité d'utiliser `npm run test` ou `npm run test:headless`. Si vous décidez d'utiliser `npm run test`, vous devriez voir une nouvelle fenêtre apparaître.

Les tests de bout en bout vous sont fournis dans le répertoire [e2e](./site-web/cypress/e2e/) pour vous aider à compléter votre travail. Les tests fournis sont les suivants :

- [Index](./site-web/cypress/e2e/index.cy.js) : suite de tests pour la page principale du site et l'interaction avec les éléments de la page.
- [Creation](./site-web/cypress/e2e/creation.cy.js) : suite de tests pour création d'une nouvelle note à travers le formulaire dédié.
- [Interaction](./site-web/cypress/e2e/noteInteraction.cy.js) : suite de tests pour l'interaction avec les icônes de chaque note de la page principale.
- [Détails](./site-web/cypress/e2e/noteDetails.cy.js) : suite de tests pour la page de détails d'une note.
- [Système](./site-web/cypress/e2e/e2e.cy.js) : test système d'une séquence d'actions principales allant de la création d'une note jusqu'à la modification de celle-ci.

**Note** : les tests ont une certaine flexibilité. Les tests fournis ne couvrent pas 100% des requis du TP. Certains éléments seront évalués manuellement.

## Jest et tests unitaires

La bibliothèque <a href="https://jestjs.io/">Jest</a> est également utilisée dans ce travail pratique. Pour exécuter les tests unitaires de jest, vous pouvez utiliser la commande `npm run unit-test` qui va exécuter vos tests dans le terminal.

Contrairement aux tests de bout en bout qui vous sont fournis, vous êtes responsables de la complétion des tests unitaires. Vous devez tester la classe `NoteEditor` (juste la classe et non les autres fonctions du fichier) à l'aide de tests à implémenter dans le fichier [noteEditor.spec.js](./site-web/jest/noteEditor.spec.js).

**Rappel** : vous devez utiliser les notions de `Mock`, `Stub` et `Spy` pour bien implémenter vos tests **unitaires**. Vous serez évalués sur la pertinence et qualité de vos tests. Tous les tests implémentés doivent passer lors de la remise.