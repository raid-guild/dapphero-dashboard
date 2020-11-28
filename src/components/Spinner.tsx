import React from 'react'
import styled from 'styled-components'
import { media } from './Breakpoints'

// Components
import { colors } from './Theme'

const Spinner: React.FC<any> = () => {
    return (
        <LDSRing><div></div><div></div><div></div><div></div></LDSRing>
    )
}

export default Spinner

const LDSRing = styled.div`
    z-index: 1000;
    width: 4rem;
    height: 4rem;
    margin: 2rem auto;
    ${media.small`
        width: 7rem;
        height: 7rem;
    `}
    div {
        box-sizing: border-box;
        display: block;
        position: absolute;
        width: 3rem;
        height: 3rem;
        margin: 8px;
        border: 5px solid ${colors.green};
        border-radius: 50%;
        animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        border-color: ${colors.green} transparent transparent transparent;
        ${media.small`
            width: 5rem;
            height: 5rem;
        `}
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