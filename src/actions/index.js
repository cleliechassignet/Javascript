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

    registerChart2: chart => state => {
        return {...state, chart2: chart }
    },
    registerChart3: chart => state => {
        console.log("test")
        return {...state, chart3: chart }
    },
    registerChart4: chart => state => {
        return {...state, chart4: chart }
    },
    registerChart5: chart => state => {
        return {...state, chart5: chart }
    },
    registerChart6: chart => state => {
        return {...state, chart6: chart }
    },

    getIpFromApi: () => (state, actions) => {
        const request = axios.get('https://api.ipify.org?format=json')

        request.then(response => {
                return actions.setIp(response.data.ip)
            })
            .catch(error => { console.log(error) })
    },

    getDataFromApi: () => (state, actions) => {
        console.log("get data from api")
        const request = fetch('https://opendata.paris.fr/api/records/1.0/search/?dataset=les-arbres&rows=10000&facet=domanialite&facet=libellefrancais&facet=arrondissement&facet=circonference&facet=hauteur')
            .then(response => response.json());

        request
            .then(response => {
                // je calcul mon nouveau state via l'action parseData qui soccupe de faire mon tri sur les données reçues
                const newState = actions.parseData(response.records);
                return newState // enfin je retourne le state car c'est le but de toute action (retrouver le nouveau state)
            })
            .catch(error => { console.log(error) })
    },

    parseData: list => state => {
        console.log("parse data")

        const libelle = {}
        const localisation = {}
        const domaine = {}
        const hauteur = {}
        const circonference = {}
        let pos;
        let newPage;

        newPage = state.page;

        console.log(list)

        //libelle
        list.forEach(e => {
            if (libelle[e.fields.libellefrancais] === undefined) {
                libelle[e.fields.libellefrancais] = 1
            } else {
                libelle[e.fields.libellefrancais] = libelle[e.fields.libellefrancais] + 1
            }
        })
        let keyLibelle = Object.keys(libelle)
        let valueLibelle = Object.values(libelle)
        let newKeyLibelle = [];
        let newValueLibelle = [];

        valueLibelle.forEach(e => {
            if (e > 100) {
                pos = valueLibelle.indexOf(e);
                newValueLibelle.push(valueLibelle[pos]);
                newKeyLibelle.push(keyLibelle[pos]);
            }
        })
        newPage = {...newPage, d_2: {...newPage.d_2, value: newKeyLibelle, count: newValueLibelle } };

        //localisation
        list.forEach(e => {
            if (localisation[e.fields.arrondissement] === undefined) {
                localisation[e.fields.arrondissement] = 1
            } else {
                localisation[e.fields.arrondissement] = localisation[e.fields.arrondissement] + 1
            }
        })
        let keyLoc = Object.keys(localisation)
        let valueLoc = Object.values(localisation)

        newPage = {...newPage, d_3: {...newPage.d_3, value: keyLoc, count: valueLoc } };

        //domanialite
        list.forEach(e => {
            if (domaine[e.fields.domanialite] === undefined) {
                domaine[e.fields.domanialite] = 1
            } else {
                domaine[e.fields.domanialite] = domaine[e.fields.domanialite] + 1
            }
        })
        let keyDomaine = Object.keys(domaine)
        let valueDomaine = Object.values(domaine)

        newPage = {...newPage, d_4: {...newPage.d_4, value: keyDomaine, count: valueDomaine } };


        //hauteur
        list.forEach(e => {
            if (hauteur[e.fields.hauteurenm] === undefined) {
                hauteur[e.fields.hauteurenm] = 1
            } else {
                hauteur[e.fields.hauteurenm] = hauteur[e.fields.hauteurenm] + 1
            }
        })

        let keyHauteur = Object.keys(hauteur)
        let valueHauteur = Object.values(hauteur)

        let newKeyHauteur = [0, 2, 4, 6, 8, 10, 15, 20, 40, 70, 100, 150]
        let newValueHauteur = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

        keyHauteur.forEach(e => {
            pos = keyHauteur.indexOf(e)
            if (e <= 1) {
                newValueHauteur[0] += valueHauteur[pos]
            } else if (e <= 3) {
                newValueHauteur[1] += valueHauteur[pos]
            } else if (e <= 5) {
                newValueHauteur[2] += valueHauteur[pos]
            } else if (e <= 7) {
                newValueHauteur[3] += valueHauteur[pos]
            } else if (e <= 9) {
                newValueHauteur[4] += valueHauteur[pos]
            } else if (e <= 12) {
                newValueHauteur[5] += valueHauteur[pos]
            } else if (e <= 17) {
                newValueHauteur[6] += valueHauteur[pos]
            } else if (e <= 30) {
                newValueHauteur[7] += valueHauteur[pos]
            } else if (e <= 55) {
                newValueHauteur[8] += valueHauteur[pos]
            } else if (e <= 85) {
                newValueHauteur[9] += valueHauteur[pos]
            } else if (e <= 125) {
                newValueHauteur[10] += valueHauteur[pos]
            } else {
                newValueHauteur[13] += valueHauteur[pos]
            }
        })


        newPage = {...newPage, d_5: {...newPage.d_5, value: newKeyHauteur, count: newValueHauteur } };


        //circonférence
        list.forEach(e => {
            if (circonference[e.fields.circonferenceencm] === undefined) {
                circonference[e.fields.circonferenceencm] = 1
            } else {
                circonference[e.fields.circonferenceencm] = circonference[e.fields.circonferenceencm] + 1
            }
        })

        let keyCirconf = Object.keys(circonference)
        let valueCirconf = Object.values(circonference)


        newPage = {...newPage, d_6: {...newPage.d_6, value: keyCirconf, count: valueCirconf } };

        console.log(newPage)
        console.log("pré set")

        state.chart2.data.labels = newPage.d_2.value;
        state.chart2.data.datasets[0].data = newPage.d_2.count;
        state.chart3.data.labels = newPage.d_3.value;
        state.chart3.data.datasets[0].data = newPage.d_3.count;
        // state.chart4.data.labels = newPage.d_4.value;
        // state.chart4.data.datasets[0].data = newPage.d_4.count;
        state.chart5.data.labels = newPage.d_5.value;
        state.chart5.data.datasets[0].data = newPage.d_5.count;
        state.chart6.data.labels = newPage.d_6.value;
        state.chart6.data.datasets[0].data = newPage.d_6.count;

        state.chart2.update({ duration: 800 })
        state.chart3.update({ duration: 800 })
            // state.chart4.update({duration: 800})
        state.chart5.update({ duration: 800 })
        state.chart6.update({ duration: 800 })

        console.log(chart)

        return {...state, page: newPage };
    }
}