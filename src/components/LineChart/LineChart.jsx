import React from 'react'



import { ResponsiveLine } from '@nivo/line'



const data = [
  {
    "id": "japan",
    "color": "hsl(21, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 84
      },
      {
        "x": "helicopter",
        "y": 223
      },
      {
        "x": "boat",
        "y": 159
      },
      {
        "x": "train",
        "y": 59
      },
      {
        "x": "subway",
        "y": 153
      },
      {
        "x": "bus",
        "y": 20
      },
      {
        "x": "car",
        "y": 288
      },
      {
        "x": "moto",
        "y": 223
      },
      {
        "x": "bicycle",
        "y": 298
      },
      {
        "x": "horse",
        "y": 264
      },
      {
        "x": "skateboard",
        "y": 177
      },
      {
        "x": "others",
        "y": 266
      }
    ]
  },
  {
    "id": "france",
    "color": "hsl(271, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 215
      },
      {
        "x": "helicopter",
        "y": 283
      },
      {
        "x": "boat",
        "y": 294
      },
      {
        "x": "train",
        "y": 215
      },
      {
        "x": "subway",
        "y": 132
      },
      {
        "x": "bus",
        "y": 170
      },
      {
        "x": "car",
        "y": 60
      },
      {
        "x": "moto",
        "y": 228
      },
      {
        "x": "bicycle",
        "y": 58
      },
      {
        "x": "horse",
        "y": 108
      },
      {
        "x": "skateboard",
        "y": 77
      },
      {
        "x": "others",
        "y": 272
      }
    ]
  },
  {
    "id": "us",
    "color": "hsl(174, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 42
      },
      {
        "x": "helicopter",
        "y": 30
      },
      {
        "x": "boat",
        "y": 16
      },
      {
        "x": "train",
        "y": 213
      },
      {
        "x": "subway",
        "y": 126
      },
      {
        "x": "bus",
        "y": 262
      },
      {
        "x": "car",
        "y": 50
      },
      {
        "x": "moto",
        "y": 260
      },
      {
        "x": "bicycle",
        "y": 233
      },
      {
        "x": "horse",
        "y": 163
      },
      {
        "x": "skateboard",
        "y": 127
      },
      {
        "x": "others",
        "y": 80
      }
    ]
  },
  {
    "id": "germany",
    "color": "hsl(271, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 142
      },
      {
        "x": "helicopter",
        "y": 257
      },
      {
        "x": "boat",
        "y": 129
      },
      {
        "x": "train",
        "y": 234
      },
      {
        "x": "subway",
        "y": 240
      },
      {
        "x": "bus",
        "y": 244
      },
      {
        "x": "car",
        "y": 115
      },
      {
        "x": "moto",
        "y": 119
      },
      {
        "x": "bicycle",
        "y": 249
      },
      {
        "x": "horse",
        "y": 201
      },
      {
        "x": "skateboard",
        "y": 71
      },
      {
        "x": "others",
        "y": 278
      }
    ]
  },
  {
    "id": "norway",
    "color": "hsl(107, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 298
      },
      {
        "x": "helicopter",
        "y": 85
      },
      {
        "x": "boat",
        "y": 268
      },
      {
        "x": "train",
        "y": 85
      },
      {
        "x": "subway",
        "y": 99
      },
      {
        "x": "bus",
        "y": 77
      },
      {
        "x": "car",
        "y": 73
      },
      {
        "x": "moto",
        "y": 1
      },
      {
        "x": "bicycle",
        "y": 243
      },
      {
        "x": "horse",
        "y": 280
      },
      {
        "x": "skateboard",
        "y": 54
      },
      {
        "x": "others",
        "y": 40
      }
    ]
  }
]

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const LineChart = () => (
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
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
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
            tickPadding: 11,
            tickRotation: 0,
            legend: 'transportation',
            legendOffset: 36,
            legendPosition: 'middle',
            truncateTickAt: 0
        }}
        axisLeft={{
            tickSize: 6,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'count',
            legendOffset: -40,
            legendPosition: 'middle',
            truncateTickAt: 0
        }}
        enableGridX={false}
        enableGridY={false}
        colors={{ scheme: 'reds' }}
        pointSize={5}
        pointColor={{ from: 'color', modifiers: [] }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        enableArea={true}
        areaOpacity={0.15}
        enableTouchCrosshair={true}
        useMesh={true}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 10,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
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
    />
)


export default LineChart