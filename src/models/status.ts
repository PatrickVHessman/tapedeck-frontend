import { TypeInteractionView } from "./elementalType";
import { MoveView } from "./moves";

export class Status {
    public id: number = 0;
    public name: string = "";
    public description: string = ""
    public hasDuration: boolean = false;
    public isBuff: boolean = false;
    public isDebuff: boolean = false;
    public isRemovable: boolean = false;
    public category: string = "";
    public key: string = "";
}

export class StatusView extends Status {
    public typeInteractions: TypeInteractionView[] = [];
    public associatedMoves: MoveView[] = [];
}