import React from 'react'
import styled from 'styled-components'
import useProjects from '../hooks/useProjects'

// Components
import { colors } from '../components/Theme'
import { ButtonAction } from '../components/Buttons'
import { Card, CardContainer, Main } from './Containers'
import { H3 } from '../components/Typography'

const Projects: React.FC<any> = () => {
    const { projects } = useProjects()
    
    return (
        <Main background={colors.grey}>
            <Card>
                <CardContainer>
                    <H3>Basic Information</H3>
                </CardContainer>
                <Line />
                <CardContainer>
                    <H3>Cover Image</H3>
                </CardContainer>
                <Line />
            </Card>

            <Card>
                <CardContainer>
                    <H3>Networds and Contracts</H3>
                </CardContainer>
                <Line />
            </Card>

            <Card>
                <CardContainer>
                    <H3>Project Script Tag</H3>
                </CardContainer>
                <Line />
            </Card>

            <Card>
                <CardContainer>
                    <H3>Status</H3>
                </CardContainer>
                <Line />
            </Card>
            
            <ButtonAction>Save</ButtonAction>
        </Main>
    )
}

export default Projects

const Line = styled.hr`
    border-bottom: 1px solid ${colors.grey};
    opacity: .15;
    width: 100%;
    padding-bottom: 5rem;
`
