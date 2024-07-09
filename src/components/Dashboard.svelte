<script>
  import StackedBarChart from "./StackedBarChart.svelte";
  import { leaderboardStore } from "../stores";
  import RadarChart from "./RadarChart.svelte";
  import * as d3 from "d3";
  export let species;
  export let getCoolSpecieName;

  let timeScale = d3.scaleLinear().domain([0.5, 4.4]).range([1, 10]);
  let cranialCapacityScale = d3
    .scaleLinear()
    .domain([300, 1236])
    .range([1, 10]);
  let heightScale = d3.scaleLinear().domain([110, 170]).range([1, 10]);

  let leaderboard;
  let sortedLeaderboard = [
    [0, 0],
    [1, 1],
  ];
  $: leaderboard = $leaderboardStore;

  $: if (leaderboard) {
    let items = Object.keys(leaderboard).map(function (key) {
      return [key, leaderboard[key]];
    });

    items.sort(function (first, second) {
      return second[1] - first[1];
    });

    sortedLeaderboard = items.slice(0, 2);

    if (sortedLeaderboard.length > 1) {
      console.log(species[sortedLeaderboard[0][0]]);
      console.log(species[sortedLeaderboard[1][0]]);
    }
  }
</script>

<div
  class="column"
  style="align-items: start; margin-top: 0px; margin-inline: 70px; gap: 0px;min-height: 100vh;"
>
  <h1 style="margin-block-end: -25px; margin-block-start: 30px;">
    Stats - Top 2 Species
  </h1>
  <div style="width: 40vw;">
    <p>
      {Object.keys(leaderboard).length < 2
        ? "Simulate more fight to get some data. You need at least two species with kills on the killboard."
        : "If you got this far, it means you are capable of picking the right ancestral species to save our country, and maybe the world. Here are some stats to help you with your decision. But make it QUICK!"}
    </p>
    {#if sortedLeaderboard.length > 1}
      <div
        class="row"
        style="justify-content: start; align-items: center; gap: 10px; padding: 0px; margin-top: 30px;"
      >
        <div
          class="legend-dot"
          style="background-color: rgba(255, 255, 255, .8);"
        ></div>
        <strong>{getCoolSpecieName(species[sortedLeaderboard[0][0]].id)}</strong
        >
        <div style="width: 15px;"></div>
        <div
          class="legend-dot"
          style="background-color: rgba(100, 100, 100, .8);"
        ></div>
        <strong>{getCoolSpecieName(species[sortedLeaderboard[1][0]].id)}</strong
        >
      </div>
    {/if}
  </div>

  {#if Object.keys(leaderboard).length > 1}
    <div class="row" style="height: 200px; width: 100%; justify-content: start;">
      <div style="width: 50%;">
        <StackedBarChart
        {species}
        top1SpecieId={sortedLeaderboard[0][0]}
        top2SpecieId={sortedLeaderboard[1][0]}
      ></StackedBarChart>
      </div>
    
      <div style="width: 50%; height: 200px; margin-top: 30px; margin-left: 80px;">
        <RadarChart
        data={[
          {
            name: getCoolSpecieName(species[sortedLeaderboard[0][0]].id),
            Height: heightScale(species[sortedLeaderboard[0][0]].height),
            "Cranial Capacity": cranialCapacityScale(
              species[sortedLeaderboard[0][0]].cranialCapacity
            ),
            "World Knowledge": timeScale(species[sortedLeaderboard[0][0]].time),
          },
          {
            name: getCoolSpecieName(species[sortedLeaderboard[1][0]].id),
            Height: heightScale(species[sortedLeaderboard[1][0]].height),
            "Cranial Capacity": cranialCapacityScale(
              species[sortedLeaderboard[1][0]].cranialCapacity
            ),
            "World Knowledge": timeScale(species[sortedLeaderboard[1][0]].time),
          },
        ]}
      ></RadarChart>
      </div>
     
    </div>
  {:else}
    <div class="img-container">
      <img
        src="images/lock.png"
        alt="Locked Screen"
        style="width: 10%; height: auto;"
      />
    </div>
  {/if}
</div>

<style>
  .img-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;

    height: 75vh;
  }

  .legend-dot {
    width: 20px;
    height: 20px;
    border-radius: 100px;
  }
</style>
