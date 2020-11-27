import styled, { css } from 'styled-components'
import { media } from './Breakpoints'

export const H1 = styled.h1`
    color: '##252525';
    font-family: 'Nunito Sans', sans-serif;
    font-size: 3.4rem;
    font-weight: 800;
    transform: all .3s ease;
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
        font-size: 2.2rem;
    `}

    ${media.large`
        font-size: 2.2rem;
    `}
`

export const H3 = styled.h3`
    color: #3c424f;
    font-family: 'Nunito Sans', sans-serif;
    font-size: 1.8rem;
    font-weight: 600;
    transition: all .3s ease;

    ${media.small`
        font-size: 2rem;
    `}

    ${media.medium`
        font-size: 2.2rem;
    `}

    ${media.large`
        font-size: 2.2rem;
        margin-bottom: 3rem;
    `}
`

export const H4 = styled.h4`
    color: #a0aec0;
    font-family: 'Nunito Sans', sans-serif;
    font-size: 1.8rem;
    font-weight: 500;
    letter-spacing: 1px;
    line-height: 22px;
    transition: all .3s ease;


    ${media.small`
        font-size: 2rem;
    `}

    ${media.medium`
        font-size: 1.8rem;
    `}

    ${media.large`
        font-size: 1.8rem;
        margin-bottom: 5rem;
    `}
`

export const H5 = styled.h5`
    color: #a0aec0;
    font-family: 'Nunito Sans', sans-serif;
    font-size: 1.8rem;
    font-weight: 500;
    letter-spacing: 1px;
    line-height: 22px;
    transition: all .3s ease;
    text-transform: uppercase;

    ${media.small`
        font-size: 2rem;
    `}

    ${media.medium`
        font-size: 1.8rem;
    `}

    ${media.large`
        font-size: 1.2rem;
    `}
`

export const P1 = styled.p`
    color: #3c4d4f;
    font-family: 'Roboto', sans-serif;
    font-size: 1.6rem;
    font-weight: 400;
    transition: all .3s ease;

    ${props => props.color && css`
        color: ${props.color};
    `}

    ${media.small`
        font-size: 2rem;
    `}

    ${media.medium`
        font-size: 1.6rem;
    `}

    ${media.large`
        font-size: 1.6rem;
    `}
`
