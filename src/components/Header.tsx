import React from 'react'
import styled from 'styled-components'

// Components
import { ButtonLink } from './Buttons'
import { colors, shadows } from './Theme'
import { H1 } from './Typography'

const Header: React.FC<any> = ({
    router,
}) => {
    return (
        <HeaderContainer>
			<H1>{router === '' ? 'Projects' : router.charAt(0).toUpperCase() + router.slice(1)}</H1>
            <a href="https://docs.dapphero.io/" target="_blank" rel="noreferrer">
                <ButtonLink>Documentation</ButtonLink>
            </a>
        </HeaderContainer>
    )
}

export default Header

const HeaderContainer = styled.div`
    background: ${colors.white};
    box-shadow: ${shadows.card};
    display: flex;
    grid-column: 2 / -1;
    grid-row: 1 / 2;
    justify-content: space-between;
    position: sticky;
    padding: 4rem 5rem;
    top: 0;
    z-index: 98;
`
