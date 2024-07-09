<!--
  @component
  Generates an SVG stacked bar chart and sets the color via an ordinal scale in `zScale`.
 -->
<script>
  import { getContext } from "svelte";

  const { data, xGet, yGet, zGet, yScale } = getContext("LayerCake");
  const colors = [
    'rgba(255, 255, 255, .8)',
    'rgba(100, 100, 100, .8)',
  ];

  // Function to get the color for each bar based on its index
  const getColor = (seriesIndex, barIndex) => {
    return colors[seriesIndex % colors.length];
  };
  $: columnWidth = (d) => {
    const xVals = $xGet(d);
    return xVals[1] - xVals[0];
  };
</script>

<g class="bar-group">
  {#each $data as series, seriesIndex}
    {#each series as d, barIndex}
      <rect
        class="group-rect"
        data-id={barIndex}
        x={$xGet(d)[0]}
        y={$yGet(d)}
        height={$yScale.bandwidth()}
        width={columnWidth(d)}
        fill={getColor(seriesIndex, barIndex)}
      ></rect>
    {/each}
  {/each}
</g>
