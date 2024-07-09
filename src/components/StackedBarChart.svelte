<script>
  import { LayerCake, Svg, flatten, stack, Html } from "layercake";
  import { scaleBand, scaleOrdinal } from "d3-scale";
  import { format } from "d3-format";
  import * as d3 from "d3";
  import { leaderboardStore } from "../stores";
  import BarStacked from "./BarStacked.svelte";
  import AxisX from "./AxisX.svelte";
  import AxisY from "./AxisY.svelte";
  import Key from "./Key.html.svelte";
  export let species;
  export let top1SpecieId;
  export let top2SpecieId;

  //d3 Scales
  let timeScale = d3.scaleLinear().domain([0.5, 4.4]).range([1, 10]);
  let cranialCapacityScale = d3
    .scaleLinear()
    .domain([300, 1236])
    .range([1, 10]);
  let heightScale = d3.scaleLinear().domain([110, 170]).range([1, 10]);

  let data;
  const xKey = [0, 1];
  const yKey = "stat";
  const zKey = "key";
  const seriesColors = ["#00bbff", "#8bcef6", "#c4e2ed", "#f7f6e3"];
  let seriesNames;
  const formatLabelX = (d) => format(`~s`)(d);
  let stackedData;

  $: if (top1SpecieId || top2SpecieId) {
    data = [
      {
        stat: "Strength",
        topKey: species[top1SpecieId].strength,
        topKey2: species[top2SpecieId].strength,
      },
      {
        stat: "Intelligence",
        topKey: species[top1SpecieId].intelligence,
        topKey2: species[top2SpecieId].intelligence,
      },
      {
        stat: "Agility",
        topKey: species[top1SpecieId].agility,
        topKey2: species[top2SpecieId].agility,
      },
      // {
      //   stat: "World Knowledge",
      //   topKey: timeScale(species[top1SpecieId].time),
      //   topKey2: timeScale(species[top2SpecieId].time),
      // },
      // {
      //   stat: "Cranial Capacity",
      //   topKey: cranialCapacityScale(species[top1SpecieId].cranialCapacity),
      //   topKey2: cranialCapacityScale(species[top2SpecieId].cranialCapacity),
      // },
      // {
      //   stat: "Height",
      //   topKey: heightScale(species[top1SpecieId].height),
      //   topKey2: heightScale(species[top2SpecieId].height),
      // },
    ];

    seriesNames = Object.keys(data[0]).filter((d) => d !== yKey);

    data.forEach((d) => {
      seriesNames.forEach((name) => {
        d[name] = +d[name];
      });
    });
    stackedData = stack(data, seriesNames);
  }
</script>

<div class="chart-container">
  <LayerCake
    padding={{ top: 0, bottom: 20, left: 35 }}
    x={xKey}
    y={(d) => d.data[yKey]}
    z={zKey}
    yScale={scaleBand().paddingInner(0.05)}
    zScale={scaleOrdinal()}
    zDomain={seriesNames}
    zRange={seriesColors}
    flatData={flatten(stackedData)}
    data={stackedData}
  >
    <Svg>
      <!-- <AxisX baseline snapLabels format={formatLabelX} /> -->
      <AxisY gridlines={false} />
      <BarStacked />
    </Svg>
  </LayerCake>
</div>

<style>
  /*
      The wrapper div needs to have an explicit width and height in CSS.
      It can also be a flexbox child or CSS grid element.
      The point being it needs dimensions since the <LayerCake> element will
      expand to fill it.
    */
  .chart-container {
    width: 100%;
    height: 200px;
    padding-left: 60px;
    margin-top: 40px;
  }
</style>
