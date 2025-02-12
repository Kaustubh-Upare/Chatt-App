import {Line,Doughnut} from "react-chartjs-2"
import {ArcElement, CategoryScale, Chart as ChartJS, Filler, Legend, LinearScale, LineElement, PointElement, Tooltip} from "chart.js"
import { BorderColor } from "@mui/icons-material"
import { getLast7Days } from "../../lib/features"
import zIndex from "@mui/material/styles/zIndex"


ChartJS.register(CategoryScale,Tooltip,LinearScale,LineElement,PointElement,Filler,ArcElement,
    Legend
)

const lineChartOptions={
    responsive:true,
    plugins:{
        legend:{
            display: false,
        },
        title:{
            display:false,
        },
    },

    scales:{
        x:{
            grid:{
                display:false
            }
            // display:false,
        },
        y:{
            beginAtZero:true,
            grid:{
                display:false
            }
            // display:false
        }
    }
}

const labels=getLast7Days();

const LineChart=({stats})=>{
    
    const data={
        labels:labels,
        datasets:[
            {
                data:stats.msgsChart,
                label:"Revenue",
                borderColor:"purple",
                backgroundColor:"rgb(75, 159, 216)",
                fill:true
            }
        ]
    };

    return(
        <div><Line data={data} options={lineChartOptions} /></div>
    )
}

const DoughnutOptions={
    responsive:true,
    plugins:{
        Legend:{
            display:false
        },
        title:{
            display:false
        }
    },
    cutout:100,
}



const DoughnutChart=({value,labels})=>{
    
    const data={
        labels:labels,
        datasets:[
            {
                data:value,
                label:"Total Chats VS Group Chats",
                borderColor:["purple","red"],
                backgroundColor:["rgb(75, 159, 216)","rgb(0,0,0,0,6)"],
                offset:30,
                hoverBackgroundColor:["rgb(235, 91, 34)","rgb(63, 240, 92)"]
            }
        ]
    };
    
    return(
        <Doughnut style={{zIndex:10,}}  data={data} options={DoughnutOptions }/>
    )
}
export {LineChart,DoughnutChart};