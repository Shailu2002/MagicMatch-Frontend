import React from 'react'
import {Chart as ChartJS,ArcElement,Title,Tooltip,Legend} from 'chart.js';
import {Doughnut} from 'react-chartjs-2';
ChartJS.register(
    ArcElement,
    Title,
    Tooltip,
    Legend
);
export const Charts = ({P1,P2}) => {

    const labels=["Paid Members","Non-Paid Members"];
    const options={
        responsive:true,
        plugins:{
            legend:{ position:"bottom"},title:{display:true,text:"User Membership",},
        },
    };
    const Data={labels ,datasets:[ { label:"User Membership",data:[P1,P2],borderColor:["rgba(62,12,171)","rgba(214,43,129)"],backgroundColor:["rgba(62,12,171,0.3)","rgba(214,43,129,0.3)"],borderWidth:1}]};
  return <Doughnut  data={Data}/>
}
export default Charts;

export const LCharts=()=>{


}
