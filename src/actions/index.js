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
    registerChart5: chart => state => {
        return {...state, chart5: chart }
    },
    registerChart6: chart => state => {
        return {...state, chart6: chart }
    },
    registerChart7: chart => state => {
        return {...state, chart7: chart }
    },
    registerChart9: chart => state => {
        return {...state, chart9: chart }
    },
    registerChart10: chart => state => {
        return {...state, chart10: chart }
    },
    registerChart11: chart => state => {
        return {...state, chart11: chart }
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
        let moyenneHauteur = 0
        const circonference = {}
        let pos;
        let newPage;

        newPage = state.page;


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
            if (e > 400) {
                pos = valueLibelle.indexOf(e);
                newValueLibelle.push(valueLibelle[pos]);
                newKeyLibelle.push(keyLibelle[pos]);
            }
        })
        newPage[0] = {...newPage[0], d_2: {...newPage[0].d_2, value: newKeyLibelle, count: newValueLibelle } };
        newPage[1] = {...newPage[1], d_9: {...newPage[1].d_9, value: newKeyLibelle, count: newValueLibelle } };

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

        let newKeyLoc = ["Centre", 'Paris Est', "Paris Ouest", "Paris Sud", "Paris Nord", "Hauts-de-Seine", "Seine-Saint-Denis", "Bois de Vincennes", "Bois de Boulogne", "Val de Marne"]
        let newValueLoc = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

        keyLoc.forEach(e => {
            pos = keyLoc.indexOf(e)
            if (e === "PARIS 1ER ARRDT" || e === "PARIS 2E ARRDT" || e === "PARIS 3E ARRDT" || e === "PARIS 4E ARRDT" || e === "PARIS 5E ARRDT" || e === "PARIS 6E ARRDT") {
                newValueLoc[0] += valueLoc[pos]
            } else if (e === "PARIS 11E ARRDT" || e === "PARIS 20E ARRDT" || e === "PARIS 12E ARRDT") {
                newValueLoc[1] += valueLoc[pos]
            } else if (e === "PARIS 7E ARRDT" || e === "PARIS 8E ARRDT" || e === "PARIS 16E ARRDT") {
                newValueLoc[2] += valueLoc[pos]
            } else if (e === "PARIS 13E ARRDT" || e === "PARIS 14E ARRDT" || e === "PARIS 15E ARRDT") {
                newValueLoc[3] += valueLoc[pos]
            } else if (e === "PARIS 17E ARRDT" || e === "PARIS 18E ARRDT" || e === "PARIS 19E ARRDT" || e === "PARIS 9E ARRDT" || e === "PARIS 10E ARRDT") {
                newValueLoc[4] += valueLoc[pos]
            } else if (e === "HAUTS-DE-SEINE") {
                newValueLoc[5] += valueLoc[pos]
            } else if (e === "SEINE-SAINT-DENIS") {
                newValueLoc[6] += valueLoc[pos]
            } else if (e === "BOIS DE VINCENNES") {
                newValueLoc[7] += valueLoc[pos]
            } else if (e === "BOIS DE BOULOGNE") {
                newValueLoc[8] += valueLoc[pos]
            } else {
                newValueLoc[9] += valueLoc[pos]
            }

        })


        newPage[0] = {...newPage[0], d_3: {...newPage[0].d_3, value: newKeyLoc, count: newValueLoc } }
        newPage[1] = {...newPage[1], d_7: {...newPage[1].d_7, value: newKeyLoc, count: newValueLoc } }


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

        let newKeyDom = ["Alignement", "Cimetière", "Jardin", "Etablissements administratifs et scolaires"]
        let newValueDom = [0, 0, 0, 0]

        newPage[0] = {...newPage[0], d_4: {...newPage[0].d_4, value: newKeyDom, count: newValueDom } }
        newPage[1] = {...newPage[1], d_8: {...newPage[1].d_8, value: newKeyDom, count: newValueDom } }

        keyDomaine.forEach(e => {
            pos = keyDomaine.indexOf(e)
            if (e === "Alignement") {
                newValueDom[0] += valueDomaine[pos]
            } else if (e === "CIMETIERE") {
                newValueDom[1] += valueDomaine[pos]
            } else if (e === "Jardin") {
                newValueDom[2] += valueDomaine[pos]
            } else if (e === "DASCO" || e === "DFPE" || e==="DJS") {
                newValueDom[3] += valueDomaine[pos]
            }
        })

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
                newValueHauteur[11] += valueHauteur[pos]
            }
        })
        
        for(let i=0;i<newValueHauteur.length;i++){
            moyenneHauteur += newValueHauteur[i]*newKeyHauteur[i];
        }

        moyenneHauteur = moyenneHauteur / 10000
        console.log("MoyenneHauteur : " + moyenneHauteur)


        newPage[0] = {...newPage[0], d_5: {...newPage[0].d_5, value: newKeyHauteur, count: newValueHauteur, moyenne: moyenneHauteur } };
        newPage[2] = {...newPage[2], d_10: {...newPage[2].d_10, value: newKeyHauteur, count: newValueHauteur, moyenne: moyenneHauteur } };


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


        let newKeyCirconf = [0, 20, 50, 100, 150, 200, 250, 300]
        let newValueCirconf = [0, 0, 0, 0, 0, 0, 0, 0]

        keyCirconf.forEach(e => {
            pos = keyCirconf.indexOf(e)
            if (e <= 10) {
                newValueCirconf[0] += valueCirconf[pos]
            } else if (e <= 35) {
                newValueCirconf[1] += valueCirconf[pos]
            } else if (e <= 75) {
                newValueCirconf[2] += valueCirconf[pos]
            } else if (e <= 125) {
                newValueCirconf[3] += valueCirconf[pos]
            } else if (e <= 175) {
                newValueCirconf[4] += valueCirconf[pos]
            } else if (e <= 225) {
                newValueCirconf[5] += valueCirconf[pos]
            } else if (e <= 275) {
                newValueCirconf[6] += valueCirconf[pos]
            } else {
                newValueCirconf[7] += valueCirconf[pos]
            }


        })


        newPage[0] = {...newPage[0], d_6: {...newPage[0].d_6, value: newKeyCirconf, count: newValueCirconf } };
        newPage[2] = {...newPage[2], d_11: {...newPage[2].d_11, value: newKeyCirconf, count: newValueCirconf } };



        console.log("pré set")

        state.chart2.data.labels = newPage[0].d_2.value;
        state.chart2.data.datasets[0].data = newPage[0].d_2.count;
        state.chart3.data.labels = newPage[0].d_3.value;
        state.chart3.data.datasets[0].data = newPage[0].d_3.count;
        state.chart5.data.labels = newPage[0].d_5.value;
        state.chart5.data.datasets[0].data = newPage[0].d_5.count;
        state.chart6.data.labels = newPage[0].d_6.value;
        state.chart6.data.datasets[0].data = newPage[0].d_6.count;
        state.chart7.data.labels = newPage[1].d_7.value;
        state.chart7.data.datasets[0].data = newPage[1].d_7.count;
        state.chart9.data.labels = newPage[1].d_9.value;
        state.chart9.data.datasets[0].data = newPage[1].d_9.count;
        state.chart10.data.labels = newPage[2].d_10.value;
        state.chart10.data.datasets[0].data = newPage[2].d_10.count;
        state.chart11.data.labels = newPage[2].d_11.value;
        state.chart11.data.datasets[0].data = newPage[2].d_11.count;

        state.chart2.update({ duration: 800 })
        state.chart3.update({ duration: 800 })
        state.chart5.update({ duration: 800 })
        state.chart6.update({ duration: 800 })
        state.chart7.update({ duration: 800 })
        state.chart9.update({ duration: 800 })
        state.chart10.update({ duration: 800 })
        state.chart11.update({ duration: 800 })


        return {...state, page: newPage };
    }
}