import { h } from 'hyperapp'

import Button from '../components/Button'
import BarChart from '../components/BarChart'
import Pie from '../components/Pie'
import Line from '../components/Line'
import SideBar from '../components/SideBar'
import SmallNav from '../components/SmallNav'
import CardHeader from '../components/CardHeader'
import List from '../components/List'
import CardHeader2 from '../components/CardHeader2'

export default (state, actions) =>
    h('div', {class: 'd-flex', id: 'wrapper', oncreate: () => {actions.getDataFromApi()}}, [
        SideBar({
          btn1Onclick: () => actions.setCount(0),
          btn2Onclick: () => actions.setCount(1),
          btn3Onclick: () => actions.setCount(2)
        }),

        h('div', {id: 'page-content-wrapper'}, [
          h('div', {class: 'container-fluid row justify-content-center align-items-center', style: "" + (state.count !== 0 ? "display: none;" : "")}, [

            h('div', {class: 'main-title'}, [
              h('p', {}, 'LES ARBRES A PARIS')
            ]),

            h('div', {class: 'main-content col-lg-8 col-md-10 col-sm-11 col-xs-10 pb-2'}, [

              SmallNav({
                btn1bOnclick: () => actions.setCount(0),
                btn2bOnclick: () => actions.setCount(1),
                btn3bOnclick: () => actions.setCount(2)
              }),

                h('div', {class: 'row h-onethird mt-2 p-2'}, [

                  h('div', {class: 'col-md-4 col-sm-6 col-xs-4 px-2'}, [
                    h('div', {class: 'card card-body', id: 'nb-arbre'}, [
                      h('div', {class: 'bigDot'},[
                        CardHeader2({title: 'Nombre d\'arbres'}),
                        h('div', {class: 'dot'},[
                          CardHeader({display:1, infos: 'Savais-tu que la ville de Paris s\'est donné en 2014 pour objectif de planter 20 000 arbres d\'ici fin 2020 ? D\'après toi, la ville réussira-t-elle son défi ?'}),
                        ]),
                      ]),
                      h('h3', {}, '17636') // ici il faut appeler une info
                    ])
                  ]),

                  h('div', {class: 'col-md-8 px-2'}, [
                    h('div', {class: 'card card-body flex-row'}, [
                      h('div', {class: 'bigDot'},[
                        CardHeader2({title: 'Libellé'}),
                        h('div', {class: 'dot'},[
                          CardHeader({infos: 'On trouve à peu près 200 espèces d\'arbres à Paris. D\'après toi, combien y en a t-il dans le monde entier ?', reponse: 'Dans le monde on compte 60 065 espèces d\'arbres'}),
                        ]),
                      ]),
                      BarChart({
                          labels: ['Arbre au 40 ecus', 'Cèdre', 'Chêne', 'Hêtre', 'Marronnier', 'Platane'],
                          data: [8, 8, 11, 12, 9, 32],
                          title: 'Type d\'arbre',
                          width: 100,
                          height: 100
                      }),
                    ])
                  ]),
                ]),
                //LIBELLE
                h('div', {class: 'col-md-8 px-2'}, [
                  h('div', {class: 'card card-body flex-row'}, [
                    CardHeader({title: 'Libellé', infos: 'On trouve à peu près 200 espèces d\'arbres à Paris. D\'après toi, combien y en a t-il dans le monde entier ?', reponse: 'Test'}),
                    BarChart({
                      callBack:(chart2) => {
                        actions.registerChart2(chart2)
                      },
                      labels: state.page.d_2.value,
                      data: state.page.d_2.count,
                      title: 'Type d\'arbre',
                      width: 100,
                      height: 100
                    }),
                  ])
                ]),
              ]),
              
              h('div', {class: 'row h-onethird p-2 mt-3'}, [
                //LOCALISATION
                h('div', {class: 'col-md-7 px-2'}, [
                  h('div', {class: 'card card-body'}, [
                    CardHeader({title: 'Localisation', infos: 'Chaque arbre est suivi par sa "carte d\'identité informatique",  elle regroupe toutes les informations nécessaires au suivi de l\'arbre par la ville.'}), // ici il faut appeler une info
                    Pie({
                      callBack:(chart3) => {
                        actions.registerChart3(chart3)
                      },
                      labels: state.page.d_3.value,
                      data: state.page.d_3.count,
                      title: 'Les arrondissements avec le plus d\'arbres',
                      width: 100,
                      height: 100
                    })
                  ])
                ]),
                //DOMANIALITE
                h('div', {class: 'col-md-5 px-2'}, [
                  h('div', {class: 'card card-body'}, [
                    CardHeader({title: 'Domanialité', infos: 'L\'arbre est-il situé sur un espace public ou privé ?'}) // ici il faut appeler un graphe
                  ])
                ]),

                h('div', {class: 'row h-onethird p-2 mt-3'}, [

                  h('div', {class: 'col-md-7 px-2'}, [
                    h('div', {class: 'card card-body'}, [
                      h('div', {class: 'bigDot'},[
                        CardHeader2({title: 'Localisation'}),
                        h('div', {class: 'dot'},[
                          CardHeader({display:1, infos: 'Chaque arbre est suivi par sa "carte d\'identité informatique",  elle regroupe toutes les informations nécessaires au suivi de l\'arbre par la ville.'})
                        ]), // ici il faut appeler une info
                      ]),
                      Pie({
                          labels: ['Paris Centre', 'Nord-Est', 'Bois de boulogne', 'Nord-Ouest', 'Sud-Ouest'],
                          data: [45, 10, 15, 25, 5],
                          title: 'Les arrondissements avec le plus d\'arbres',
                          width: 100,
                          height: 100
                      })
                    ])
                  ]),

                  h('div', {class: 'col-md-5 px-2'}, [
                    h('div', {class: 'card card-body'}, [
                      h('div', {class: 'bigDot'},[
                        CardHeader2({title: 'Domanialité'}),
                        h('div', {class: 'dot'},[
                          CardHeader({display:1, infos: 'Mais à qui appartiennent donc tous ces arbres? Tu l\'auras compris la domanialité c\'est l\'appartenance de l\'arbre au domaine public ou privé.'}), // ici il faut appeler un graphe
                        ]),
                      ]),
                      List({
                        domain: 'Cimetière'
                      })
                    ])
                  ]),

                ]),

                h('div', {class: 'row h-onethird p-2'}, [

                  h('div', {class: 'col-md-6 px-2'}, [
                    h('div', {class: 'card card-body'}, [
                      h('div', {class: 'bigDot'},[
                        CardHeader2({title: 'Hauteur (m)'}),
                        h('div', {class: 'dot'},[
                          CardHeader({display:1, infos: 'Un des plus haut arbre de la ville est un Platane d\'Orient, il mesure 30 mètres et est centenaire !'}), // ici il faut appeler une info
                        ]),
                      ]),
                      Line({
                          labels: ['4m', '7m', '10m', '13m', '16m', '19m', '22m', '25m','28m', '31m','34m', '+35m'],
                          data: [211, 256, 321, 456, 398, 364, 278, 201, 152, 144, 105, 75],
                          title: ' ',
                          width: 100,
                          height: 100
                      })
                    ])
                  ]),

                  h('div', {class: 'col-md-6 px-2'}, [
                  h('div', {class: 'card card-body'}, [
                    h('div', {class: 'bigDot'},[
                      CardHeader2({title: 'Circonférence (cm)'}),
                      h('div', {class: 'dot'},[
                        CardHeader({display:1, infos: 'L\'âge d\'un arbre peut être approximé grâce à sa circonférence ! Il suffit de prendre sa circonférence en cm et de la diviser par 2.5, n\'est-ce pas formidable ?'}), // ici il faut appeler un graphe
                      ]),
                    ]),
                    Line({
                      callBack:(chart) => {
                        actions.registerChart6(chart)
                      },
                        labels: state.page.d_6.value,
                        data: state.page.d_6.count,
                        title: ' ',
                        width: 100,
                        height: 100
                    })
                  ])
                ])
              ])
            ])
          ]),


          ////////// Page géographie //////////
          h('div', {class: 'container-fluid row justify-content-center align-items-center', style: "" + (state.count !== 1 ? "display: none;" : "")}, [

            h('div', {class: 'main-title'}, [
              h('p', {}, 'LES ARBRES A PARIS')
            ]),

            h('div', {class: 'main-content col-lg-8 col-md-10 col-sm-11 col-xs-10 pb-2'}, [

                SmallNav({
                  btn1bOnclick: () => actions.setCount(0),
                  btn2bOnclick: () => actions.setCount(1),
                  btn3bOnclick: () => actions.setCount(2)
                }),

                  h('div', {class: 'row h-onesecond p-2 mt-3, row justify-content-center align-items-center'}, [

                  h('div', {class: 'col-md-8 px-2 py-3 mt-2'}, [
                    h('div', {class: 'card card-body'}, [
                      h('div', {class: 'bigDot'},[
                        CardHeader2({title: 'Localisation'}),
                        h('div', {class: 'dot'},[
                          CardHeader({infos: 'Voici la quantité d\'arbres que tu peux trouver par arrondissement. A ton avis dans quel arrondissement trouve-t-on le plus d\'arbres ?', reponse: 'Dans le premier arrondissement !'}), // ici il faut appeler une info
                        ]),
                      ]),
                      Pie({
                          labels: ['XXe', 'XVe', 'Bois de boulogne', 'Ier', 'IIIe'],
                          data: [45, 10, 15, 25, 5],
                          title: 'Les arrondissements avec le plus d\'arbres',
                          width: 80,
                          height: 30
                      })
                    ])
                  ]),

                  h('div', {class: 'col-md-8 px-2 mt-3'}, [
                    h('div', {class: 'card card-body'}, [
                      h('div', {class: 'bigDot'},[
                        CardHeader2({title: 'Domanialité'}),
                        h('div', {class: 'dot'},[
                          CardHeader({display:1, infos: 'La domanialité est l\'appartenance de l\'arbre au domaine public ou privé. Et toi tu as combien d\'arbres chez toi?'}), // ici il faut appeler un graphe
                        ]),
                      ]),
                      List({
                        domain: 'Cimetière'
                      })
                      /*BarChart({
                          labels: [],
                          data:  [],
                          title: 'nombre d\'espaces verts par catégories',
                          width: 400,
                          height: 200,
                          callBack: (chart) => { // je défini ici une fonction de callback qui va être appellé après la création de mon diagramme
                              actions.getDataFromApi({ // je fait un appel à l'action getEspaceVertsDataFromApi qui fait un appel à une base de donnée
                                  count: 200, // je lui passe en paramètre le nombre de ligne que je veux appeler via mon api
                                  callBack: (labels, data) => { // et une autre fonction de callBack qui sera appellé seulement après que mes données aient été reçus
                                      // ce qui me permet de mettre à jour l'affichage de mon diagramme qu'à ce moment là, une fois les données reçus
                                      chart.data.labels = labels
                                      chart.data.datasets[0].data = data
                                      chart.update({duration: 800})
                                  }
                              })
                          }
                      })*/
                    ])
                  ]),
                ]),
            ])
          ]),

          ////////// Page caracteristiques //////////
          h('div', {class: 'container-fluid row justify-content-center align-items-center', style: "" + (state.count !== 2 ? "display: none;" : "")}, [

            h('div', {class: 'main-title'}, [
              h('p', {}, 'LES ARBRES A PARIS')
            ]),

            h('div', {class: 'main-content col-lg-8 col-md-10 col-sm-11 col-xs-10 pb-2'}, [

                SmallNav({
                  btn1bOnclick: () => actions.setCount(0),
                  btn2bOnclick: () => actions.setCount(1),
                  btn3bOnclick: () => actions.setCount(2)
                }),

                  h('div', {class: 'row h-onethird p-2 mt-3, row justify-content-center align-items-center'}, [

                  h('div', {class: 'col-md-8 px-2 py-3 mt-2'}, [
                    h('div', {class: 'card card-body'}, [
                      h('div', {class: 'bigDot'},[
                        CardHeader2({title: 'Libellé'}),
                          h('div', {class: 'dot'},[
                            CardHeader({infos: 'Appelation française des arbres. (Eh oui la langue française est pleine de mots tordus). A ton avis, est-ce que le "Fremontondendron de Californie" existe ?', reponse: 'Eh oui, cet arbre existe. C\'est un arbuste à fleurs jaunes originaire de Californie'}), // ici il faut appeler une info
                          ]),
                        ]),
                        BarChart({
                          labels: ['Arbre au 40 ecus', 'Cèdre', 'Chêne', 'Hêtre', 'Marronnier', 'Platane'],
                          data: [8, 8, 11, 12, 9, 32],
                          title: 'Type d\'arbre',
                          width: 100,
                          height: 100
                      })
                    ])
                  ]),

                  h('div', {class: 'col-md-8 px-2 mb-3 mt-3'}, [
                    h('div', {class: 'card card-body'}, [
                      h('div', {class: 'bigDot'},[
                        CardHeader2({title: 'Hauteur (m)'}),
                          h('div', {class: 'dot'},[
                            CardHeader({infos: 'D\' après toi quelle est la hauteur moyenne des arbres à Paris ?'}), // ici il faut appeler un graphe
                          ]),
                      ]),
                        Line({
                          labels: ['4m', '7m', '10m', '13m', '16m', '19m', '22m', '25m','28m', '31m','34m', '+35m'],
                          data: [211, 256, 321, 456, 398, 364, 278, 201, 152, 144, 105, 75],
                          title: ' ',
                          width: 100,
                          height: 100
                      })
                    ])
                  ]),

                  h('div', {class: 'col-md-8 px-2 mt-3'}, [
                    h('div', {class: 'card card-body'}, [
                      h('div', {class: 'bigDot'},[
                        CardHeader2({title: 'Circonférence (cm)'}),
                          h('div', {class: 'dot'},[
                            CardHeader({infos: 'Il peut être intéressant de comparer la circonférence des arbres en fonction de leur hauteur'}), // ici il faut appeler un graphe
                          ]),
                      ]),
                        Line({
                          labels: ['50', '100', '150', '200', '250', '300', '350', '400','450', '500','550', '600'],
                          data: [211, 256, 321, 456, 398, 364, 278, 201, 152, 144, 105, 75],
                          title: ' ',
                          width: 100,
                          height: 100
                      })
                    ])
                  ]),
                ]),
            ])

          ])
        ])
    ])
