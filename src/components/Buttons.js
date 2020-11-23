import styled from 'styled-components'
import { colors, shadows } from '../components/Theme'

export const ButtonHeader = styled.button`
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