<script>
  import Scroller from "@sveltejs/svelte-scroller";
  import { onMount } from "svelte";
  import * as d3 from "d3";

  import Characters from "./components/CharacterProfile.svelte";
  import DebugScroller from "./components/DebugScroller.svelte";

  /* Variables para la data del medallero */
  let deportistas = [];
  let filteredDeportistas = [];

  /* Variables para el scroller1 */
  let count;
  let index;
  let offset;
  let progress;
  let top = 0.1;
  let threshold = 0.5;
  let bottom = 0.9;

  /* Variables para el scroller 2 */
  let count2;
  let index2;
  let offset2;
  let progress2;
  let top2 = 0.1;
  let threshold2 = 0.5;
  let bottom2 = 0.9;

  /* Charts */
  let charts = {
    0: "lines_01.png",
    1: "lines_02.png",
    2: "lines_03.png",
  };

  onMount(() => {
    d3.csv("./data/deportistas.csv", d3.autoType).then((data) => {
      deportistas = data;
      filteredDeportistas = deportistas;
    });
  });

  $: {
    // Es un observer que se ejecuta cuando cambia el valor de index
    switch (index) {
      case 0:
        filteredDeportistas = deportistas;
        break;
      case 1:
        filteredDeportistas = deportistas.filter((d) => d.genero === "F");
        break;
      case 2:
        filteredDeportistas = deportistas.filter((d) => d.genero === "M");
        break;
      case 3:
        filteredDeportistas = deportistas.filter(
          (d) => d.continente === "América"
        );
        break;
      default:
        filteredDeportistas = deportistas;
    }
    console.log(filteredDeportistas);
  }

  function startGame(event) {
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
      style="width: 40vw; height: auto; top: 100px;"
    />
    <h1 style="text-align: center; width:100vw;">Evolution: The Game</h1>
    <button on:click={startGame}>Explore Characters</button>
  </div>

  <!-- {#if progress < 1}
  <DebugScroller
    index={index}
    count={count}
    offset={offset}
    progress={progress}
  />
  {/if} -->
  <!-- Primer scroller -->

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
      <Characters></Characters>
    </div>
    <div slot="foreground" class="foreground_container">
      <section class="step_foreground">
        <div class="epi_foreground">
          <h3>Choose your Character</h3>
        </div>
      </section>
      <section class="step_foreground">
        <div class="epi_foreground">
          <h3>Choose your Character</h3>
        </div>
      </section>
      <section class="step_foreground">
        <div class="epi_foreground">
          <h3>Choose your Character</h3>
        </div>
      </section>
      <section class="step_foreground">
        <div class="epi_foreground">
          <h3>Choose your Character</h3>
        </div>
      </section>
    </div>
  </Scroller>

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
    align-items: center;
    display: flex;
    justify-content: center;
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
