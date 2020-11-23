import React from 'react'
import styled from 'styled-components'

// Components
import { H1 } from './Typography'
import { ButtonHeader } from './Buttons'

const Header: React.FC<any> = ({
    hash,
    setHash,
}) => {
    return (
        <HeaderContainer>
			<H1>{hash === '' ? 'Projects' : hash.charAt(0).toUpperCase() + hash.slice(1)}</H1>
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
