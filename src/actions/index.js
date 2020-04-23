import axios from 'axios'


export default {
    increment: () => state => {
        console.log(state)
        return {...state, count: state.count + 1 } // on retourne le nouveau state avec notre compteur mis à jour
    },
    decrement: () => state => {
        console.log(state)
        return {...state, count: state.count - 1 }
    },

    setCount: myCount => state => {
        console.log(state)
        return {...state, count: myCount }
    },

    setIp: ip => state => {
        return {...state, ip: ip } // on retourne le nouveau state en modifiant l'adresse ip dans notre state
    },

    getIpFromApi: () => (state, actions) => {
        const request = axios.get('https://api.ipify.org?format=json')

        request.then(response => {
                return actions.setIp(response.data.ip)
            })
            .catch(error => { console.log(error) })
    },

    getDataFromApi: async(count) => (state, actions) => {
        const request = fetch('https://opendata.paris.fr/api/records/1.0/search/?dataset=les-arbres&rows=205245&facet=domanialite&facet=libellefrancais&facet=arrondissement&facet=circonference&facet=hauteur')
            .then(response => response.json());

        request
            .then(response => {
                // je calcul mon nouveau state via l'action parseData qui soccupe de faire mon tri sur les données reçues
                const newState = actions.parseData(response.records);
                // une fois le state calculé, j'appelle ma fonction de callback avec mes nouvelles données
                if (callBack !== undefined) { callBack(newState.page) }
                return newState // enfin je retourne le state car c'est le but de toute action (retrouver le nouveau state)
            })
            .catch(error => { console.log(error) })
    },



    parseData: list => state => {
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

        newPage[0] = {...newPage[0], d_2: {...newPage[0].d_2, value: keyLibelle, count: valueLibelle } };
        newPage[2] = {...newPage[2], d_1: {...newPage[2].d_1, value: keyLibelle, count: valueLibelle } };

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

        newPage[0] = {...newPage[0], d_3: {...newPage[0].d_3, value: keyLoc, count: valueLoc } };
        newPage[1] = {...newPage[1], d_1: {...newPage[1].d_1, value: keyLoc, count: valueLoc } };

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

        newPage[0] = {...newPage[0], d_4: {...newPage[0].d_4, value: keyDomaine, count: valueDomaine } };
        newPage[1] = {...newPage[1], d_2: {...newPage[1].d_2, value: keyDomaine, count: valueDomaine } };


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

        newPage[0] = {...newPage[0], d_5: {...newPage[0].d_5, value: keyHauteur, count: valueHauteur } };
        newPage[2] = {...newPage[2], d_2: {...newPage[2].d_2, value: keyHauteur, count: valueHauteur } };


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

        newPage[0] = {...newPage[0], d_6: {...newPage[0].d_6, value: keyCirconf, count: valueCirconf } };
        newPage[2] = {...newPage[2], d_3: {...newPage[2].d_3, value: keyCirconf, count: valueCirconf } };

        //FIN
        state.page = newPage;

        return state;
    }
}