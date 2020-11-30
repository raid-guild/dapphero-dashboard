import React from 'react'
import styled, { css } from 'styled-components'

// Components
import { colors } from '../components/Theme'
import { H2 } from '../components/Typography'

// Types
interface NavigationGroupContainerProps {
    active: boolean;
}

const NavigationGroup: React.FC<any> = ({
    iconAltText,
    iconURL,
    router,
    setRouter,
    title,
}) => {
    const [active, setActive] = React.useState(false)

    React.useEffect(() => {
        if (router === title.toLowerCase()) {
            setActive(true)
        } else {
            setActive(false)
        }

        return function cleanup() {
            return
        };
    }, [router, title])

    const onChangeRoute = () => {
        setRouter(title.toLowerCase())
    }

    return (
        <NavigationGroupContainer active={active} onClick={onChangeRoute}>
            <SVGContainer>
                <SVG
                    alt={iconAltText}
                    src={iconURL}
                />
            </SVGContainer>
            <H2>{title}</H2>
        </NavigationGroupContainer>
    )
}

export default NavigationGroup

const NavigationGroupContainer = styled.div<NavigationGroupContainerProps>`
    align-items: center;
    display: flex;
    height: 6rem;
    justify-content: flex-start;
    width: 100%;

    &:hover {
        cursor: pointer;

        h2 {
            color: ${colors.green};
        }
    }

    ${props => props.active && css`
        h2 {
            color: ${colors.green};
        }
    `}
`

const SVG = styled.img`
    border-radius: 3px;
    display: block;
    height: 100%;
    margin: 0px;
    width: 100%;
`

const SVGContainer = styled.div`
    height: 2.5rem;
    margin-left: 6rem;
    margin-right: 2rem;
    width: 2.5rem;
`
