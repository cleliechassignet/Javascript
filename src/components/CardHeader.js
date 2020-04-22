import { h } from 'hyperapp'

// Titre d'une card avec l'icône d'information et la div correspondante
export default (props) =>
    h('p', {}, [props.title, h('img', {src: 'src/img/information.svg', class:'svg'}, ''), h('div', {class: 'info'}, [h('p', {}, props.infos)])])
