import { h } from 'hyperapp'

export default (props) => {
    let array=[];
    console.log("props ");
    console.log(props);
    for(let i=0;i<props.data.length;i++){
        array[i]=
            h('div', {class : "container"}, [
                h('div', {class: 'boxe'}, [
                    h('div', {class: 'pourcent'},[
                        h('p', {}, props.data[i])
                    ])
                ]) , 
                h('div', {class: 'domain'}, [
                    h('span', {}, props.labels[i])
                ])  
            ]) 
    }  
    return array;
}

// Ecriture IES6 non fonctionnelle

/*
import { h } from 'hyperapp'

export default (props) => h('div', {},
    props.data.map( (el, index) => {
        h('div', {class : "container"}, [
            h('div', {class: 'boxe'}, [
                h('div', {class: 'pourcent'},[
                    h('p', {}, el)
                ])
            ]) , 
            h('div', {class: 'domain'}, [
                h('span', {}, props.labels[index])
            ])  
        ]) 
    }))
*/