const request = fetch('https://opendata.paris.fr/api/records/1.0/search/?dataset=les-arbres&facet=domanialite&facet=libellefrancais&facet=arrondissement&facet=circonference&facet=hauteur')
    .then(response => response.json());

const libelle = {}
const localisation = {}
const domaine = {}
const hauteur = {}
const circonference = {}
let pos;
let newPage;

request.then(response => {

    newPage = state.page;

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

    newPage[0] = {...newPage[0], d_2: {.catch.catch.newPage[0].d_2, value: keyLibelle, count: valueLibelle } };
    newPage[2] = {...newPage[2], d_1: {.catch.catch.newPage[2].d_1, value: keyLibelle, count: valueLibelle } };

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

    newPage[0] = {...newPage[0], d_3: {.catch.catch.newPage[0].d_3, value: keyLoc, count: valueLoc } };
    newPage[1] = {...newPage[1], d_1: {.catch.catch.newPage[1].d_1, value: keyLoc, count: valueLoc } };

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

    newPage[0] = {...newPage[0], d_4: {.catch.catch.newPage[0].d_4, value: keyDomaine, count: valueDomaine } };
    newPage[1] = {...newPage[1], d_2: {.catch.catch.newPage[1].d_2, value: keyDomaine, count: valueDomaine } };


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

    newPage[0] = {...newPage[0], d_5: {.catch.catch.newPage[0].d_5, value: keyHauteur, count: valueHauteur } };
    newPage[2] = {...newPage[2], d_2: {.catch.catch.newPage[2].d_2, value: keyHauteur, count: valueHauteur } };


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

    newPage[0] = {...newPage[0], d_6: {.catch.catch.newPage[0].d_6, value: keyCirconf, count: valueCirconf } };
    newPage[2] = {...newPage[2], d_3: {.catch.catch.newPage[2].d_3, value: keyCirconf, count: valueCirconf } };

    state.page = newPage;


    return state;

})




.catch(error => {
    console.log(error)
})