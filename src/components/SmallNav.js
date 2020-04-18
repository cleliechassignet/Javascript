import { h } from 'hyperapp'

// basic componant with props
export default (props) =>
    h('div', { class: 'small' }, [
      h('p', {class: 'small-main-title'}, 'LES ARBRES'),
      h('nav', { class: 'small-navbar'}, [
        h('a', {href: '#', class: 'small-navbar-selected list-group-item list-group-item-action'}, 'Général'),
        h('a', {href: '#', class: 'list-group-item list-group-item-action'}, 'Géographique'),
        h('a', {href: '#', class: 'list-group-item list-group-item-action'}, 'Caractéristiques')
      ])
    ])
