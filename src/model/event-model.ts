import { AlertModel, position } from "./alert-model";

export class AlertEventModel extends AlertModel {
    custom?: boolean;

    constructor(
        id: number,
        text: string,
        color: string,
        duration?: number,
        position?: position,
        custom?: boolean,
    ) {
        super(id, color, text, duration, position)
        this.custom = custom;
    }
}