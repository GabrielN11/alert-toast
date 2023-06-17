export default class AlertModel{

    id: number;
    color: string;
    duration: number = 2000;
    text: string;

    constructor(
        id: number,
        color: string,
        text: string,
        duration?: number,
    ){
        this.id = id;
        this.color = color;
        this.text = text;
        if(duration) this.duration = duration

    }
}