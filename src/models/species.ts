import { MovesView } from "./moves";
import { DrawParams, SwapColorsRgba } from "./sprites";

export class Stats {
    public maxAp: number = 0;
    public maxHp: number = 0;
    public meleeAttack: number = 0;
    public meleeDefense: number = 0;
    public rangedAttack: number = 0;
    public rangedDefense: number = 0;
    public speed: number = 0;
    public recordRate: number = 0;
    public moveSlots: number = 0;
}

export class MonsterListItemClass  {
    public name: string = "";
    public key: string = "";
    public bestiaryIndex: number = 0;
    public elementalType:string = "Typeless"
    public description: string = "";
}

export class MoveMonsterListItem extends MonsterListItemClass {
    public sortCategory: number = 0;
}

export class Species {
    public id: number = 0;
    public key: string = "";
    public name: string = "";
    public description: string = "";
    public evolvesTo: EvolvesTo[] = [];
    public evolvesFrom: string[] = [];
    public bestiaryBios: string[] = [];
    public habitats: string[] = [];
    public moves: MovesView = new MovesView();
    public stats: Stats = new Stats();
    public bestiaryIndex: number = 0;
    public elementalType: string = "Typeless"
}

export interface EvolvesTo {
    evolvedForm: string;
    maxHour: number;
    minHour: number;
    requiredGrade: number;
    requiredLocation: null;
    requiredMove: null;
    requiredTypeOverride: null;
    specialization: null;
}

export class BootlegSpecies extends Species {
    public spriteWidth: number = 0;
    public spriteHeight: number = 0;
    public swapColorsRgba: SwapColorsRgba[] = [];
    public recolorsRgba: SwapColorsRgba[] = [];
    public spriteParams: DrawParams[] = [];
}