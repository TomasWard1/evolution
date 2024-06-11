<script lang="ts">
  import * as d3 from "d3";
  import type { Specie } from "./Specie";
  import VerticalProgressBar from "./VerticalProgressBar.svelte";

  export let specie: Specie | null = null;
  console.log(specie);
  export let progress;

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

    function calculateStrength(height, cranialCapacity, hipStructure) {
    // Normalize each variable between 0 and 1
    const normalizedHeight = height / 170; // Assuming maximum height is 170 (Homo Sapiens)
    const normalizedCranialCapacity = cranialCapacity / 1236; // Maximum cranial capacity (Homo Sapiens)
    const normalizedHipStructure = (hipStructure === 'big' ? 1 : 0); // Assuming 'big' hip structure indicates more strength
    
    // Calculate strength score based on the weighted sum of normalized variables
    const strengthScore = (normalizedHeight * 0.4) + (normalizedCranialCapacity * 0.4) + (normalizedHipStructure * 0.2);
    
    // Convert strength score to a number between 1 and 100
    return Math.round(strengthScore * 100);
}

// Function to calculate Agility
function calculateAgility(height, incisorSize, canineSize) {
    // Normalize each variable between 0 and 1
    const normalizedHeight = height / 170; // Assuming maximum height is 170 (Homo Sapiens)
    const normalizedIncisorSize = (incisorSize === 'small' ? 1 : 0); // Assuming 'small' incisor indicates more agility
    const normalizedCanineSize = (canineSize === 'small' ? 1 : 0); // Assuming 'small' canine indicates more agility
    
    // Calculate agility score based on the weighted sum of normalized variables
    const agilityScore = (normalizedHeight * 0.4) + (normalizedIncisorSize * 0.3) + (normalizedCanineSize * 0.3);
    
    // Convert agility score to a number between 1 and 100
    return Math.round(agilityScore * 100);
}

// Function to calculate Intelligence
function calculateIntelligence(cranialCapacity, technoType) {
    // Normalize cranial capacity between 0 and 1
    const normalizedCranialCapacity = cranialCapacity / 1236; // Maximum cranial capacity (Homo Sapiens)
    
    // Convert technoType to a binary value (primitive: 0, modern: 1)
    const normalizedTechnoType = (technoType === 'modern' ? 1 : 0);
    
    // Calculate intelligence score based on the weighted sum of normalized variables
    const intelligenceScore = (normalizedCranialCapacity * 0.7) + (normalizedTechnoType * 0.3);
    
    // Convert intelligence score to a number between 1 and 100
    return Math.round(intelligenceScore * 100);
}

</script>

{#if specie}
  <div class="row">
    <div class="background">
      <div class="row">
        <div class="column">
          <div class="specie-details">
            <h2>{getCoolSpecieName(specie.id.toString())}</h2>
            <p>Strength</p>
            <div class="progress">
                <!-- Use inline style to dynamically set width based on progress -->
                <div class="progress-value" style="--width:{calculateStrength(specie.height, specie.cranialCapacity, specie.hip)}%"></div>
              </div>
            <p>Inteligence</p>
            <div class="progress">
                <!-- Use inline style to dynamically set width based on progress -->
                <div class="progress-value" style="--width:{calculateIntelligence(specie.cranialCapacity, specie.tecnoType)}%"></div>
              </div>
            <p>Agility</p>
            <div class="progress">
                <!-- Use inline style to dynamically set width based on progress -->
                <div class="progress-value" style="--width:{calculateAgility(specie.height, specie.incisorSize, specie.canineSize)}%"></div>
              </div>
          </div>
        </div>
        <img
          src="images/{specie.id}.png"
          alt="avatar"
          style="width: auto; height: 60vh;"
        />
      </div>
    </div>
    <VerticalProgressBar></VerticalProgressBar>
  </div>
{/if}

<style>
  .background {
    width: 75%;
    /* height: 50%; */
    background: rgba(255, 255, 255, 0.2);
    margin-left: 60px;
    border-radius: 15px; /* Rounded corners */
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1); /* Shiny shadow effect */
    backdrop-filter: blur(10px); /* Glass effect */
    -webkit-backdrop-filter: blur(10px); /* For Safari support */
    border: 1px solid rgba(255, 255, 255, 0.3);
  }

  .progress {
    background: rgba(255, 255, 255, 0.1);
    justify-content: flex-start;
    border-radius: 100px;
    align-items: center;
    position: relative;
    display: flex;
    height: 20px;
    width: 500px;
  }

  .progress-value {
    animation: load 3s normal forwards;
    box-shadow: 0 10px 40px -10px #fff;
    border-radius: 100px;
    background: #fff;
    height: 25px;
  }

  @keyframes load {
    0% {
      width: 0;
    }
    100% {
      width: var(--width);
    }
  }
</style>
