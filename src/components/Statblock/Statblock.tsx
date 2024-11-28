import { Stats } from "@/models/species";
import { Chart } from 'chart.js/auto';
import { useEffect } from "react";
import ChartDataLabels from 'chartjs-plugin-datalabels';

const Statblock = (props: { stats: Stats }) => {

    const table: string = "stats";
    Chart.register(ChartDataLabels);

    const highStat: number = Math.max(props.stats.meleeAttack, props.stats.meleeDefense, props.stats.speed, props.stats.rangedAttack, props.stats.rangedDefense, props.stats.maxHp);

    const RadarData = {
        labels: ["Max HP", "Melee Attack", "Melee Defence", "Ranged Attack", "Ranged Defence", "Speed"],
        datasets: [
            {
                backgroundColor: "rgba(63, 187, 159, .5)",
                borderColor: "rgba(171, 117, 232, 1)",
                pointBackgroundColor: "rgba(171, 117, 232, 1)",
                poingBorderColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "rgba(34, 202, 236, 1)",
                data: [props.stats.maxHp, props.stats.meleeAttack, props.stats.meleeDefense, props.stats.rangedAttack, props.stats.rangedDefense, props.stats.speed],
                fill: true,
                
            },
        ],
    };

    useEffect(() => {
        var myChart = new Chart(table, {
            type: "radar",
            data: RadarData,
            plugins: [ChartDataLabels],
            
            options: {
                aspectRatio: 1.15,
                backgroundColor: "#3FBB9F",
                responsive: true,
                plugins: {
                    legend: {
                        display: false,
                    },
                    title: {
                        display: false,
                    },
                    datalabels: {
                        formatter: (val) => {
                            return val;
                        },
                        anchor: "end",
                        align: "end",
                        font: {
                            weight: 'bold'
                        }
                    },

                },
                scales: {
                    r: {
                        beginAtZero: true,
                        backgroundColor: "#CEE1EE",
                        angleLines: {
                            display: true,
                            color: "#FFF",
                            lineWidth: 2
                        },
                        suggestedMin: 50,
                        suggestedMax: highStat + 25,
                        ticks: {
                            display: false,
                        },
                        grid: {
                            display: false
                        }
                    },
                   
                },
            },
            
        });

        return () => {
            myChart.destroy()
        }
    }, [props.stats]);


    return (
        <div >
            <div style={{ display: "flex" }}>
                <div style={{ marginRight: "1em" }}><strong>{"Max AP:"}</strong>{` ${props.stats.maxAp}/10`}</div><div><strong>{"Move Slots:"}</strong>{` ${props.stats.moveSlots}`}</div>
            </div>
            <canvas id="stats"></canvas>

        </div>
    );
};

export default Statblock;