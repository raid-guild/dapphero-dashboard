import React from 'react'
import styled from 'styled-components'
import { media } from '../components/Breakpoints'

// Components
import NavigationGroup from './NavigationGroup'
import { colors } from './Theme'

const Navigation: React.FC<any> = ({
    router,
    setRouter,
}) => {
    return (
        <NavigationContainer>
            <LogoContainer onClick={() => setRouter('projects')}>
                <LogoImage alt="DappHero Logo" src="https://arweave.net/AZMyGTPMuq5A-iqGGz87rLRM7oXxE8nBymprqmWUh48" />
            </LogoContainer>
            <NavigationGroup
                iconAltText="Projects"
                iconURL={'https://arweave.net/y--LjDmE8Ixh07sj0Hmy0rrZqX5EFrAk9BKQyMEt0a8'}
                router={router}
                setRouter={setRouter}
                title={"Projects"}
            />
            <NavigationGroup
                iconAltText="Contracts"
                iconURL={'https://arweave.net/9ayl_-SzNbM-eAZEyre-CuQpKN7d37U4yf32IfjHF60'}
                router={router}
                setRouter={setRouter}
                title={"Contracts"}
            />
        </NavigationContainer>
    )
}

export default Navigation

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

    animation-name: fade;
    animation-duration: 2s;
    animation-iteration-count: 1;

    @keyframes fade {
        0% {
            opacity: 0;
        }

        100% {
            opacity: 1;
        }
    }
`

const NavigationContainer = styled.div`
    align-items: center;
    background: ${colors.white};
    border-right: 2px solid rgb(235, 239, 245);
    display: flex;
    flex-direction: column;
    grid-column: 1 / 2;
    gird-row: 1 / -1;
    height: 100vh;
    left: 0;
    position: fixed;
    top: 0;
    width: 25rem;
    z-index: 99;

    ${media.medium`
        width: 30rem;
    `}
`
