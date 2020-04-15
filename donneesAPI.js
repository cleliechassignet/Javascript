const request = fetch('https://opendata.paris.fr/api/records/1.0/search/?dataset=les-arbres&facet=domanialite&facet=libellefrancais&facet=arrondissement&facet=circonference&facet=hauteur')
    .then(response => response.json());

const libelle = {}
const localisation = {}
const domaine = {}
const hauteur = {}
const circonference = {}
let pos;

request.then(response => {

        //libelle
        response.records.forEach(e => {
            if (libelle[e.fields.libellefrancais] === undefined) {
                libelle[e.fields.libellefrancais] = 1
            } else {
                libelle[e.fields.libellefrancais] = libelle[e.fields.libellefrancais] + 1
            }
        })
        let keyLibelle = Object.keys(libelle)
        let valueLibelle = Object.values(libelle)

        valueLibelle.forEach(e => {
            if (e < 1000) {
                pos = valueLibelle.indexOf(e);
                valueLibelle = valueLibelle.splice(pos, 1);
                keyLibelle = keyLibelle.splice(pos, 1);
            }
        })


        //localisation
        response.records.forEach(e => {
            if (localisation[e.fields.arrondissement] === undefined) {
                localisation[e.fields.arrondissement] = 1
            } else {
                localisation[e.fields.arrondissement] = localisation[e.fields.arrondissement] + 1
            }
        })
        let keyLoc = Object.keys(localisation)
        let valueLoc = Object.values(localisation)

        //domanialite
        response.records.forEach(e => {
            if (domaine[e.fields.domanialite] === undefined) {
                domaine[e.fields.domanialite] = 1
            } else {
                domaine[e.fields.domanialite] = domaine[e.fields.domanialite] + 1
            }
        })
        let keyDomaine = Object.keys(domaine)
        let valueDomaine = Object.values(domaine)


        //hauteur
        response.records.forEach(e => {
            if (hauteur[e.fields.hauteurenm] === undefined) {
                hauteur[e.fields.hauteurenm] = 1
            } else {
                hauteur[e.fields.hauteurenm] = hauteur[e.fields.hauteurenm] + 1
            }
        })

        let keyHauteur = Object.keys(hauteur)
        let valueHauteur = Object.values(hauteur)



        //circonférence
        response.records.forEach(e => {
            if (circonference[e.fields.circonferenceencm] === undefined) {
                circonference[e.fields.circonferenceencm] = 1
            } else {
                circonference[e.fields.circonferenceencm] = circonference[e.fields.circonferenceencm] + 1
            }
        })

        let keyCirconf = Object.keys(circonference)
        let valueCirconf = Object.values(circonference)



    })
    .catch(error => {
        console.log(error)
    })