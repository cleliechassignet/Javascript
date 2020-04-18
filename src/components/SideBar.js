import { h } from 'hyperapp'

// basic componant with props
export default (props) =>
    h('div', { id: 'sidebar-wrapper' }, [
      h('div', { class: 'list-group list-group-flush'}, [
        h('a', {href: '#', class: 'selected list-group-item list-group-item-action', onclick: props.btn1Onclick}, 'Général'),
        h('a', {href: '#', class: 'selected list-group-item list-group-item-action', onclick: props.btn2Onclick}, 'Géographique'),
        h('a', {href: '#', class: 'selected list-group-item list-group-item-action', onclick: props.btn3Onclick}, 'Caractéristiques')
      ])
    ])
