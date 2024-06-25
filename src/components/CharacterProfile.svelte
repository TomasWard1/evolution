<script>
  import * as d3 from "d3";
  export let specie;
  import RadarChart from "./RadarChart.svelte";

  //d3 Scales
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

  let timeScale = d3.scaleLinear().domain([0.5, 4.4]).range([1, 10]);
  let cranialCapacityScale = d3
    .scaleLinear()
    .domain([300, 1236])
    .range([1, 10]);
  let heightScale = d3.scaleLinear().domain([110, 170]).range([1, 10]);

  function calculateStrength(height, cranialCapacity, hipStructure) {
    // Normalize each variable between 0 and 1
    const normalizedHeight = height / 170; // Assuming maximum height is 170 (Homo Sapiens)
    const normalizedCranialCapacity = cranialCapacity / 1236; // Maximum cranial capacity (Homo Sapiens)
    const normalizedHipStructure = hipStructure === "big" ? 1 : 0; // Assuming 'big' hip structure indicates more strength

    // Calculate strength score based on the weighted sum of normalized variables
    const strengthScore =
      normalizedHeight * 0.4 +
      normalizedCranialCapacity * 0.4 +
      normalizedHipStructure * 0.2;

    // Convert strength score to a number between 1 and 100
    return Math.round(strengthScore * 100);
  }

  // Function to calculate Agility
  function calculateAgility(height, incisorSize, canineSize) {
    // Normalize each variable between 0 and 1
    const normalizedHeight = height / 170; // Assuming maximum height is 170 (Homo Sapiens)
    const normalizedIncisorSize = incisorSize === "small" ? 1 : 0; // Assuming 'small' incisor indicates more agility
    const normalizedCanineSize = canineSize === "small" ? 1 : 0; // Assuming 'small' canine indicates more agility

    // Calculate agility score based on the weighted sum of normalized variables
    const agilityScore =
      normalizedHeight * 0.4 +
      normalizedIncisorSize * 0.3 +
      normalizedCanineSize * 0.3;

    // Convert agility score to a number between 1 and 100
    return Math.round(agilityScore * 100);
  }

  // Function to calculate Intelligence
  function calculateIntelligence(cranialCapacity, technoType) {
    // Normalize cranial capacity between 0 and 1
    const normalizedCranialCapacity = cranialCapacity / 1236; // Maximum cranial capacity (Homo Sapiens)

    // Convert technoType to a binary value (primitive: 0, modern: 1)
    const normalizedTechnoType = technoType === "modern" ? 1 : 0;

    // Calculate intelligence score based on the weighted sum of normalized variables
    const intelligenceScore =
      normalizedCranialCapacity * 0.7 + normalizedTechnoType * 0.3;

    // Convert intelligence score to a number between 1 and 100
    return Math.round(intelligenceScore * 100);
  }
</script>

{#if specie != undefined}
   <!-- TODO Add chips with metadata -->
  <div class="row" style="align-items: start;">
    <div class="column" style="align-items: start;">
      <div class="specie-details">
        <h2>{getCoolSpecieName(specie.id.toString())}</h2>
        <p>Strength</p>
        <div class="progress">
          <!-- Use inline style to dynamically set width based on progress -->
          <div
            class="progress-value"
            style="--width:{calculateStrength(
              specie.height,
              specie.cranialCapacity,
              specie.hip
            )}%"
          ></div>
        </div>
        <p>Inteligence</p>
        <div class="progress">
          <!-- Use inline style to dynamically set width based on progress -->
          <div
            class="progress-value"
            style="--width:{calculateIntelligence(
              specie.cranialCapacity,
              specie.tecnoType
            )}%"
          ></div>
        </div>
        <p>Agility</p>
        <div class="progress">
          <!-- Use inline style to dynamically set width based on progress -->
          <div
            class="progress-value"
            style="--width:{calculateAgility(
              specie.height,
              specie.incisorSize,
              specie.canineSize
            )}%"
          ></div>
        </div>
        <div class="center" style="margin-top: 13%;">
          <img src="images/{specie.id}radar.png" alt="avatar" style="width: 19vw;" />
        </div>
      
        <!-- <div
          style="width: 100%px; height:300px;"
        >
          <RadarChart
            data={[
              {
                name: coolName,
                height: heightScale(specie.height),
                cranial_capacity: cranialCapacityScale(specie.cranialCapacity),
                time: timeScale(specie.time),
              },
            ]}
          ></RadarChart>
        </div> -->
      </div>
    </div>
  
    <img
      src="images/{specie.id}.png"
      alt="avatar"
      class="float"
      style="width: auto; height: 80vh;"
    />
  </div>
{/if}

<style>

  .float {
    transform: translatey(0px);
	  animation: float 1s ease-in-out infinite;
  }
  .progress {
    background: rgba(255, 255, 255, 0.1);
    justify-content: flex-start;
    border-radius: 100px;
    align-items: center;
    margin-bottom: 30px;
    position: relative;
    display: flex;
    height: 5px;
    width: 500px;
  }

  .progress-value {
    animation: load 3s normal forwards;
    box-shadow: 0 10px 40px -10px #fff;
    border-radius: 100px;
    background: #fff;
    height: 5px;
  }

  @keyframes load {
    0% {
      width: 0;
    }
    100% {
      width: var(--width);
    }
  }

  @keyframes float {
	0% {
		box-shadow: 0 5px 15px 0px rgba(0,0,0,0.6);
		transform: translatey(0px);
	}
	50% {
		box-shadow: 0 25px 15px 0px rgba(0,0,0,0.2);
		transform: translatey(-5px);
	}
	100% {
		box-shadow: 0 5px 15px 0px rgba(0,0,0,0.6);
		transform: translatey(0px);
	}
}
</style>
