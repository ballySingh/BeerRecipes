export interface Beer {
    id: number;
    name: string;
    tagline: string;
    first_brewed: string;
    description: string;
    image_url: string;
    abv: number;
    ibu: number;
    target_fg: number;
    target_og: number;
    ebc: number;
    srm: number;
    ph: number;
    attenuation_level: number;
    volume: Volume;
    boil_volume: Volume;
    method: MashTemp;
    ingredients: Ingredients;
    food_pairing: string[];
    brewers_tips: string;
    contributed_by: string;
}

export interface MashTemp {
    mash_temp: MashTempVal[];
    fermentation: FermentationTemp;
    twist: any;
}

export interface FermentationTemp {
    temp: Volume;
}

export interface MashTempVal {
    temp: Volume;
    duration: number;
}

export interface Ingredients {
    malt: Malt[];
    hops: Hops[];
    yeast: string;
}

export interface Hops {
    name: string;
    amount: Volume;
    add: string;
    attribute: string;
}

export interface Malt {
    name: string;
    amount: Volume;
}

export interface Volume {
    value: number;
    unit: string;
}
