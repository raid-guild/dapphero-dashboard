import styled from 'styled-components'
import { media } from './Breakpoints'
import { colors } from './Theme'

export const Label = styled.label`
    color: ${colors.black2};
    font-family: 'Nunito Sans', sans-serif;
    font-size: 1.6rem;
    font-weight: 500;
    letter-spacing: 1px;
    line-height: 22px;
    margin-bottom: 1rem;
    transition: all .3s ease;

    ${media.small`
        font-size: 2rem;
    `}

    ${media.medium`
        font-size: 1.8rem;
    `}

    ${media.large`
        font-size: 1.4rem;
    `}
`

export const Input = styled.input`
    background: ${colors.grey};
    border: none;
    border-radius: 5px;
    color: ${colors.grey2};
    font-family: 'Nunito Sans', sans-serif;
    font-size: 1.6rem;
    font-weight: 600;
    height: 4rem;
    letter-spacing: 1px;
    line-height: 22px;
    margin-bottom: 4rem;
    outline: none;
    padding: 0 2rem;
    transition: all .3s ease;
    width: 50%;

    &:hover,
    &:active,
    &:focus {
        background: rgba(115, 229, 182, .5);
        color: ${colors.black2};
    }

    ${media.small`
        font-size: 2rem;
    `}

    ${media.medium`
        font-size: 1.8rem;
    `}

    ${media.large`
        font-size: 1.4rem;
    `}
`
