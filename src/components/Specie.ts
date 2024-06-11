// Specie.ts
export class Specie {
    id: number;
    name: string;
    time: number;
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
        hip: string
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
    }
}
