export class Color {
    public r: number = 0;
    public g: number = 0;
    public b: number = 0;
}

export interface SwapColorsRgba {
    r8: number
    g8: number
    b8: number
    a8: number
    h: number
    s: number
    v: number
    luminance: number
}

export class DrawParams {
    public sx: number = 0;
    public sy: number = 0;
    public swidth: number = 0;
    public sheight: number= 0;
    public dx: number = 0;
    public dy: number = 0;
    public dwidth: number = 0;
    public dheight: number = 0;
    public path: string = "";
    public name: string = "";
}