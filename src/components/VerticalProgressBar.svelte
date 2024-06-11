<script>
  // Define variables
  let elSet = 5;
  let elCount = elSet * 2;
</script>

<div class="bar">
  {#each Array(elSet) as _, index}
    <input class="bar-input" type="radio" name="input" id={"input_" + index} />
    <div class="bar-view">
      <label class="bar-button" for={"input_" + index}></label>
    </div>
  {/each}
</div>

<div class="command">Click on any one of the options</div>

<style>
  /* Define variables */
  :root {
    --orange: #fe9000;
    --orange-light: #ffb732;
    --yellow: #ffdd4a;
    --blue-light: #5adbff;
    --blue: #3c6997;
    --bounce: cubic-bezier(0, 0, 0, 1.97);
    --smooth: cubic-bezier(0, 0.72, 0.58, 1);
  }

  /* Main container */
  .bar {
    display: flex;
    flex-direction: row-reverse;
    margin: auto;
    width: 300px;
    max-width: calc(100% - 30px);
  }

  /* Input elements */
  .bar-input {
    opacity: 0;
    pointer-events: none;
    position: absolute;
    top: -9999px;
    left: -9999px;
  }

  .bar-input:checked ~ .bar-view:after {
    transform: scaleX(1);
  }

  /* View elements */
  .bar-view {
    display: flex;
    flex-grow: 1;
    position: relative;
  }

  .bar-view:after {
    height: 2px;
    top: calc(50% - 1px);
    transition: transform 0.06s var(--smooth);
    transform: scaleX(0);
    background: var(--orange-light);
    transform-origin: left;
    z-index: 1;
  }

  .bar-view:not(:last-child):before,
  .bar-view:not(:last-child):after {
    content: "";
    width: calc(100% - 24px);
    position: absolute;
    right: calc(50% + 12px);
  }

  .bar-view:not(:last-child):before {
    height: 6px;
    top: calc(50% - 3px);
    background: var(--blue);
  }

  /* Button elements */
  .bar-button {
    display: block;
    width: 30px;
    height: 30px;
    margin: auto;
    border-radius: 50%;
    border: 3px solid var(--blue);
    position: relative;
    cursor: pointer;
    box-shadow:
      inset 2px 2px 4px rgba(0, 0, 0, 0.3),
      2px 2px 8px rgba(0, 0, 0, 0.1);
  }

  .bar-button:hover:after {
    transform: none;
    opacity: 1;
  }

  .bar-button:before,
  .bar-button:after {
    content: "";
    position: absolute;
    pointer-events: none;
  }

  .bar-button:before {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: radial-gradient(circle at center, var(--yellow), var(--orange));
    transform: scale(0.3);
    opacity: 0;
    transition:
      transform 0.2s var(--smooth),
      opacity 0.2s var(--smooth);
  }

  .bar-button:after {
    border: 8px solid transparent;
    border-top-color: var(--blue-light);
    bottom: calc(100% + 10px);
    left: calc(50% - 8px);
    transform: translateY(-10px);
    opacity: 0;
    transition:
      transform 0.2s var(--bounce),
      opacity 0.2s var(--bounce);
  }

  /* Command styling */
  .command {
    font-family: "Ubuntu Mono", monospace;
    letter-spacing: 1px;
    margin: 30px auto auto;
    animation: fade 1s ease infinite;
  }

  /* Global styles */
  html,
  body {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: linear-gradient(
      to bottom right,
      transparentize(var(--yellow), 0.9),
      #fff
    );
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  /* Keyframes */
  @keyframes bouncing {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(5px);
    }
  }

  @keyframes fade {
    50% {
      opacity: 0.3;
    }
  }
</style>
