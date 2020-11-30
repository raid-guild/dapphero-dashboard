import styled, { css } from 'styled-components'
import { colors, shadows } from './Theme'

// Types
interface ButtonAction2Props {
    active?: boolean;
}

export const ButtonAction1 = styled.button`
    background: ${colors.green};
    border: none;
    border-radius: 4px;
    box-shadow: ${shadows.card};
    color: ${colors.white};
    font-family: 'Nunito Sans', sans-serif;
    font-size: 1.8rem;
    height: 4rem;
    outline: none;
    transition: all .3s ease;
    width: 13rem;

    &:hover {
        box-shadow: ${shadows.button};
        cursor: pointer;
    }

    &:active {
        box-shadow: ${shadows.card};
    }

    ${props => props.color && css`
        background: ${props.color};
    `}
`

export const ButtonAction2 = styled.button<ButtonAction2Props>`
    background: ${colors.white};
    border: 1px solid ${colors.grey2};
    border-radius: 4px;
    color: ${colors.black2};
    font-family: 'Nunito Sans', sans-serif;
    font-size: 1.8rem;
    height: 4.5rem;
    outline: none;
    transition: all .3s ease;
    width: 10rem;

    &:hover {
        cursor: pointer;
    }

    ${props => props.active && css`
        background: ${colors.green};
        border: 1px solid transparent;
        color: ${colors.white};
    `}
`

export const ButtonsContainer1 = styled.div`
    display: flex;
    justify-content: space-between;
    width: 22rem;
`

export const ButtonsContainer2 = styled.div`
    display: flex;
    justify-content: space-between;
    width: 28rem;
`

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
