import React from 'react'
import styled from 'styled-components'

// Components
import { H1 } from './Typography'
import { ButtonHeader } from './Buttons'

const Header: React.FC<any> = ({
    page,
}) => {
    return (
        <HeaderContainer>
			<H1 center={true} uppercase={false}>{page === '' ? 'Projects' : page.charAt(0).toUpperCase() + page.slice(1)}</H1>
            <a href="https://docs.dapphero.io/" target="_blank" rel="noreferrer">
                <ButtonHeader>Documentation</ButtonHeader>
            </a>
        </HeaderContainer>
    )
}

export default Header

const HeaderContainer = styled.div`
    display: flex;
    grid-column: 2 / -1;
    grid-row: 1 / 2;
    justify-content: space-between;
    padding: 4rem 5rem;
`
