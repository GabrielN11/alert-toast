import React, { useEffect } from 'react'
import AlertModel from '../../model/alert-model'

interface useAlertModel {
    alerts: AlertModel[];
    displayAlert: (text: string,
        type: 'success' | 'error' | 'danger',
        duration?: number) => void;
    displayCustomAlert: (text: string,
        color: string,
        duration?: number) => void;
}

class EventModel extends AlertModel{
    custom?: boolean;

    constructor(
        text: string,
        color: string,
        duration?: number,
        custom?: boolean,
    ){
        super(0, color, text, duration)
        this.custom = custom;
    }
}

export const useAlert = (): useAlertModel => {
    const [alerts, setAlerts] = React.useState<AlertModel[]>([])
    const timeout = React.useRef<NodeJS.Timeout>()

    const dispatchAlert = React.useCallback((event: Event) => {
        const ev = event as CustomEvent<EventModel>
        const { color, text, duration, custom } = ev.detail

        const id = Math.random() * (1000 - 1) + 1

        const pickColor = (type: 'success' | 'error' | 'danger') => {
            switch (type) {
                case 'success':
                    return '#28a745'
                case 'error':
                    return '#cc6600'
                default:
                    return '#dc3545'
            }
        }

        const hexColor = custom ? color : pickColor(color as 'success' | 'error' | 'danger')

        const removeAlert = (list: AlertModel[]) => {
            const newArr = list.filter((item) => item.id !== id)
            return newArr
        }

        const addAlert = (list: AlertModel[]) => {
            const newArr = [...list, new AlertModel(id, hexColor, text, duration)]
            return newArr
        }

        setAlerts(addAlert)
        timeout.current = setTimeout(() => {
            setAlerts(removeAlert)
        }, duration)
    }, [])

    const displayAlert = React.useCallback((text: string,
        type: 'success' | 'error' | 'danger',
        duration?: number) => {
        dispatchEvent(new CustomEvent<EventModel>('@displayAlert', {
            detail: new EventModel(text, type, duration)
        }))
    }, [])

    const displayCustomAlert = React.useCallback((text: string,
        color: string,
        duration?: number) => {
        dispatchEvent(new CustomEvent<EventModel>('@displayAlert', {
            detail: new EventModel(text, color, duration, true)
        }))
    }, [])

    useEffect(() => {
        window.addEventListener('@displayAlert', dispatchAlert)

        return () => {
            window.removeEventListener('@displayAlert', dispatchAlert)
            clearTimeout(timeout.current)
        }
    }, [])

    return { alerts, displayAlert, displayCustomAlert }
}