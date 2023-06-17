import React from 'react'
import { WarningBox, Warning, WarningBar } from './styles'
import AlertModel from '../../model/alert-model'

interface AlertProps{
    alerts: AlertModel[];
}

const Alert = ({alerts}: AlertProps) => {

    if(alerts.length === 0) return null
    return (
        <WarningBox>
            {alerts.map(item => (
                <div key={item.id}>
                    <Warning color={item.color}>{item.text}</Warning>
                    <WarningBar color={item.color} time={item.duration}/>
                </div>
            ))}
        </WarningBox>
    )
}

export default Alert