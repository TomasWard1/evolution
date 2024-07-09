<script>
  import { onMount } from "svelte";
  import Picker from "./PickCharacter.svelte";
  import { chosenSpecie1, chosenSpecie2 } from "../stores";
  export let species;
  export let getCoolSpecieName;
  let fightLoading = false;
  let leaderboardMap = {};

  let s1;
  let s2;

  onMount(() => {
    chosenSpecie1.set(species[0]);
    chosenSpecie2.set(species[1]);

    chosenSpecie1.subscribe((value) => {
      s1 = value;
      console.log("chosenspeci1 changed", value);
    });
    chosenSpecie2.subscribe((value) => {
      s2 = value;
      console.log("chosenspeci2 changed", value);
    });
  });

  function simulateFight() {
    fightLoading = true;

    setTimeout(() => {
      fightLoading = false;

      // Calculate the sum of attributes for both species
      const total1 = s1.strength + s1.intelligence + s1.agility;
      const total2 = s2.strength + s2.intelligence + s2.agility;

      // Determine the winner
      let winner = total1 > total2 ? s1 : s2;

      console.log(
        `${getCoolSpecieName(s1.id)}: ${total1}, ${getCoolSpecieName(s2.id)}: ${total2}, Winner: ${getCoolSpecieName(winner.id)}`
      );

      // Add 1 point to the leaderboard for the winner
      leaderboardMap[getCoolSpecieName(winner.id)] =
        (leaderboardMap[getCoolSpecieName(winner.id)] || 0) + 1;
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
        {/if}
      </div>
      <div style="width: 50px;"></div>
      <Picker {species} {getCoolSpecieName} playerNum="2" {fightLoading} />
    </div>
  </div>
  <div class="leaderboard-bg">
    <h2 class="leaderboard-header">KillBoard</h2>
    {#if Object.keys(leaderboardMap).length === 0}
      <p style="font-size: 14px; color:gray; text-align: center;">
        No data. Start a fight!
      </p>
    {:else}
      <ul class="leaderboard-list">
        {#each Object.entries(leaderboardMap).sort((a, b) => b[1] - a[1]) as [key, value]}
          <li class="leaderboard-item">
            <p style="font-weight: 600;">{key}</p>
            <p>{value} {value > 1 ? "kills" : "kill"}</p>
          </li>
        {/each}
      </ul>
    {/if}
  </div>
</div>
<div id="snackbar">Some text some message..</div>

<style>
  #snackbar {
    visibility: hidden; /* Hidden by default. Visible on click */
    min-width: 250px; /* Set a default minimum width */
    margin-left: -125px; /* Divide value of min-width by 2 */
    background-color: #333; /* Black background color */
    color: #fff; /* White text color */
    text-align: center; /* Centered text */
    border-radius: 2px; /* Rounded borders */
    padding: 16px; /* Padding */
    position: fixed; /* Sit on top of the screen */
    z-index: 1; /* Add a z-index if needed */
    left: 50%; /* Center the snackbar */
    bottom: 30px; /* 30px from the bottom */
  }

  /* Show the snackbar when clicking on a button (class added with JavaScript) */
  #snackbar.show {
    visibility: visible; /* Show the snackbar */
    /* Add animation: Take 0.5 seconds to fade in and out the snackbar.
  However, delay the fade out process for 2.5 seconds */
    -webkit-animation:
      fadein 0.5s,
      fadeout 0.5s 2.5s;
    animation:
      fadein 0.5s,
      fadeout 0.5s 2.5s;
  }

  /* Animations to fade the snackbar in and out */
  @-webkit-keyframes fadein {
    from {
      bottom: 0;
      opacity: 0;
    }
    to {
      bottom: 30px;
      opacity: 1;
    }
  }

  @keyframes fadein {
    from {
      bottom: 0;
      opacity: 0;
    }
    to {
      bottom: 30px;
      opacity: 1;
    }
  }

  @-webkit-keyframes fadeout {
    from {
      bottom: 30px;
      opacity: 1;
    }
    to {
      bottom: 0;
      opacity: 0;
    }
  }

  @keyframes fadeout {
    from {
      bottom: 30px;
      opacity: 1;
    }
    to {
      bottom: 0;
      opacity: 0;
    }
  }
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
