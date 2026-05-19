TOURISME SN

Plateforme web de planification touristique au Sénégal exploration de destinations, création d'itinéraires personnalisés et gestion de compte utilisateur.

== Apercu du projet ==

TourismeSN est une application full-stack permettant aux voyageurs de découvrir les destinations du Sénégal, de créer et gérer leurs itinéraires de voyage, et aux administrateurs de gérer le contenu de la plateforme.
Fonctionnalités principales

Authentification JWT: Register, Login, Refresh token automatique
Destinations: Catalogue avec filtres par région, catégorie et budget
Itinéraires: Création et gestion d'itinéraires personnalisés avec étapes par jour
Profil utilisateur: Modification des informations personnelles
Dashboard Admin: Gestion des utilisateurs et des destinations
Dark mode: Interface entièrement en mode sombre


== Stack technique ==

Backend: Spring Boot Framework - principal Spring Security - Authentification et autorisationJWT Tokens d'accès et de rafraîchissement
Database: PostgreSQL avec Spring Data JPAORM et accès base de données de données relationnelle
Lombok Réduction du code boilerplate

Frontend: React + TailwindCSS Router v6
Navigation: client-side
Requêtes HTTP avec interceptors JWT: Axios
Icônes: HeroIcons

== Déploiement ==

Railway => Backend Spring Boot + PostgreSQL (https://final-wd-production.up.railway.app)

Vercel => Frontend React (https://final-wd.vercel.app)

Admin Account => {
"email": "tidianecs20@gmail.com",
"password": "password"
}
==================================
Tourism Account => {
"email": "test@gmail.com",
"password": "password"
}
