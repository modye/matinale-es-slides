# es-in-depth
Slides du talk ElasticSearch en profondeur

# Build with docker
Afin de builder l'image Docker permettant d'exécuter les slides via reveal.js : 
A la racine du projet : docker build -t slides-es-in-depth .

# Run with docker
Crée un conteneur avec identifiant 'slides', montage des dossiers de sources et d'images pour faire du hot reload, binding du port 3000
docker run -p 3000:3000 --name slides -v /home/maxime/Documents/talks/es_in_depth/es-in-depth/src/:/usr/src/app/src -v /home/maxime/Documents/talks/es_in_depth/es-in-depth/images/:/usr/src/app/images -d slides-es-in-depth

# Access to app
localhost:3000
