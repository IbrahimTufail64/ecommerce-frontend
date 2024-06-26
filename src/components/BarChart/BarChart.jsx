import { ResponsiveBar } from '@nivo/bar'
import { BarChart } from '@mui/x-charts/BarChart';

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
export const BarGraph = ({data}) => (
     <ResponsiveBar
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
      // isInteractive={false}
      keys={["views"]}
      indexBy="date"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "nivo" }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      borderColor={{
        from: "color",
        modifiers: [["darker", "1.6"]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend:  "date",
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend:  "views",
        legendPosition: "middle",
        legendOffset: -40,
      }}
      enableLabel={false}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role="application"
      barAriaLabel={function (e) {
        return e.id + ": " + e.formattedValue + " in country: " + e.indexValue;
      }}
    />
)



