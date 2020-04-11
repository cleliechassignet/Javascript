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
        response.data.records.forEach(e => {
            if (libelle[e.fields.libellefrancais] === undefined) {
                libelle[e.fields.libellefrancais] = 1
            } else {
                libelle[e.fields.libellefrancais] = libelle[e.fields.libellefrancais] + 1
            }
        })
        let keyLibelle = console.log(Object.keys(libelle))
        let valueLibelle = console.log(Object.values(libelle))

        valueLibelle.forEach(e => {
            if (e < 1000) {
                pos = valueLibelle.indexOf(e);
                valueLibelle = valueLibelle.splice(pos, 1);
                keyLibelle = keyLibelle.splice(pos, 1);
            }
        })


        //localisation
        response.data.records.forEach(e => {
            if (localisation[e.fields.arrondissement] === undefined) {
                localisation[e.fields.arrondissement] = 1
            } else {
                localisation[e.fields.arrondissement] = localisation[e.fields.arrondissement] + 1
            }
        })
        let keyLoc = console.log(Object.keys(localisation))
        let valueLoc = console.log(Object.values(localisation))

        //domanialite
        response.data.records.forEach(e => {
            if (domaine[e.fields.domanialite] === undefined) {
                domaine[e.fields.domanialite] = 1
            } else {
                domaine[e.fields.domanialite] = domaine[e.fields.domanialite] + 1
            }
        })
        let keyDomaine = console.log(Object.keys(domaine))
        let valueDomaine = console.log(Object.values(domaine))


        //hauteur
        response.data.records.forEach(e => {
            if (hauteur[e.fields.hauteurenm] === undefined) {
                hauteur[e.fields.hauteurenm] = 1
            } else {
                hauteur[e.fields.hauteurenm] = hauteur[e.fields.hauteurenm] + 1
            }
        })

        //TRIER LES OBJET PAR HAUTEUR CROISSANTE

        let keyHauteur = console.log(Object.keys(hauteur))
        let valueHauteur = console.log(Object.values(hauteur))



        //circonférence
        response.data.records.forEach(e => {
            if (circonference[e.fields.circonferenceencm] === undefined) {
                circonference[e.fields.circonferenceencm] = 1
            } else {
                circonference[e.fields.circonferenceencm] = circonference[e.fields.circonferenceencm] + 1
            }
        })

        //TRIER LES OBJET PAR HAUTEUR CROISSANTE

        let keyCirconf = console.log(Object.keys(circonference))
        let valueCirconf = console.log(Object.values(circonference))



    })
    .catch(error => {
        console.log(error)
    })