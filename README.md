# Énoncé

Vous devrez réaliser une application de gestion de bookmarks.

Celle-ci devra supporter deux types de liens :

-   vidéo Vimeo (ex: https://vimeo.com/565486457)
-   photo Flickr (ex: https://www.flickr.com/photos/feuilllu/45771361701/)
    L’utilisateur aura une vue principale contenant un formulaire d'ajout et une
    liste des bookmarks.

Le formulaire d'ajout comporte un champ de saisie pour l'url du lien et un
bouton de soumission. Lors de la soumission du lien, un appel à l'API
https://noembed.com/ sera effectué pour obtenir les informations de la vidéo ou
de la photo.

## Les informations suivantes seront affichées pour un lien Vimeo :

-   Aperçu vidéo (si disponible)
-   URL
-   Titre de la vidéo
-   Auteur
-   Date d'ajout dans l'application (il y a une heure, il y a 2 minutes...)
-   Date de publication sur Vimeo (le 3 novembre 2020)
-   Durée (hh:mm:ss)

## Les informations suivantes seront affichées pour un lien Flickr :

-   Aperçu photo
-   URL
-   Titre de la photo
-   Auteur
-   Date d'ajout dans l'application (il y a une heure, il y a 2 minutes...)
-   Date de publication sur Flickr (le 3 novembre 2020)
-   Largeur x Hauteur

Un bouton de suppression sera également présent pour chaque lien.

L'application doit être réalisée avec React et les Hooks
(https://fr.reactjs.org/docs/hooks-reference.html). L'utilisation de Typescript
est également un pré-requis.

Seul React est autorisé comme librairie tierce (donc pas de redux, axios,
moment...).

Nous testerons l'application sur la dernière version de Chrome ou Firefox.

Pour bootstrap l'application, voici quelques outils :

Vite : https://vitejs.dev/guide/#scaffolding-your-first-vite-project Parcel :
https://parceljs.org/getting-started/webapp/ create-react-app :
https://create-react-app.dev/docs/adding-typescript/ Il n’est pas demandé de
s’attarder sur l’aspect graphique de l’application ou sur la persistance des
bookmarks.
