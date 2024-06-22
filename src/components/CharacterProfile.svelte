<script>
  import * as d3 from "d3";
  export let specie;
  import { LayerCake, Svg } from "layercake";
  import { scaleLinear } from "d3-scale";
  import Radar from "../components/Radar.svelte";
  import AxisRadial from "./AxisRadial.svelte";

  let data = [
    {
      name: specie.name,
      time: specie.time,
      height: specie.height,
      cranialCapacity: specie.cranialCapacity
    },
  ];

  const seriesKey = "name";
  const xKey = ["time", "change", "slider", "cutter", "curve"];

  const seriesNames = Object.keys(data[0]).filter(
    (d) => d !== seriesKey
  );

  data.forEach((d) => {
    seriesNames.forEach((name) => {
      d[name] = +d[name];
    });
  });

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
{#if (specie != undefined)}
  <div class="background">
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
          <div class="chart-container">
            <LayerCake
              padding={{ top: 30, right: 0, bottom: 7, left: 0 }}
              x={xKey}
              xDomain={[0, 10]}
              xRange={({ height }) => [0, height / 2]}
              {data}
            >
              <Svg>
                <AxisRadial />
                <Radar />
              </Svg>
            </LayerCake>
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
{/if}
<style>
  .chart-container {
    width: 100%;
    height: 100%;
  }
  .background {
    align-items: center;
    justify-content: center;
    /* background: rgba(255, 255, 255, 0.2); */
    margin-left: 5%;
    margin-right: 5%;
    border-radius: 15px;
    /* box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1); */
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    /* border: 4px solid white */
  }

  .progress {
    background: rgba(255, 255, 255, 0.1);
    justify-content: flex-start;
    border-radius: 100px;
    align-items: center;
    margin-bottom: 30px;
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
