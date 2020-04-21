import { h } from 'hyperapp'

import Button from '../components/Button'
import BarChart from '../components/BarChart'
import SideBar from '../components/SideBar'
import SmallNav from '../components/SmallNav'
import CardHeader from '../components/CardHeader'

export default (state, actions) =>
    h('div', {class: 'd-flex', id: 'wrapper'}, [
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

                SmallNav({}),

                h('div', {class: 'row h-onethird mt-2 p-2'}, [

                  h('div', {class: 'col-md-4 col-sm-6 col-xs-4 px-2'}, [
                    h('div', {class: 'card card-body', id: 'nb-arbre'}, [
                      CardHeader({title: 'Nombre d\'arbres', infos: 'Une information de malade expliquant que ce sont tous les arbres recensés à Paris'}),
                      h('h3', {}, '17636') // ici il faut appeler une info
                    ])
                  ]),

                  h('div', {class: 'col-md-8 px-2'}, [
                    h('div', {class: 'card card-body flex-row'}, [
                      CardHeader({title: 'Libellé', infos: 'On trouve à peu près 200 espèces d\'arbres à Paris'}),
                      BarChart({
                          labels: [],
                          data:  [],
                          title: 'nombre d\'espaces verts par catégories',
                          width: 400,
                          height: 200,
                          callBack: (chart) => { // je défini ici une fonction de callback qui va être appellé après la création de mon diagramme
                              actions.getEspaceVertsDataFromApi({ // je fait un appel à l'action getEspaceVertsDataFromApi qui fait un appel à une base de donnée
                                  count: 200, // je lui passe en paramètre le nombre de ligne que je veux appeler via mon api
                                  callBack: (labels, data) => { // et une autre fonction de callBack qui sera appellé seulement après que mes données aient été reçus
                                      // ce qui me permet de mettre à jour l'affichage de mon diagramme qu'à ce moment là, une fois les données reçus
                                      chart.data.labels = labels
                                      chart.data.datasets[0].data = data
                                      chart.update({duration: 800})
                                  }
                              })
                          }
                      }) // ici il faut appeler un graphe
                    ])
                  ]),
                ]),

                h('div', {class: 'row h-onethird p-2 mt-3'}, [

                  h('div', {class: 'col-md-7 px-2'}, [
                    h('div', {class: 'card card-body'}, [
                      CardHeader({title: 'Localisation', infos: 'Encore une autre information'}) // ici il faut appeler une info
                    ])
                  ]),

                  h('div', {class: 'col-md-5 px-2'}, [
                    h('div', {class: 'card card-body'}, [
                      CardHeader({title: 'Domanialité', infos: 'Relatif au domaine, donc si l\'arbre est situé sur un espace public ou privé'}) // ici il faut appeler un graphe
                    ])
                  ]),

                ]),

                h('div', {class: 'row h-onethird p-2'}, [

                  h('div', {class: 'col-md-6 px-2'}, [
                    h('div', {class: 'card card-body'}, [
                      CardHeader({title: 'Hauteur (m)', infos: 'C\'est bien les arbres'}) // ici il faut appeler une info
                    ])
                  ]),

                  h('div', {class: 'col-md-6 px-2'}, [
                  h('div', {class: 'card card-body'}, [
                    CardHeader({title: 'Circonférence (m)', infos: 'Coucou ça va ?'}) // ici il faut appeler un graphe
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

                SmallNav({}),

                  h('div', {class: 'row h-onesecond p-2 mt-3, row justify-content-center align-items-center'}, [

                  h('div', {class: 'col-md-8 px-2 py-3 mt-2'}, [
                    h('div', {class: 'card card-body'}, [
                      CardHeader({title: 'Localisation', infos: 'Voici la quantité d\'arbres que tu peux trouver par arrondissement. Est-ce que tu savais que le 1er arrondissement est celui qui contient le plus d\'arbres?'}), // ici il faut appeler une info
                      BarChart({
                          labels: [],
                          data:  [],
                          title: 'nombre d\'espaces verts par catégories',
                          width: 400,
                          height: 200,
                          callBack: (chart) => { // je défini ici une fonction de callback qui va être appellé après la création de mon diagramme
                              actions.getEspaceVertsDataFromApi({ // je fait un appel à l'action getEspaceVertsDataFromApi qui fait un appel à une base de donnée
                                  count: 200, // je lui passe en paramètre le nombre de ligne que je veux appeler via mon api
                                  callBack: (labels, data) => { // et une autre fonction de callBack qui sera appellé seulement après que mes données aient été reçus
                                      // ce qui me permet de mettre à jour l'affichage de mon diagramme qu'à ce moment là, une fois les données reçus
                                      chart.data.labels = labels
                                      chart.data.datasets[0].data = data
                                      chart.update({duration: 800})
                                  }
                              })
                          }
                      })
                    ])
                  ]),

                  h('div', {class: 'col-md-8 px-2 mt-3'}, [
                    h('div', {class: 'card card-body'}, [
                      CardHeader({title: 'Domanialité', infos: 'Mais à qui appartiennent donc tous ces arbres? Tu l\'auras compris la domanialité c\'est l\'appartenance de l\'arbre au domaine public ou privé. Et toi tu as combien d\'arbres chez toi?'}), // ici il faut appeler un graphe
                    
                      BarChart({
                          labels: [],
                          data:  [],
                          title: 'nombre d\'espaces verts par catégories',
                          width: 400,
                          height: 200,
                          callBack: (chart) => { // je défini ici une fonction de callback qui va être appellé après la création de mon diagramme
                              actions.getEspaceVertsDataFromApi({ // je fait un appel à l'action getEspaceVertsDataFromApi qui fait un appel à une base de donnée
                                  count: 200, // je lui passe en paramètre le nombre de ligne que je veux appeler via mon api
                                  callBack: (labels, data) => { // et une autre fonction de callBack qui sera appellé seulement après que mes données aient été reçus
                                      // ce qui me permet de mettre à jour l'affichage de mon diagramme qu'à ce moment là, une fois les données reçus
                                      chart.data.labels = labels
                                      chart.data.datasets[0].data = data
                                      chart.update({duration: 800})
                                  }
                              })
                          }
                      })
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

                SmallNav({}),

                  h('div', {class: 'row h-onethird p-2 mt-3, row justify-content-center align-items-center'}, [

                  h('div', {class: 'col-md-8 px-2 py-3 mt-2'}, [
                    h('div', {class: 'card card-body'}, [
                      CardHeader({title: 'Libellé', infos: 'Appelation française des arbres. (Eh oui la langue française est pleine de mots tordus). A t\'on avis, est ce que le "Fremontondendron de Californie" existe ?'}), // ici il faut appeler une info
                      BarChart({
                          labels: [],
                          data:  [],
                          title: 'nombre d\'espaces verts par catégories',
                          width: 400,
                          height: 200,
                          callBack: (chart) => { // je défini ici une fonction de callback qui va être appellé après la création de mon diagramme
                              actions.getEspaceVertsDataFromApi({ // je fait un appel à l'action getEspaceVertsDataFromApi qui fait un appel à une base de donnée
                                  count: 200, // je lui passe en paramètre le nombre de ligne que je veux appeler via mon api
                                  callBack: (labels, data) => { // et une autre fonction de callBack qui sera appellé seulement après que mes données aient été reçus
                                      // ce qui me permet de mettre à jour l'affichage de mon diagramme qu'à ce moment là, une fois les données reçus
                                      chart.data.labels = labels
                                      chart.data.datasets[0].data = data
                                      chart.update({duration: 800})
                                  }
                              })
                          }
                      })
                    ])
                  ]),

                  h('div', {class: 'col-md-8 px-2 mb-3 mt-3'}, [
                    h('div', {class: 'card card-body'}, [
                      CardHeader({title: 'Hauteur (m)', infos: 'D\' après toi quelle est la hauteur moyenne des arbres à Paris ?'}), // ici il faut appeler un graphe
                    
                      BarChart({
                          labels: [],
                          data:  [],
                          title: 'nombre d\'espaces verts par catégories',
                          width: 400,
                          height: 200,
                          callBack: (chart) => { // je défini ici une fonction de callback qui va être appellé après la création de mon diagramme
                              actions.getEspaceVertsDataFromApi({ // je fait un appel à l'action getEspaceVertsDataFromApi qui fait un appel à une base de donnée
                                  count: 200, // je lui passe en paramètre le nombre de ligne que je veux appeler via mon api
                                  callBack: (labels, data) => { // et une autre fonction de callBack qui sera appellé seulement après que mes données aient été reçus
                                      // ce qui me permet de mettre à jour l'affichage de mon diagramme qu'à ce moment là, une fois les données reçus
                                      chart.data.labels = labels
                                      chart.data.datasets[0].data = data
                                      chart.update({duration: 800})
                                  }
                              })
                          }
                      })
                    ])
                  ]),

                  h('div', {class: 'col-md-8 px-2 mt-3'}, [
                    h('div', {class: 'card card-body'}, [
                      CardHeader({title: 'Circonférence (cm)', infos: 'Il peut être intéressant de comparer la circonférence des arbres en fonction de leur hauteur'}), // ici il faut appeler un graphe
                    
                      BarChart({
                          labels: [],
                          data:  [],
                          title: 'nombre d\'espaces verts par catégories',
                          width: 400,
                          height: 200,
                          callBack: (chart) => { // je défini ici une fonction de callback qui va être appellé après la création de mon diagramme
                              actions.getEspaceVertsDataFromApi({ // je fait un appel à l'action getEspaceVertsDataFromApi qui fait un appel à une base de donnée
                                  count: 200, // je lui passe en paramètre le nombre de ligne que je veux appeler via mon api
                                  callBack: (labels, data) => { // et une autre fonction de callBack qui sera appellé seulement après que mes données aient été reçus
                                      // ce qui me permet de mettre à jour l'affichage de mon diagramme qu'à ce moment là, une fois les données reçus
                                      chart.data.labels = labels
                                      chart.data.datasets[0].data = data
                                      chart.update({duration: 800})
                                  }
                              })
                          }
                      })
                    ])
                  ]),
                ]),
            ])
            
          ])
        ])
    ])
