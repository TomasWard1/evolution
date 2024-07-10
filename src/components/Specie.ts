// Specie.ts

export class Specie {
    id: number;
    name: string;
    time: number;
    strength: number;
    intelligence: number;
    agility: number;
    location: string;
    currentCountry: string;
    cranialCapacity: number;
    height: number;
    incisorSize: string;
    prognathism: string;
    foramenMagnumPosition: string;
    canineSize: string;
    caninesShape: string;
    toothEnamel: string;
    tecno: string;
    tecnoType: string;
    diet: string;
    hip: string;

    constructor(
        id: number,
        name: string,
        time: number,
        location: string,
       
        currentCountry: string,
        cranialCapacity: number,
        height: number,
        incisorSize: string,
        prognathism: string,
        foramenMagnumPosition: string,
        canineSize: string,
        caninesShape: string,
        toothEnamel: string,
        tecno: string,
        tecnoType: string,
        diet: string,
        hip: string,
        strength: number,
        intelligence: number,
        agility: number,
    ) {
        this.id = id;
        this.name = name;
        this.time = time;
        this.location = location;
        this.currentCountry = currentCountry;
        this.cranialCapacity = cranialCapacity;
        this.height = height;
        this.incisorSize = incisorSize;
        this.prognathism = prognathism;
        this.foramenMagnumPosition = foramenMagnumPosition;
        this.canineSize = canineSize;
        this.caninesShape = caninesShape;
        this.toothEnamel = toothEnamel;
        this.tecno = tecno;
        this.tecnoType = tecnoType;
        this.diet = diet;
        this.hip = hip;
        this.strength = this.calculateStrength();
        this.agility = this.calculateAgility();
        this.intelligence = this.calculateIntelligence();
    }

    private calculateStrength() {
        const normalizedHeight = this.height / 170;
        const normalizedCranialCapacity = this.cranialCapacity / 1236;
        const normalizedHipStructure = this.hip === "big" ? 1 : 0;
    
        const strengthScore =
          normalizedHeight * 0.4 +
          normalizedCranialCapacity * 0.4 +
          normalizedHipStructure * 0.2;
    
        return Math.round(strengthScore * 100);
      }
    
      private calculateAgility() {
        const normalizedHeight = this.height / 170;
        const normalizedIncisorSize = this.incisorSize === "small" ? 1 : 0;
        const normalizedCanineSize = this.canineSize === "small" ? 1 : 0;
    
        const agilityScore =
          normalizedHeight * 0.4 +
          normalizedIncisorSize * 0.3 +
          normalizedCanineSize * 0.3;
    
        return Math.round(agilityScore * 100);
      }
    
      private calculateIntelligence() {
        const normalizedCranialCapacity = this.cranialCapacity / 1236;
        const normalizedTechnoType = this.tecnoType === "modern" ? 1 : 0;
    
        const intelligenceScore =
          normalizedCranialCapacity * 0.7 + normalizedTechnoType * 0.3;
    
        return Math.round(intelligenceScore * 100);
      }

}
