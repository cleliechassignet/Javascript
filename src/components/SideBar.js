import { h } from 'hyperapp'

// basic componant with props
export default (props) =>
    h('div', { id: 'sidebar-wrapper' }, [
      h('div', { class: 'list-group list-group-flush'}, [
        h('a', {href: '#', class: 'selected list-group-item list-group-item-action'}, 'Général'),
        h('a', {href: 'geographic.html', class: 'selected list-group-item list-group-item-action'}, 'Géographique'),
        h('a', {href: '#', class: 'selected list-group-item list-group-item-action'}, 'Caractéristiques')
      ])
    ])
