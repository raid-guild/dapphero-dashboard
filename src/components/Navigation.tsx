import React from 'react'
import styled from 'styled-components'

const Navigation = () => {
    return (
        <NavigationContainer>
            <LogoContainer>
                <LogoImage alt="" src="https://arweave.net/Se6yGCl5B03DxosnMjmhA1eoOwsIO0bsHaGIJmr7N5Y" />
            </LogoContainer>
            {/* <NavigationGroup>Projects</NavigationGroup> */}
        </NavigationContainer>
    )
}

export default Navigation

const NavigationContainer = styled.div`
    align-items: center;
    border-right: 2px solid rgb(235, 239, 245);
    display: flex;
    flex-direction: column;
    grid-column: 1 / 2;
    gird-row: 1 / -1;
    height: 90vh;
`

const LogoContainer = styled.div`
    height: 15rem;
    margin-top: 3rem;
    width: 15rem;
`

const LogoImage = styled.img`
    border-radius: 3px;
    display: block;
    height: 100%;
    margin: 0px;
    width: 100%;
`

