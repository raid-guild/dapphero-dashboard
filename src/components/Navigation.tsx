import React from 'react'
import styled from 'styled-components'

// Components
import NavigationGroup from './NavigationGroup'

const Navigation: React.FC<any> = ({
    setHash,
}) => {
    return (
        <NavigationContainer>
            <LogoContainer onClick={() => setHash('projects')}>
                <LogoImage alt="DappHero Logo" src="https://arweave.net/Se6yGCl5B03DxosnMjmhA1eoOwsIO0bsHaGIJmr7N5Y" />
            </LogoContainer>
            <NavigationGroup
                setHash={setHash}
                iconAltText="Projects"
                iconURL={'https://arweave.net/y--LjDmE8Ixh07sj0Hmy0rrZqX5EFrAk9BKQyMEt0a8'}
                title={"Projects"}
            />
            <NavigationGroup
                setHash={setHash}
                iconAltText="Contracts"
                iconURL={'https://arweave.net/9ayl_-SzNbM-eAZEyre-CuQpKN7d37U4yf32IfjHF60'}
                title={"Contracts"}
            />
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
    margin-bottom: 5rem;
    width: 15rem;

    &:hover {
        cursor: pointer;
    }
`

const LogoImage = styled.img`
    border-radius: 3px;
    display: block;
    height: 100%;
    margin: 0px;
    width: 100%;
`
