import { h } from 'hyperapp'

// basic componant with props
export default (props) =>
    h('div', { class: 'small' }, [
      h('p', {class: 'small-main-title'}, 'LES ARBRES'),
      h('nav', { class: 'small-navbar'}, [
        h('a', {href: '#', class: 'small-navbar-selected list-group-item list-group-item-action', onclick: props.btn1bOnclick}, 'Général'),
        h('a', {href: '#', class: 'list-group-item list-group-item-action', onclick: props.btn2bOnclick}, 'Géographique'),
        h('a', {href: '#', class: 'list-group-item list-group-item-action', onclick: props.btn3bOnclick}, 'Caractéristiques')
      ])
    ])
