import styled, { css } from 'styled-components'
import { media } from './Breakpoints'


interface H1Props {
    center: boolean,
    uppercase: boolean
}

export const H1 = styled.h1<H1Props>`
    color: '##252525';
    font-family: 'Nunito Sans', sans-serif;
    font-size: 3.4rem;
    font-weight: 800;
    transform: all .3s ease;

    ${props => props.center && css`
        text-align: center;
    `}

    ${props => props.uppercase && css`
        text-transform: uppercase;
    `}

    ${props => css`
        color: ${props.color}
    `}
`

export const H2 = styled.h2`
    color: #6b6b6bd9;
    font-family: 'Nunito Sans', sans-serif;
    font-size: 1.8rem;
    font-weight: 500;
    transition: all .3s ease;

    ${media.small`
        font-size: 2rem;
    `}

    ${media.medium`
        font-size: 2.4rem;
    `}

    ${media.large`
        font-size: 3rem;
    `}
`

export const H3 = styled.h3`
    color: #a0aec0;
    font-family: 'Nunito Sans', sans-serif;
    font-size: 1.8rem;
    font-weight: 500;
    transition: all .3s ease;
    letter-spacing: 1px;
    line-height: 22px;

    ${media.small`
        font-size: 2rem;
    `}

    ${media.medium`
        font-size: 1.8rem;
    `}

    ${media.large`
        font-size: 1.8rem;
    `}
`
