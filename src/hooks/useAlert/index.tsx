import React, { useEffect } from 'react'
import { EnumAlertType } from '../../model/enum/enum-alert-type'
import AlertModel from '../../model/alert-model'

interface useAlertModel{
    alerts: AlertModel[];
    dispatchAlert: (text: string | undefined, type: EnumAlertType, duration?: number) => void;
}

export const useAlert = (): useAlertModel => {
    const [alerts, setAlerts] = React.useState<AlertModel[]>([])
    const timeout = React.useRef<NodeJS.Timeout>()

    const displayAlert = React.useCallback((event: Event) => {
        const ev = event as CustomEvent<AlertModel>
        const {type, text, duration} = ev.detail

        const id = Math.random() * (1000 - 1) + 1

        const pickColor = (type: EnumAlertType) => {
            switch(type){
                case EnumAlertType.SUCCESS:
                    return '#28a745'
                case EnumAlertType.DANGER:
                    return '#cc6600'
                case EnumAlertType.WARNING:
                    return '#dc3545'
                default:
                    return '#007bff'
            }
        }

        const color = pickColor(type)

        const removeAlert = (list: AlertModel[]) => {
            const newArr = list.filter((item) => item.id!== id)
            return newArr
        }

        const addAlert = (list: AlertModel[]) => {
            const newArr = [...list, new AlertModel(id, color, duration, text, type)]
            return newArr
        }

        setAlerts(addAlert)
        timeout.current = setTimeout(() => {
            setAlerts(removeAlert)
        }, duration)
    }, [])

    const dispatchAlert = React.useCallback((text: string = 'Alerta disparado.', type: EnumAlertType, duration=5000) => {
        dispatchEvent(new CustomEvent<AlertModel>('@displayAlert', {
            detail: new AlertModel(0, '', duration, text, type)
        }))
    }, [])

    useEffect(() => {
        window.addEventListener('@displayAlert', displayAlert)

        return () => {
            window.removeEventListener('@displayAlert', displayAlert)
            clearTimeout(timeout.current)
        }
    }, [])

    return {alerts, dispatchAlert}
}