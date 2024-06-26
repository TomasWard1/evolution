<script>
  import { Specie } from "./components/Specie";
  import Scroller from "@sveltejs/svelte-scroller";
  import { onMount } from "svelte";
  import * as d3 from "d3";
  import Characters from "./components/CharacterProfile.svelte";
  import data from "../public/data/evolution_average.csv";
  import RadarChart from "./components/RadarChart.svelte";
  import Picker from "./components/PickCharacter.svelte";

  let species = [];

  data.forEach((d, i) => {
    const specie = new Specie(
      i,
      d.Genus_and_Specie,
      d.Time,
      d.Location,
      d.Current_Country,
      d.Cranial_Capacity,
      d.Height,
      d.Incisor_Size,
      d.Prognathism,
      d.Foramen_Mágnum_Position,
      d.Canine_Size,
      d.Canines_Shape,
      d.Tooth_Enamel,
      d.Tecno,
      d.Tecno_type,
      d.Diet,
      d.Hip
    );
    species.push(specie);
  });

  let selectedSpecie = species[0];
  let count;
  let index;
  let offset;
  let progress;
  let top = 0.1;
  let threshold = 0.5;
  let bottom = 0.9;

  let getCoolSpecieName = d3
    .scaleOrdinal()
    .domain(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"])
    .range([
      "ANAMENSIS",
      "RAMIDUS",
      "AFARENSIS",
      "AFRICANUS",
      "HABILIS",
      "RUDOLFENSIS",
      "GARHI",
      "ERGASTER",
      "ERECTUS",
      "SAPIENS",
      "NEANDERTHALENSIS",
    ]);

  $: {
    // Un observer que se ejecuta cuando cambia el valor de index
    selectedSpecie = species[index];
  }

  function startGame(event) {
    event.preventDefault();
    const anchor = document.getElementById("game-anchor");
    window.scrollTo({
      top: anchor.offsetTop,
      behavior: "smooth",
    });
  }

  let fightLoading = false;
  function simulateFight(event) {
    fightLoading = true;
    setTimeout(() => {
      fightLoading = false;
    }, 3000); // 3000 milliseconds = 3 seconds
  }

  function exploreCharacters(event) {
    event.preventDefault();
    const anchor = document.getElementById("start-anchor");
    window.scrollTo({
      top: anchor.offsetTop,
      behavior: "smooth",
    });
  }
</script>

<main>
  <div class="landing column" style="z-index: 4;">
    <img
      src="images/evolution.gif"
      alt="Evolution Gif"
      style="width: 40vw; height: auto; margin-top: 10%; z-index: 4;"
    />
    <h1 style="text-align: center; width:100vw; height: 10vh;">The game of evolution</h1>
    <p style="width: 45%; text-align: center;  margin-block-start: 0px;">
      It's the year 2789. The US government is preparing for war. They've
      discovered how to bring back one of our ancestor species to create an
      army. But which? This software is designed to compare and pick the best of
      our evolutionary species. The future of the United States is in your hands
      - choose wisely.
    </p>
    <button on:click={exploreCharacters}>Explore Characters</button>
  </div>

  <div id="start-anchor"></div>

  <Scroller
    {top}
    {threshold}
    {bottom}
    bind:count
    bind:index
    bind:offset
    bind:progress
  >
    <div slot="background">
      {#if selectedSpecie != undefined}
        <Characters specie={selectedSpecie} {getCoolSpecieName}></Characters>
      {/if}
    </div>
    <div slot="foreground" class="foreground_container">
      {#each Array.from({ length: 11 }, (_, i) => i) as item}
        <section class="step_foreground">
          <div class="epi_foreground"></div>
        </section>
      {/each}
    </div></Scroller
  >

  <div id="game-anchor"></div>
  <div class="landing column" style="justify-content: center;">
    <h1 style="text-align: center; width:100vw; margin-bottom: 30px;">
      {fightLoading ? "Simulating..." : "Choose your fighters"}
    </h1>
    <div class="row" style="margin-bottom: 40px;">
      <Picker {species} {getCoolSpecieName} playerNum="1" {fightLoading} />
      <div style="width: 50px;"></div>
      {#if fightLoading}
        <div class="loader" style="display: block; margin-bottom:30px"></div>
      {:else}
        <div class="column">
          <h1 style="text-align: center;">VS</h1>
          <button on:click={simulateFight}>FIGHT!</button>
        </div>
      {/if}
      <div style="width: 50px;"></div>

      <Picker {species} {getCoolSpecieName} playerNum="2" {fightLoading} />
    </div>
  </div>
</main>

<style>
  .blurred-background {
    position: relative;
    overflow: hidden;
    background-image: url("../images/jungle.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    filter: blur(5px);
    z-index: 0;
  }

  .content {
    position: relative;
    z-index: 10;
  }

  .landing {
    height: 100vh;
    display: flex;
  }

  .foreground_container {
    pointer-events: none;
    padding-left: 85%;
  }

  .step_foreground {
    display: flex;
    justify-content: end;
    align-items: center;
    height: 100vh;
    color: white;
    padding: 1em;
    margin: 0 0 2em 0;
  }
  .epi_foreground {
    padding: 20px;
    max-width: 150px;
  }
</style>
