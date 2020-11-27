import styled, { css } from 'styled-components'
import { colors, shadows } from './Theme'

// Types
interface MainProps {
    background: string;
}

export const Main = styled.main<MainProps>`
	grid-column: 2 / -1;
	grid-row: 2 / -1;
    padding: 5rem;

    ${props => css`
        background: ${props.background};
    `}
`

export const Card = styled.div`
    background: ${colors.white};
    border-radius: 10px;
    box-shadow: ${shadows.card};
    padding: 3rem 0;
    margin-bottom: 3rem;
`

export const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 3rem;
`
