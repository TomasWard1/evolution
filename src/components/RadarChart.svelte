<script>
  import { LayerCake, Svg } from "layercake";
  import { scaleLinear } from "d3-scale";

  import Radar from "./Radar.svelte";
  import AxisRadial from "./AxisRadial.svelte";

  export let data;

  const seriesKey = "name";
  const xKey = ["World Knowledge",'Height','Cranial Capacity'];

  const seriesNames = Object.keys(data[0]).filter((d) => d !== seriesKey);

  data.forEach((d) => {
    seriesNames.forEach((name) => {
      d[name] = +d[name];
    });
  });
</script>

<LayerCake
  
  padding={{ top: 30, right: 0, bottom: 7, left: 0 }}
  x={xKey}
  xDomain={[0, 10]}
  xRange={({ height }) => [0, height / 2]}
  {data}
>

<div style="width: 10px; height: 10px;">
  <Svg
  >
    <AxisRadial lineLengthFactor=1/>
    <Radar />
  </Svg>
</div>

</LayerCake>
