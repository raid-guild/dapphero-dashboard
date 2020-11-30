import React from 'react'
import styled from 'styled-components'

// Components
import { colors } from './Theme'

const SpinnerTransaction: React.FC<any> = () => {
    return (
        <LDSRing><div></div><div></div><div></div><div></div></LDSRing>
    )
}

export default SpinnerTransaction

const LDSRing = styled.div`
    height: 2rem;
    margin: 0 auto;
    width: 2rem;
    z-index: 9;

    div {
        animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        border: 2px solid ${colors.white};
        border-color: ${colors.white} transparent transparent transparent;
        border-radius: 50%;
        box-sizing: border-box;
        display: block;
        height: 2rem;
        margin: 1px auto;
        position: absolute;
        width: 2rem;
    }
    div:nth-child(1) {
        animation-delay: -0.45s;
    }
    div:nth-child(2) {
        animation-delay: -0.3s;
    }
    div:nth-child(3) {
        animation-delay: -0.15s;
    }
    @keyframes lds-ring {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
    }
`
