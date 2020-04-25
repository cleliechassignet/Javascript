import { h } from 'hyperapp'

export default (props) => {
    let array=[];
    for(let i=0;i<3;i++){
        array[i]=
            h('div', {class : "container"}, [
                h('div', {class: 'boxe'}, [
                    h('div', {class: 'pourcent'},[
                        h('p', {}, '70 %')
                    ])
                ]) , 
                h('div', {class: 'domain'}, [
                    h('span', {}, props.domain)
                ])  
            ]) 
    }  
    return array;
}