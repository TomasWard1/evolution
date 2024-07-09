<script>
  import { onMount } from "svelte";
  import * as d3 from "d3";
  export let specie;
  export let getCoolSpecieName;
  import RadarChart from "./RadarChart.svelte";

  //d3 Scales
  let timeScale = d3.scaleLinear().domain([0.5, 4.4]).range([1, 10]);
  let cranialCapacityScale = d3
    .scaleLinear()
    .domain([300, 1236])
    .range([1, 10]);
  let heightScale = d3.scaleLinear().domain([110, 170]).range([1, 10]);

  function calculateStrength(height, cranialCapacity, hipStructure) {
    const normalizedHeight = height / 170;
    const normalizedCranialCapacity = cranialCapacity / 1236;
    const normalizedHipStructure = hipStructure === "big" ? 1 : 0;

    const strengthScore =
      normalizedHeight * 0.4 +
      normalizedCranialCapacity * 0.4 +
      normalizedHipStructure * 0.2;

    return Math.round(strengthScore * 100);
  }

  function calculateAgility(height, incisorSize, canineSize) {
    const normalizedHeight = height / 170;
    const normalizedIncisorSize = incisorSize === "small" ? 1 : 0;
    const normalizedCanineSize = canineSize === "small" ? 1 : 0;

    const agilityScore =
      normalizedHeight * 0.4 +
      normalizedIncisorSize * 0.3 +
      normalizedCanineSize * 0.3;

    return Math.round(agilityScore * 100);
  }

  function calculateIntelligence(cranialCapacity, technoType) {
    const normalizedCranialCapacity = cranialCapacity / 1236;
    const normalizedTechnoType = technoType === "modern" ? 1 : 0;

    const intelligenceScore =
      normalizedCranialCapacity * 0.7 + normalizedTechnoType * 0.3;

    return Math.round(intelligenceScore * 100);
  }

  function applyTransition() {
    d3.selectAll(".progress-value")
      .transition()
      .duration(1000)
      .style("width", function () {
        return this.getAttribute("data-width") + "%";
      });
  }

  onMount(() => {
    if (specie) {
      applyTransition();
    }
  });

  // Reactive statement to apply transition when specie changes
  $: if (specie) {
    applyTransition();
  }
</script>

{#if specie}
  <div class="row" style="align-items: start;">
    <div class="column" style="align-items: start;">
      <div class="specie-details">
        <h2>{getCoolSpecieName(specie.id.toString())}</h2>
        <div class="row" style="padding: 0%; justify-content:start; align-items:center;">
          <p>Strength</p>
          <strong
            >{calculateStrength(
              specie.height,
              specie.cranialCapacity,
              specie.hip
            )}</strong
          >
        </div>
        <div class="progress">
          <div
            class="progress-value"
            data-width={calculateStrength(
              specie.height,
              specie.cranialCapacity,
              specie.hip
            )}
          ></div>
        </div>
        <div class="row" style="padding: 0%; justify-content:start;align-items:center;">
          <p>Intelligence</p>
          <strong
            >{calculateIntelligence(
              specie.cranialCapacity,
              specie.tecnoType
            )}</strong
          >
        </div>
        <div class="progress">
          <div
            class="progress-value"
            data-width={calculateIntelligence(
              specie.cranialCapacity,
              specie.tecnoType
            )}
          ></div>
        </div>
        <div class="row" style="padding: 0%; justify-content:start;align-items:center;">
          <p>Agility</p>
          <strong
            >{calculateAgility(
              specie.height,
              specie.incisorSize,
              specie.canineSize
            )}</strong
          >
        </div>
        <div class="progress">
          <div
            class="progress-value"
            data-width={calculateAgility(
              specie.height,
              specie.incisorSize,
              specie.canineSize
            )}
          ></div>
        </div>
        <!-- <div class="center" style="margin-top: 13%;">
          <img
            src="images/{specie.id}radar.png"
            alt="avatar"
            style="width: 19vw;"
          />
        </div> -->

        <div style="width: 100%; height:210px; padding-top: 10%">
          <RadarChart
            data={[
              {
                name: getCoolSpecieName(specie.id.toString()),
                "Height": heightScale(specie.height),
                "Cranial Capacity": cranialCapacityScale(specie.cranialCapacity),
                "World Knowledge": timeScale(specie.time),
              },
            ]}
          ></RadarChart>
        </div>
      </div>
    </div>

    <img
      src="images/{specie.id}.png"
      alt="avatar"
      class="float"
      style="width: auto; height: 80vh;"
    />
  </div>
{/if}

<style>
  .progress {
    background: rgba(255, 255, 255, 0.1);
    justify-content: flex-start;
    border-radius: 100px;
    align-items: center;
    margin-bottom: 10px;
    position: relative;
    display: flex;
    height: 15px;
    width: 500px;
  }

  .progress-value {
    animation: load 3s normal forwards;
    box-shadow: 0 10px 40px -10px #fff;
    border-radius: 100px;
    background: #fff;
    height: 15px;
    width: 0;
  }
</style>
