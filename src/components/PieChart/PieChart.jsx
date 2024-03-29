// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/pie
import { ResponsivePie } from '@nivo/pie'

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and

// website examples showcase many properties,
// you'll often use just a few of them.
export const MyResponsivePie = ({data}) => (
    <ResponsivePie
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
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        startAngle={57}
        innerRadius={0.5}
        padAngle={2}
        cornerRadius={6}
        activeInnerRadiusOffset={2}
        activeOuterRadiusOffset={6}
        colors={{ scheme: 'reds' }}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.2
                ]
            ]
        }}
        enableArcLinkLabels={false}
        arcLinkLabelsSkipAngle={9}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color', modifiers: [] }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    2
                ]
            ]
        }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'ruby'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'c'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'go'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'python'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'scala'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'lisp'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'elixir'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'javascript'
                },
                id: 'lines'
            }
        ]}
        motionConfig="slow"
        legends={[
            {
                anchor: 'bottom',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: 56,
                itemsSpacing: 0,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: '#999',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000'
                        }
                    }
                ]
            }
        ]}
    />
)