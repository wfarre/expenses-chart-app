import React, { useEffect, useState } from 'react';
import {Bar} from 'react-chartjs-2'
import { Chart as ChartJS} from 'chart.js/auto';


function MyChart(props){
  const amountData = props.amountData;
  const [backgroundColorArray, setBackgroundColorArray] = useState([]);
  const [hoverBgColorArray, setHoverBgColorArray] = useState([]);


  useEffect(()=> {
    const maxValue = Math.max(...amountData);
    console.log(amountData);
    console.log(maxValue);
    const backgroundColors = [];
    const hoverBgColors = [];
    for(let i = 0; i < amountData.length; i++){
      if( amountData[i] < maxValue){
        backgroundColors.push(['hsl(10, 79%, 65%)'])
        hoverBgColors.push(['rgb(255, 155, 135)'])
      } else{
        backgroundColors.push(['hsl(186, 34%, 60%)'])
        hoverBgColors.push(['rgb(180, 223, 229)'])
      }
    }

    setBackgroundColorArray(backgroundColors);
    setHoverBgColorArray(hoverBgColors);
  }, [amountData])

  const options = {
    responsive: true,
    plugins:{
      legend : {
        display : false
      },
      tooltip : {
        displayColors: false,
        backgroundColor: 'hsl(25, 47%, 15%)',
        yAlign: 'above',
        position: 'nearest',
        callbacks: {
          label: function(context) {
              let label = context.dataset.label || '';

              // console.log(label);

              if (label) {
                  label += ': ';
              }
              if (context.parsed.y !== null) {
                  label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
              }
              return label;
          }, title: function(tooltipItems, data) {
          return '';
        },
      }
      }
    },
    scales: {
      y : {
        ticks : {
          display: false,
        },
        grid : {
          display: false,
          drawTicks: false,
          // borderColor: 'transparent'
          drawBorder: false
        },
       
      },
      x : {
        grid : {
          display : false,
          drawBorder: false
        }
      },
    }
   
  };

console.log(backgroundColorArray);



    return(
          <Bar 
            data={{
              labels : props.labels,
              datasets : [{
                // label : "number of votes",
                data : props.amountData,
                borderRadius: 5,
                backgroundColor: backgroundColorArray,
                hoverBackgroundColor: hoverBgColorArray
              }]
            }}

            options = {options}
            // height={200}
            height={200}
            width={460}
          />
    )
}

export default MyChart;



