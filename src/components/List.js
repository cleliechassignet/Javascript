import { h } from 'hyperapp'

export default (props) => {
    let array=[];
    for(let i=0;i<3;i++){
        array[i]=
            h('div', {class : "container"}, [
                h('div', {class: 'boxe'}, [
                    h('div', {class: 'pourcent'},[
                        h('p', {}, props.data)
                    ])
                ]) , 
                h('div', {class: 'domain'}, [
                    h('span', {}, props.labels)
                ])  
            ]) 
    }  
    return array;
}