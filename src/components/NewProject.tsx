import React from 'react'
import styled from 'styled-components'
import useProjects from '../hooks/useProjects'

// Components
import { colors } from '../components/Theme'
import { ButtonAction } from '../components/Buttons'
import { Card, CardContainer, Main } from './Containers'
import { H3 } from '../components/Typography'
import { NetworkType } from '../../smartweave/interfaces'

const testProject = {
    name: 'Test 1',
    description: 'This is test 1',
    coverImg: 'Test 1 image',
    network: 'rinkeby' as NetworkType,
    contracts: ['Test contract'],
    creator: '',
    createdAt: '',
    updatedAt: '',
    isPaused: false,
    isLocked: false,
}

const Projects: React.FC<any> = ({
    wallet
}) => {
    const { addProject } = useProjects(wallet)

    const onAddNewProject = () => {
        addProject(testProject)
        .then(id => console.log(id))
    }
    
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
            
            <ButtonAction onClick={onAddNewProject}>Save</ButtonAction>
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
