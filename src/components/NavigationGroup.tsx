import React from 'react'
import styled from 'styled-components'

// Components
import { H2 } from '../components/Typography'

const NavigationGroup: React.FC<any> = ({
    iconAltText,
    iconURL,
    title,
}) => {
    return (
        <NavigationGroupContainer>
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

const NavigationGroupContainer = styled.div`
    align-items: center;
    display: flex;
    height: 6rem;
    justify-content: flex-start;
    width: 100%;

    &:hover {
        cursor: pointer;
        fill: #48bb78;

        h2 {
            color: #48bb78;
        }
    }
`

const SVGContainer = styled.div`
    height: 2.5rem;
    margin-left: 6rem;
    margin-right: 2rem;
    width: 2.5rem;
`

const SVG = styled.img`
    border-radius: 3px;
    display: block;
    height: 100%;
    margin: 0px;
    width: 100%;
`