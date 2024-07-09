<script>
  import { onMount } from "svelte";
  import Picker from "./PickCharacter.svelte";
  import * as d3 from "d3";
  export let species;
  export let fightLoading;
  export let getCoolSpecieName;
  export let leaderboardMap;
  export let chosenSpecie1;
  export let chosenSpecie2;
  import RadarChart from "./RadarChart.svelte";
  $: {
        // Code to react to changes in chosenSpecie1 or chosenSpecie2
        console.log('Chosen Specie 1 changed:', chosenSpecie1);
        console.log('Chosen Specie 2 changed:', chosenSpecie2);
    }
  function simulateFight(specie1, specie2) {
    fightLoading = true;

    // Calculate the sum of attributes for both species
    const total1 = specie1.strength + specie1.intelligence + specie1.agility;
    const total2 = specie2.strength + specie2.intelligence + specie2.agility;

    // Determine the winner
    let winner = total1 > total2 ? specie1 : specie2;

    console.log(
        `${getCoolSpecieName(specie1.id)}: ${total1}, ${getCoolSpecieName(specie2.id)}: ${total2}, Winner: ${getCoolSpecieName(winner.id)}`
    );

    // Add 1 point to the leaderboard for the winner
    leaderboardMap[winner.name] += 1

    // Sort leaderboard map in descending order of points
    leaderboardMap = new Map([...leaderboardMap.entries()].sort((a, b) => b[1] - a[1]));

    setTimeout(() => {
        fightLoading = false;
    }, 1000); // 1000 milliseconds = 1 second
}
</script>

<div class="landing row" style="">
  <div class="column" style="justify-content: center; width: 70vw;">
    <h1 style="text-align: center; width:100vw; margin-bottom: 30px;">
      {fightLoading ? "Simulating..." : "Choose your fighters"}
    </h1>
    <div class="row" style="margin-bottom: 40px;">
      <Picker
        {species}
        {getCoolSpecieName}
        playerNum="1"
        {fightLoading}
        chosenSpecie={chosenSpecie1}
      />
      <div style="width: 50px;"></div>
      <div class="column" style="justify-content: center;">
        {#if fightLoading}
          <div
            class="loader"
            style="display: block; margin-bottom:30px;height: 10%;"
          ></div>
        {:else}
          <h1 style="text-align: center;">VS</h1>
          <button on:click={simulateFight(chosenSpecie1, chosenSpecie2)}
            >FIGHT!</button
          >
        {/if}
      </div>
      <div style="width: 50px;"></div>
      <Picker
        {species}
        {getCoolSpecieName}
        playerNum="2"
        {fightLoading}
        chosenSpecie={chosenSpecie2}
      />
    </div>
  </div>
  <div class="leaderboard-bg">
    <h2 class="leaderboard-header">KillBoard</h2>
    <ul class="leaderboard-list">
      {#each leaderboardMap as { name, kills }}
        <li class="leaderboard-item">
          <p style="font-weight: 600;">{name}</p>
          <p>{kills} kills</p>
        </li>
      {/each}
    </ul>
  </div>
</div>

<style>
  .leaderboard-bg {
    width: 20vw;
    background-color: rgba(128, 128, 128, 0.178);
    border-radius: 20px;
    margin-top: 4%;
    margin-bottom: 4%;
    margin-right: 4%;
  }

  .leaderboard-header {
    background-color: white;
    text-align: center;
    padding-top: 5px;
    padding-bottom: 5px;
    color: black;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }

  .leaderboard-list {
    list-style: none;
    padding: 0;
  }

  .leaderboard-item {
    display: flex;

    padding-inline: 20px;
    justify-content: space-between;
  }
</style>
