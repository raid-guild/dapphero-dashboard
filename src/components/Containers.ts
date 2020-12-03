import styled, { css } from 'styled-components'
import { colors, shadows } from './Theme'

// Types
interface MainProps {
    background: string;
}

export const Card = styled.div`
    background: ${colors.white};
    border-radius: 10px;
    box-shadow: ${shadows.card};
    margin-bottom: 3rem;
    padding: 3rem 0;
`

export const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 3rem;
`

export const Main = styled.main<MainProps>`
	grid-column: 2 / -1;
    grid-row: 1 / -1;
    padding: 17rem 5rem 5rem;

    ${props => css`
        background: ${props.background};
    `}
`
