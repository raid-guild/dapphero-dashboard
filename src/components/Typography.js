import styled, { css } from 'styled-components'
// import respondTo from '../components/Breakpoints'

export const H1 = styled.h1`
    color: '##252525';
    font-family: 'Nunito Sans', sans-serif;
    font-size: 3.4rem;
    font-weight: 800;

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