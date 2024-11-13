import { DrawParams, SwapColorsRgba } from "./sprites";
import { Stats } from './species';
import { MovesView } from "./moves";

export class Fusion
{
    public monsterName: string = "";
    public swapColorsRgba: SwapColorsRgba[] = [];
    public nodeFrames: NodeFrame[] = [];
    public spriteWidth: number = 0;
    public spriteHeight: number = 0;
    public elementalTypes: string[] = [];
    public fusionStats: Stats = new Stats();
    public moves: MovesView = new MovesView();
    public highlightBg: string = "linear-gradient(315deg, transparent 10px, #3fbb9f 2%, #3fbb9f 98%, transparent 10px)";
}

export class NodeFrame {
    public stackOrder: number = 0;
    public params: DrawParams[] = [];
}

export class DropdownMenuItem {
    public name?: string;
    public key?: string;
    public disabled?: boolean = false;
}

export class Frame {
    public height?: number
    public width?: number
    public x?: number
    public y?: number
}

export interface ImageObj {
    key: string;
    img: HTMLImageElement;
    frames: DrawParams[];
    stackOrder: number;
}
