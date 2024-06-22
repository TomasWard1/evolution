<script>
  export let circleCount = 5;

  function handleHover(index) {
    console.log(`Hovered over circle ${index}`);
  }

  function handleClick(index) {
    console.log(`Clicked circle ${index}`);
  }
</script>

<div class="container">
  <div class="line"></div>
  {#each Array(circleCount) as _, index}
    <button class="circle" on:mouseover={() => handleHover(index)} on:click={() => handleClick(index)}></button>
  {/each}
</div>

<style>
  .container {
    z-index: 1000000;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: -webkit-sticky; /* For Safari */
    position: sticky;
    top: 20px; /* Adjust as needed */
  }

  .line {
    width: 4px;
    background-color: #ccc;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }

  .circle {
    width: 40px;
    height: 40px;
    background-color: #3c6997;
    border-radius: 50%;
    margin: 20px 0;
    position: relative;
    z-index: 1;
    overflow: hidden;
    border: none;
    cursor: pointer;
    transition:
      background-color 0.3s ease,
      transform 0.3s ease;
  }

  .circle:hover {
    background-color: #5adbff;
    transform: scale(1.2);
  }

  .circle::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle at center, #ffdd4a, #fe9000);
    border-radius: 50%;
    transform: translate(-50%, -50%) scale(0);
    opacity: 0;
    transition:
      transform 0.3s ease,
      opacity 0.3s ease;
  }

  .circle:hover::before {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
</style>
