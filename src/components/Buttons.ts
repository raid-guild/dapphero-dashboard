import styled from 'styled-components'
import { colors, shadows } from './Theme'

export const ButtonLink = styled.button`
    border: none;
    border-radius: 4px;
    color: #3c424f;
    font-family: 'Nunito Sans', sans-serif;
    font-size: 1.8rem;
    height: 5rem;
    transition: all .3s ease;
    width: 16rem;

    &:hover {
        box-shadow: ${shadows.card};
        color: ${colors.green};
        cursor: pointer;
    }
`

export const ButtonAction = styled.button`
    background: ${colors.green};
    border: none;
    border-radius: 4px;
    box-shadow: ${shadows.card};
    color: ${colors.white};
    font-family: 'Nunito Sans', sans-serif;
    font-size: 1.8rem;
    height: 4rem;
    transition: all .3s ease;
    width: 13rem;
    outline: none;

    &:hover {
        box-shadow: ${shadows.button};
        cursor: pointer;
    }

    &:active {
        box-shadow: ${shadows.card};
    }
`
