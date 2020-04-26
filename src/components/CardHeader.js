import { h } from 'hyperapp'

// Titre d'une card avec l'icône d'information et la div correspondante
export default (props) => {
    const arrayButton=[];
    let displayButton = props.display;
    arrayButton[0]= h('p', {}, ['', h('img', {src: './img/information.svg', class:'svg'}, ''), h('div', {class: 'info'}, [h('p', {}, props.infos)])])
    arrayButton[1]= h('p', {}, ['',h('img', {src: './img/R.png', class:'png'}, ''), h('div', {class: 'reponse'}, [h('p', {}, props.reponse)])])
    if (displayButton == 1){
        return arrayButton[0];
    }
    else{
        return arrayButton;
    }
}
