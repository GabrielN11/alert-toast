import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { WarningBox, Warning, WarningBar } from './styles'
import { AlertModel, position } from '../../model/alert-model'
import { AlertEventModel } from '../../model/event-model';

interface AlertProps {
    defaultPosition?: position;
    successColor?: string;
    errorColor?: string;
    dangerColor?: string;
}

export const Alert = (
    {
        defaultPosition = 'bottom-right',
        successColor = '#28a745',
        dangerColor = '#cc6600',
        errorColor = '#dc3545'

    }: AlertProps
) => {

    const [alerts, setAlerts] = useState<AlertModel[]>([])

    const timeout = React.useRef<NodeJS.Timeout>()

    const manageAlerts = useCallback((e: Event) => {
        const { detail } = e as CustomEvent<AlertEventModel>;

        const pickColor = (type: 'success' | 'error' | 'danger') => {
            switch (type) {
                case 'success':
                    return successColor
                case 'error':
                    return errorColor
                default:
                    return dangerColor
            }
        }

        const hexColor = detail.custom ? detail.color : pickColor(detail.color as 'success' | 'error' | 'danger')

        detail.color = hexColor

        if (!detail.position) {
            detail.position = defaultPosition
        }

        const removeAlert = (list: AlertModel[]) => {
            const newArr = list.filter((item) => item.id !== detail.id)
            return newArr
        }

        const addAlert = (list: AlertModel[]) => {
            const newArr = [...list, detail]
            return newArr
        }

        setAlerts(addAlert)
        timeout.current = setTimeout(() => {
            setAlerts(removeAlert)
        }, detail.duration)
    }, [setAlerts])

    useEffect(() => {
        window.addEventListener('@displayAlert', manageAlerts)
    }, [manageAlerts])

    const position = useMemo<position>(() => {
        if (alerts[alerts.length - 1]) {
            return alerts[alerts.length - 1].position!
        }

        return defaultPosition
    }, [alerts])

    if (alerts.length === 0) return null
    return (
        <WarningBox position={position}>
            {alerts.map(item => (
                <div key={item.id}>
                    <Warning color={item.color}>{item.text}</Warning>
                    <WarningBar color={item.color} time={item.duration} />
                </div>
            ))}
        </WarningBox>
    )
}