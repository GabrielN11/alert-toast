
import styled, {keyframes} from "styled-components";
import AnimationTimeProps from "../../model/animation-time-props";
import { position } from "../../model/alert-model";

interface WarningBoxProps{
    position: position;
}

const timer = keyframes`
to{
    width: 0px;
}
`

export const WarningBox = styled.div`
    position: fixed;
    top: ${({position}: WarningBoxProps) => position.includes('top') ? '50px' : 'unset'};
    bottom: ${({position}: WarningBoxProps) => position.includes('bottom') ? '50px' : 'unset'};
    right: ${({position}: WarningBoxProps) => position.includes('right') ? '25px' : 'unset'};
    left: ${({position}: WarningBoxProps) => position.includes('left') ? '25px' : position.includes('center') ? '50%' : 'unset'};
    transform: ${({position}: WarningBoxProps) => position.includes('center') ? 'translateX(-50%)' : 'unset'};
    display: flex;
    flex-direction: column-reverse;
    width: fit-content;
    z-index: 15;
    @media(max-width: 500px){
        right: 10px;
    }
`

export const Warning = styled.div`
    background-color: ${({color}) => color};
    padding: 10px 20px;
    color: #fff;
    margin-top: 10px;
    border-radius: 5px 5px 0px 0px;
    user-select: none;
`

export const WarningBar = styled.div`
    height: 5px;
    background-color: ${({color}) => color};
    opacity: .5;
    width: 100%;
    animation: ${timer} ${({time}: AnimationTimeProps) => time}ms forwards ease-out;
`