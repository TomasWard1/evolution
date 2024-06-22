<script>
  import { Specie } from "./components/Specie";
  import Scroller from "@sveltejs/svelte-scroller";
  import { onMount } from "svelte";
  import * as d3 from "d3";
  import Characters from "./components/CharacterProfile.svelte";
  import VerticalProgressBar from "./components/VerticalProgressBar.svelte";

  /* Variables para la data del medallero */
  let species = [];
  let selectedSpecie;

  /* Variables para el scroller*/
  let count;
  let index;
  let offset;
  let progress;
  let top = 0.1;
  let threshold = 0.5;
  let bottom = 0.9;

  onMount(() => {
    d3.csv("./data/evolution_average.csv", d3.autoType).then((data) => {
      const speciesList = [];

      // Map the data to instances of the Specie class
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
        speciesList.push(specie);
      });

      // Now speciesList contains a list of Specie objects
      console.log(speciesList);
      species = speciesList;
      selectedSpecie = species[0];
      console.log(selectedSpecie);
    });
  });

  $: {
    // Es un observer que se ejecuta cuando cambia el valor de index
    selectedSpecie = species[index];
    console.log(selectedSpecie);
  }

  function startGame(event) {
    event.preventDefault();
    const anchor = document.getElementById("game-anchor");
    window.scrollTo({
      top: anchor.offsetTop,
      behavior: "smooth",
    });
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
  <div class="landing column">
    <img
      src="images/evolution.gif"
      alt="Evolution Gif"
      style="width: 40vw; height: auto; margin-top: 10%;"
    />
    <h1 style="text-align: center; width:100vw;">Evolution: The Game</h1>

    <button on:click={exploreCharacters}>Explore Characters</button>
  </div>

  <!-- {#if progress < 1}
  <DebugScroller
    index={index}
    count={count}
    offset={offset}
    progress={progress}
  />
  {/if}  -->
  <!-- Primer scroller -->

  <div id="start-anchor"></div>
  <!-- <VerticalProgressBar></VerticalProgressBar> -->
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
      <Characters {progress} specie={selectedSpecie}></Characters>
    </div>
    <div slot="foreground" class="foreground_container">
      <section class="step_foreground">
        <div class="epi_foreground"></div>
      </section>
      <section class="step_foreground">
        <div class="epi_foreground"></div>
      </section>
      <section class="step_foreground">
        <div class="epi_foreground"></div>
      </section>
      <section class="step_foreground">
        <div class="epi_foreground"></div>
      </section>
      <section class="step_foreground">
        <div class="epi_foreground"></div>
      </section>
      <section class="step_foreground">
        <div class="epi_foreground"></div>
      </section>
      <section class="step_foreground">
        <div class="epi_foreground"></div>
      </section>
      <section class="step_foreground">
        <div class="epi_foreground"></div>
      </section>
      <section class="step_foreground">
        <div class="epi_foreground"></div>
      </section>
      <section class="step_foreground">
        <div class="epi_foreground"></div>
      </section>
      <section class="step_foreground">
        <div class="epi_foreground"></div>
      </section>
    </div></Scroller
  >
  <div id="game-anchor"></div>
  <div class="landing column">
    <img
      src="images/evolution.gif"
      alt="Evolution Gif"
      style="width: 40vw; height: auto; top: 100px;"
    />
    <h1 style="text-align: center; width:100vw;">Choose</h1>
    <button on:click={startGame}>Play</button>
  </div>
  <!-- Segundo scroller -->
  <!-- <Scroller
    top={top2}
    threshold={threshold2}
    bottom={bottom2}
    bind:count={count2}
    bind:index={index2}
    bind:offset={offset2}
    bind:progress={progress2}
  >
    <div slot="background" class="image_container">
      <img src="/images/{charts[index2]}" alt="chart {index2}" class="charts"
      />
    </div>
    <div slot="foreground" class="foreground_container">
      <section class="step_foreground">
        <div class="epi_foreground">
          <h3>Seccion {index2 + 1}</h3>
          <p>Gráfico 1</p>
        </div>
      </section>
      <section class="step_foreground">
        <div class="epi_foreground">
          <h3>Seccion {index2 + 1}</h3>
          <p>Gráfico 1</p>
        </div>
      </section>
      <section class="step_foreground">
        <div class="epi_foreground">
          <h3>Seccion {index2 + 1}</h3>
          <p>Gráfico 1</p>
        </div>
      </section>
    </div>
  </Scroller> -->
</main>

<style>
  .landing {
    height: 100vh;
    display: flex;
  }

  /* Estilos para el scroller */
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
