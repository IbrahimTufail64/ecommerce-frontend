import { ResponsiveBar } from '@nivo/bar'
import { BarChart } from '@mui/x-charts/BarChart';

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
export const BarGraph = () => (
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
      keys={["hot dog", "burger", "sandwich", "kebab", "fries", "donut"]}
      indexBy="country"
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
        legend:  "country",
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend:  "food",
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



const data = [
  {
    "country": "AD",
    "hot dog": 192,
    "hot dogColor": "hsl(337, 70%, 50%)",
    "burger": 83,
    "burgerColor": "hsl(297, 70%, 50%)",
    "sandwich": 142,
    "sandwichColor": "hsl(288, 70%, 50%)",
    "kebab": 166,
    "kebabColor": "hsl(246, 70%, 50%)",
    "fries": 152,
    "friesColor": "hsl(186, 70%, 50%)",
    "donut": 54,
    "donutColor": "hsl(248, 70%, 50%)"
  },
  {
    "country": "AE",
    "hot dog": 53,
    "hot dogColor": "hsl(144, 70%, 50%)",
    "burger": 136,
    "burgerColor": "hsl(322, 70%, 50%)",
    "sandwich": 142,
    "sandwichColor": "hsl(252, 70%, 50%)",
    "kebab": 23,
    "kebabColor": "hsl(183, 70%, 50%)",
    "fries": 59,
    "friesColor": "hsl(62, 70%, 50%)",
    "donut": 185,
    "donutColor": "hsl(123, 70%, 50%)"
  },
  {
    "country": "AF",
    "hot dog": 145,
    "hot dogColor": "hsl(151, 70%, 50%)",
    "burger": 62,
    "burgerColor": "hsl(249, 70%, 50%)",
    "sandwich": 176,
    "sandwichColor": "hsl(184, 70%, 50%)",
    "kebab": 151,
    "kebabColor": "hsl(218, 70%, 50%)",
    "fries": 67,
    "friesColor": "hsl(83, 70%, 50%)",
    "donut": 104,
    "donutColor": "hsl(303, 70%, 50%)"
  },
  {
    "country": "AG",
    "hot dog": 129,
    "hot dogColor": "hsl(83, 70%, 50%)",
    "burger": 6,
    "burgerColor": "hsl(277, 70%, 50%)",
    "sandwich": 163,
    "sandwichColor": "hsl(242, 70%, 50%)",
    "kebab": 33,
    "kebabColor": "hsl(71, 70%, 50%)",
    "fries": 170,
    "friesColor": "hsl(112, 70%, 50%)",
    "donut": 87,
    "donutColor": "hsl(176, 70%, 50%)"
  },
  {
    "country": "AI",
    "hot dog": 196,
    "hot dogColor": "hsl(216, 70%, 50%)",
    "burger": 132,
    "burgerColor": "hsl(113, 70%, 50%)",
    "sandwich": 77,
    "sandwichColor": "hsl(240, 70%, 50%)",
    "kebab": 22,
    "kebabColor": "hsl(253, 70%, 50%)",
    "fries": 197,
    "friesColor": "hsl(263, 70%, 50%)",
    "donut": 47,
    "donutColor": "hsl(169, 70%, 50%)"
  },
  {
    "country": "AL",
    "hot dog": 188,
    "hot dogColor": "hsl(117, 70%, 50%)",
    "burger": 170,
    "burgerColor": "hsl(41, 70%, 50%)",
    "sandwich": 77,
    "sandwichColor": "hsl(202, 70%, 50%)",
    "kebab": 61,
    "kebabColor": "hsl(212, 70%, 50%)",
    "fries": 164,
    "friesColor": "hsl(286, 70%, 50%)",
    "donut": 137,
    "donutColor": "hsl(264, 70%, 50%)"
  },
  {
    "country": "AM",
    "hot dog": 182,
    "hot dogColor": "hsl(284, 70%, 50%)",
    "burger": 79,
    "burgerColor": "hsl(323, 70%, 50%)",
    "sandwich": 170,
    "sandwichColor": "hsl(352, 70%, 50%)",
    "kebab": 192,
    "kebabColor": "hsl(60, 70%, 50%)",
    "fries": 177,
    "friesColor": "hsl(234, 70%, 50%)",
    "donut": 132,
    "donutColor": "hsl(148, 70%, 50%)"
  }
]