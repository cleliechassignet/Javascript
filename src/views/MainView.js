import { h } from 'hyperapp'

import Button from '../components/Button'
import BarChart from '../components/BarChart'
import SideBar from '../components/SideBar'
import SmallNav from '../components/SmallNav'

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
              h('p', {}, 'LES ARBRES')
            ]),

            h('div', {class: 'main-content col-lg-8 col-md-10 col-sm-11 col-xs-10 pb-2'}, [

                SmallNav({}),

                h('div', {class: 'row h-onethird mt-2 p-2'}, [

                  h('div', {class: 'col-md-4 col-sm-6 col-xs-4 px-2'}, [
                    h('div', {class: 'card card-body', id: 'nb-arbre'}, [
                      h('p', {}, 'Nombre d\'arbres'),
                      h('h3', {}, '17636') // ici il faut appeler une info
                    ])
                  ]),

                  h('div', {class: 'col-md-8 px-2'}, [
                    h('div', {class: 'card card-body flex-row'}, [
                      h('p', {}, 'Libellé'),
                      BarChart({
                          labels: ['React', 'Angular', 'Vue', 'Hyperapp', 'Omi'],
                          data: [135850, 52122, 148825, 16939, 9763],
                          title: 'exemple de BarChart',
                          width: 500,
                          height: 200
                      }) // ici il faut appeler un graphe
                    ])
                  ]),
                ]),

                h('div', {class: 'row h-onethird p-2 mt-3'}, [

                  h('div', {class: 'col-md-7 px-2'}, [
                    h('div', {class: 'card card-body'}, [
                      h('p', {}, 'Localisation') // ici il faut appeler une info
                    ])
                  ]),

                  h('div', {class: 'col-md-5 px-2'}, [
                    h('div', {class: 'card card-body'}, [
                      h('p', {}, 'Domanialité') // ici il faut appeler un graphe
                    ])
                  ]),

                ]),


                h('div', {class: 'row h-onethird p-2'}, [

                  h('div', {class: 'col-md-6 px-2'}, [
                    h('div', {class: 'card card-body'}, [
                      h('p', {}, 'Hauteur (m)') // ici il faut appeler une info
                    ])
                  ]),

                  h('div', {class: 'col-md-6 px-2'}, [
                  h('div', {class: 'card card-body'}, [
                    h('p', {}, 'Circonférence (m)') // ici il faut appeler un graphe
                  ])
                ])

              ])
            ])

          ]),
          h('div', {class: 'container-fluid row justify-content-center align-items-center', style: "" + (state.count !== 1 ? "display: none;" : "")}, [

            h('div', {class: 'main-title'}, [
              h('p', {}, 'Geographie')
            ]),
          ]),
          h('div', {class: 'container-fluid row justify-content-center align-items-center', style: "" + (state.count !== 2 ? "display: none;" : "")}, [

            h('div', {class: 'main-title'}, [
              h('p', {}, 'Caracteristiques')  
            ]),
          ])
        ])
    ])
