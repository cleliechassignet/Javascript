import { h } from 'hyperapp'
// import Plotly from 'plotly.js-dist'
import Chart from 'chart.js'

// basic componant with props
export default (props) =>
h('div', {}, [
    h('canvas', {
        oncreate: (element) => {
            const ctx = element.getContext('2d')
            const c = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: props.labels,
                    datasets: [{
                        label: props.title || 'default title',
                        data: props.data,
                        backgroundColor: ['rgb(121,190,153)', 'rgb(207,241,162)', 'rgb(169,218,168)', 'rgb(60,135,132)', 'rgb(121,190,153)', 'rgb(207,241,162)', 'rgb(169,218,168)', 'rgb(60,135,132)', 'rgb(121,190,153)', 'rgb(207,241,162)', 'rgb(169,218,168)', 'rgb(60,135,132)', 'rgb(121,190,153)', 'rgb(207,241,162)', 'rgb(169,218,168)', 'rgb(60,135,132)'],
                        lineTension: 0.5,
                        fill: false,
                        pointRadius: 5,
                        pointBorderColor: 'rgba(0, 0, 0, 0)',
                        maintainAspectRatio: true,
                    }]
                },
                options:{
                    legend:{
                        display:false
                    }
                }
            })
            c.canvas.style.height = props.height + '%'
            c.canvas.style.width = props.width + '%'
            c.options.title.display = "none"
                // si une fonction de callback est passé en parametre de mes props alors je l'exécute
            if (props.callBack !== undefined) { props.callBack(c) }
        },
        style: 'background-color: #F5F5F5;'
    })
])
