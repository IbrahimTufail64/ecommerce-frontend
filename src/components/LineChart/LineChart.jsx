import React from 'react'



import { ResponsiveLine } from '@nivo/line'





// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const LineChart = ({data}) => (
    <ResponsiveLine
        data={data}
        theme={
            {
                legends: {
                    text: {
                        fill: "#E5ECF6",
                    },
                },
                crosshair: {
                    line: {
                        stroke: '#000000',
                        strokeWidth: 1,
                        strokeOpacity: 0.35,
                        
                    },
                    
                    
                },
                
                axis: {
                    domain:{
                        line:{
                            stroke: '#E5ECF6'
                        }
                    },
                    legend:{
                        text:{
                            fill: '#E5ECF6'
                        }
                    },
                    ticks:{
                        line:{
                            stroke:'#E5ECF6'
                        },
                        text:{
                            fill:'#E5ECF6'
                        }
                    }
                },
                
                tooltip: {
                    container: {
                        background: "#000000",
                        border: "1px solid #f1f3f5",
                        borderRadius: 3,
                        padding: 5,
                    },
                    title: {
                        color: "#f1f3f5",
                    },
                    value: {
                        color: "#f1f3f5",
                    },
                },
            }
        }
        margin={{ top: 50, right: 110, bottom: 30, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: true,
            reverse: false
        }}
        yFormat=" >-.2f"
        curve="cardinal"
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'transportation',
            legendOffset: 36,
            legendPosition: 'middle',
            truncateTickAt: 0
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'count',
            legendOffset: -40,
            legendPosition: 'middle',
            truncateTickAt: 0
        }}
        enableGridX={false}
        enableGridY={false}
        colors={{ scheme: 'orange_red' }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-13}
        enableSlices="x"
        enableTouchCrosshair={true}
        crosshairType="x"
        useMesh={true}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 6,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 27,
                itemOpacity: 0.75,
                symbolSize: 15,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
        motionConfig="slow"
    />
)


export default LineChart