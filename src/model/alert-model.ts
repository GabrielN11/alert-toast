export type position = 'top-right' | 'top-left' | 'top-center' |
                       'bottom-right' | 'bottom-left' | 'bottom-center'

export class AlertModel{

    id: number;
    color: string;
    duration: number = 2000;
    text: string;
    position?: position;

    constructor(
        id: number,
        color: string,
        text: string,
        duration?: number,
        position?: position,
    ){
        this.id = id;
        this.color = color;
        this.text = text;
        if(duration) this.duration = duration
        if(position) this.position = position

    }
}