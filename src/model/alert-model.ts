import { EnumAlertType } from "./enum/enum-alert-type";

export default class AlertModel{

    id: number;
    color: string;
    duration: number;
    text: string;
    type: EnumAlertType;

    constructor(
        id: number,
        color: string,
        duration: number,
        text: string,
        type: EnumAlertType,
    ){
        this.id = id;
        this.color = color;
        this.duration = duration;
        this.text = text;
        this.type = type;

    }
}