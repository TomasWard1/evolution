<script>
  import { onMount } from "svelte";
  import Picker from "./PickCharacter.svelte";
  import { chosenSpecie1, chosenSpecie2 } from "../stores";
  export let species;
  export let getCoolSpecieName;
  import { leaderboardStore } from "../stores";
  let fightLoading = false;

  let s1;
  let s2;
  let leaderboard;
  $: leaderboard = $leaderboardStore;

  onMount(() => {
    chosenSpecie1.set(species[0]);
    chosenSpecie2.set(species[1]);

    chosenSpecie1.subscribe((value) => {
      s1 = value;
    });
    chosenSpecie2.subscribe((value) => {
      s2 = value;
    });
  });

  function simulate100Fights() {
    for (let i = 0; i < 100; i++) {
      let randomIndex1 = Math.floor(Math.random() * 11);
      let randomIndex2 = Math.floor(Math.random() * 11);

      let sp1 = species[randomIndex1];
      let sp2 = species[randomIndex2];

      fightLoading = true;

      setTimeout(() => {
        fightLoading = false;

        // Calculate the sum of attributes for both species
        const total1 = sp1.strength + sp1.intelligence + sp1.agility;
        const total2 = sp2.strength + sp2.intelligence + sp2.agility;

        // Determine the winner
        let winner = total1 > total2 ? sp1 : sp2;

        // Add 1 point to the leaderboard for the winner
        leaderboardStore.update((map) => {
          map[winner.id] = (map[winner.id] || 0) + 1;
          return map;
        });
      }, 1000);
    }
  }

  function simulateFight() {
    fightLoading = true;

    setTimeout(() => {
      fightLoading = false;

      // Calculate the sum of attributes for both species
      const total1 = s1.strength + s1.intelligence + s1.agility;
      const total2 = s2.strength + s2.intelligence + s2.agility;

      // Determine the winner
      let winner = total1 > total2 ? s1 : s2;

      // Add 1 point to the leaderboard for the winner
      leaderboardStore.update((map) => {
        map[winner.id] = (map[winner.id] || 0) + 1;
        return map;
      });
    }, 1000);
  }
</script>

<div class="landing row" style="">
  <div class="column" style="justify-content: center; width: 70vw;">
    <h1 style="text-align: center; width:100vw; margin-bottom: 30px;">
      {fightLoading ? "Simulating..." : "Choose your fighters"}
    </h1>
    <div class="row" style="margin-bottom: 40px;">
      <Picker {species} {getCoolSpecieName} playerNum="1" {fightLoading} />
      <div style="width: 50px;"></div>
      <div class="column" style="justify-content: center;">
        {#if fightLoading}
          <div
            class="loader"
            style="display: block; margin-bottom:30px;height: 10%;"
          ></div>
        {:else}
          <h1 style="text-align: center;">VS</h1>
          <button on:click={simulateFight}>FIGHT!</button>
          <button on:click={simulate100Fights}>Simulate 100 Fights</button>
        {/if}
      </div>
      <div style="width: 50px;"></div>
      <Picker {species} {getCoolSpecieName} playerNum="2" {fightLoading} />
    </div>
  </div>
  <div class="leaderboard-bg">
    <h2 class="leaderboard-header">KillBoard</h2>
    {#if Object.keys(leaderboard).length === 0}
      <p style="font-size: 14px; color:gray; text-align: center;">
        No data. Start a fight!
      </p>
    {:else}
      <ul class="leaderboard-list">
        {#each Object.entries(leaderboard).sort((a, b) => b[1] - a[1]) as [key, value]}
          <li class="leaderboard-item">
            <p style="font-weight: 600;">{getCoolSpecieName(key)}</p>
            <p>{value} {value > 1 ? "kills" : "kill"}</p>
          </li>
        {/each}
      </ul>
    {/if}
  </div>
</div>

<style>
  .leaderboard-bg {
    height: 85vh;
    width: 20vw;
    background-color: rgba(128, 128, 128, 0.178);
    border-radius: 20px;
    margin-top: 4%;
    /* margin-bottom: 4%; */
    margin-right: 4%;
  }

  .leaderboard-header {
    background-color: white;
    text-align: center;
    padding-top: 5px;
    padding-bottom: 5px;
    margin-bottom: 0px;
    color: black;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    /* margin-bottom: 1rem; */
    font-size: 1.5rem;
  }

  .leaderboard-list {
    max-height: 75vh;
    overflow-y: auto; /* Enable vertical scrolling */
    list-style: none;
    padding: 0;
  }

  .leaderboard-item {
    display: flex;
    border-bottom: 1px solid #ccc;
    padding-inline: 20px;
    justify-content: space-between;
  }

  .loader {
    width: 50px;
    aspect-ratio: 1;
    animation: l13-0 2s linear infinite;
  }
  .loader::before,
  .loader::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: radial-gradient(at 30% 30%, #0000, #000a) white;
    animation: l13-1 0.5s cubic-bezier(0.5, -500, 0.5, 500) infinite;
  }
  .loader::after {
    animation-delay: -0.15s;
  }
  @keyframes l13-0 {
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes l13-1 {
    100% {
      transform: translate(0.5px);
    }
  }
</style>
