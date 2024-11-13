import { MoveView } from "./moves";
import { MoveMonsterListItem } from "./species";

export class TypeInteraction {
    public attacker: string = "";
    public defender: string = "";
    public hint: string = "";
    public message: string = "";
    public statuses: Status[] = [];
}

export class TypeInteractionView {
    public attacker: string = "";
    public defender: string = "";
    public name: string = "";
    public status: string = "";
    public duration: number = 0;
    public category: string = "";
    public statusKey: string = "";
}

export interface Status {
    name: string
    duration: number
}

export class ElementalTypeView {
    public inflicts: TypeInteractionView[] = [];
    public receives: TypeInteractionView[] = [];
    public name: string = "";
    public moves: MoveView[] = [];
    public monsters: MoveMonsterListItem[] = [];
}