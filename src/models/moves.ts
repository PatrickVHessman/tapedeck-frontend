import { Status } from "./status";

export class MovePopoverView {
    public name: string = "";
    public description: string = "";
    public elementalType: string = "";
}

export class MovesView {
    public learnedMoves: MoveView[] = [];
    public stickerMoves: MoveView[] = [];
}

export interface MoveView {
    name: string
    key: string
    elementalType: string
    sortCategory: number
    moveCategory: string
    power: number
    accuracy: string
    apCost: number
    description: string
}

export class Move {
    public accuracy: string = "";
    public apCost: number = 0;
    public canBeCopied: boolean = true;
    public category: string = "";
    public critDamagePercent: number = 0;
    public critRate: number = 0;
    public defaultTarget: string = "";
    public description: string = "";
    public elementalType: string = "";
    public targetType: string = "";
    public passiveOnly: boolean = false;
    public maxHits: number = 0;
    public minHits: number = 0;
    public name: string = "";
    public key: string = "";
    public physicality: string = "";
    public power: number = 0;
    public priority: number = 0;
    public statusEffects?: (string)[] | null = [];
    public tags?: (string)[] | null = [];
    public statuses: Status[] = [];
}
