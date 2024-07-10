<script>
  import { armySpecieStore } from "../stores";
  import * as d3 from "d3";

  $: armySpecie = $armySpecieStore;
</script>

<div class="landing column" style="justify-content: center; height: 100vh;">
  <img
    src="images/americanFlag.png"
    alt="Flag"
    class="float"
    style="width: auto; height: 40vh;"
  />
  <h1 style="margin-block-end: -30px;">You saved the country!</h1>
  <div style="width: 30%;">
    <p style="text-align: center;">
      Thanks to your heroic efforts, the {armySpecie.name} army we created neutralized
      Russia and all our enemies. We can once again be at peace. Salutations, soldier!
    </p>
  </div>
</div>
