<script>
  export let species;
  export let getCoolSpecieName;
  export let playerNum;
  export let fightLoading;
export let chosenSpecie;
</script>

{#if chosenSpecie != undefined}
  <div class="column">
    <img
      src="images/{chosenSpecie.id}.png"
      alt="avatar"
      class="float"
      style="width: auto; height: 50vh;"
    />
    <h2 style="text-align: center;   font-size: 50px;">Specie {playerNum}</h2>
    {#if !fightLoading}
    <div class="picker-container">
      <select class="picker" bind:value={chosenSpecie}>
        {#each species as sp}
          <option value={sp}>{getCoolSpecieName(sp.id)}</option>
        {/each}
      </select>
    </div>
    {/if}

  </div>
{/if}

<style>
  .picker {
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-family: "Open Sans";
    font-weight: 500;
    background-color: #1a1a1a;
    color: white;
    cursor: pointer;
    transition: border-color 0.25s;
    appearance: none; /* Remove default styling */
    -webkit-appearance: none; /* Safari and Chrome */
    -moz-appearance: none; /* Firefox */
    width: 220px;
  }

  .picker:hover {
    border-color: white;
    border-width: 3px;
  }

  .picker:focus,
  .picker:focus-visible {
    outline: 5px auto -webkit-focus-ring-color;
  }

  .picker-container {
    position: relative;
    display: inline-block;
 
  }

  .picker-container::after {
    content: "▼"; /* Add dropdown arrow */
    position: absolute;
    top: 50%;
    right: 1.2em;
    transform: translateY(-50%);
    pointer-events: none;
    color: white;
  }
</style>
