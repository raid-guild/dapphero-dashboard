import styled, { css } from 'styled-components'
// import respondTo from '../components/Breakpoints'

export const H1 = styled.h1`
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
    font-size: 2.4rem;
    font-weight: 500;
    transition: all .3s ease;
`