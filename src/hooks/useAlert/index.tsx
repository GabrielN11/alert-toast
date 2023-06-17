import React from 'react'
import { position } from '../../model/alert-model';
import { AlertEventModel } from '../../model/event-model';

interface useAlertModel {
    displayAlert: (text: string,
        type: 'success' | 'error' | 'danger',
        duration?: number,
        position?: position) => void;
    displayCustomAlert: (text: string,
        color: string,
        duration?: number,
        position?: position) => void;
}

export const useAlert = (): useAlertModel => {
    const dispatchAlert = React.useCallback((text: string,
        color: string,
        duration?: number,
        position?: position,
        custom?: boolean) => {

        const id = Math.random() * (1000 - 1) + 1
        
        dispatchEvent(new CustomEvent('@displayAlert', {
            detail: new AlertEventModel(id, text, color, duration, position, custom)
        }))

    }, [])

    const displayAlert = React.useCallback((text: string,
        type: 'success' | 'error' | 'danger',
        duration?: number,
        position?: position) => {
        dispatchAlert(text, type, duration, position)
    }, [])

    const displayCustomAlert = React.useCallback((text: string,
        color: string,
        duration?: number,
        position?: position) => {
        dispatchAlert(text, color, duration, position, true)
    }, [])
    return { displayAlert, displayCustomAlert }
}