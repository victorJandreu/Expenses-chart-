import file from "./data.json" with { type: "json" };

const dataFromJson = file.map(x => x.amount)


const ctx = document.getElementById('myChart').getContext("2d")

let gradient = ctx.createLinearGradient(0, 0, 0, 400)
gradient.addColorStop(0, "hsla(186, 34%, 60%, 1)")
gradient.addColorStop(1, "hsla(249, 98%, 49%, 1)")

let gradient2 = ctx.createLinearGradient(0, 0, 0, 400)
gradient2.addColorStop(0, "hsla(10, 79%, 65%, 1)")
gradient2.addColorStop(1, "hsla(0, 100%, 49%, 1)")


let hoverGradient = ctx.createLinearGradient(0, 0, 0, 400)
hoverGradient.addColorStop(0, "hsla(186, 34%, 60%, 0.8)")
hoverGradient.addColorStop(1, "hsla(249, 98%, 49%, 0.8)")

let hoverGradient2 = ctx.createLinearGradient(0, 0, 0, 400)
hoverGradient2.addColorStop(0, "hsla(10, 79%, 65%, 0.8)")
hoverGradient2.addColorStop(1, "hsla(0, 100%, 49%, 0.8)")


// poner color a la barra dependiendo del día

let backgroundColorArray = []
let hoverBackgroundColorArray = []
const actualDay = new Date().getDay();

const labels= file.map(x => x.day)
const dayRelateWithLabels = [1, 2, 3, 4, 5, 6, 0] // 1 = lunes, 2 = martes, 3 = miercoles...

for(let i = 0; i < dayRelateWithLabels.length; i++) {
  if(dayRelateWithLabels[i] === actualDay){
    backgroundColorArray.push(gradient)
    hoverBackgroundColorArray.push(hoverGradient)
  } else {
    backgroundColorArray.push(gradient2)
    hoverBackgroundColorArray.push(hoverGradient2)
  }
}

// termina de poner color a la barra dependiendo del día



let delayed;

new Chart(ctx, {
  type: 'bar',
  data: {
    labels,
    datasets: [{
      data: dataFromJson,
      borderWidth: 1,
      backgroundColor: backgroundColorArray,
      hoverBackgroundColor: hoverBackgroundColorArray,
      borderSkipped: false,
      label: '$',
      
    },
  
  
],

  },
  
  options: {
 
    onHover: (event, chartElement) => {
      event.native.target.style.cursor = chartElement[0] ? 'pointer' : 'default';
  },
 
    animation: {
      onComplete: () => {
        delayed = true;
      },
      delay: (context) => {
        let delay = 0;
        if (context.type === 'data' && context.mode === 'default' && !delayed) {
          delay = context.dataIndex * 600 + context.datasetIndex * 100;
        }
        return delay;
      },},
    
    plugins: { 
      tooltip: { 
          enabled: true, 
          backgroundColor: "hsl(25, 47%, 15%)", 
          bodyColor: "white", 
          padding: 10, 
          cornerRadius: 10, 
          borderColor: "hsl(25, 47%, 15%)", 
          borderWidth: "0", 
          xAlign: "center" ,
          yAlign: "bottom",
          caretPadding: 0,
          
          displayColors:false,
          callbacks: {
              title:()=>{
                  return "";
              },
          },
          
      }, 
      legend:{
        display: false
      },
      
      
  }, 
 
    elements:{
        bar: {
        
            borderRadius: 10
        },
       
    },
    scales: {
        y: {
          display: false,
            grid: {
              display: false,
            },
           

     
          },
      x: {
       
    
            grid: {
              display: false,
            },
            border:{
              display: false
            },
            
          },
         
      
          
     },
     
  },

  // dejar espacio entre la legenda y el grafico
plugins: [{
  beforeInit(chart) {
    const fitValue = chart.legend.fit;

    chart.legend.fit = function fit() {
      fitValue.bind(chart.legend)();
     return  this.height += 40;
    }}}],

});