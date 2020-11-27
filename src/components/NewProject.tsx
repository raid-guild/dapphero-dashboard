import React from 'react'
import styled from 'styled-components'
import useProjects from '../hooks/useProjects'

// Components
import { ButtonAction } from '../components/Buttons'
import { Card, CardContainer, Main } from './Containers'
import { Label, Input } from './Form'
import { NetworkType } from '../../smartweave/interfaces'
import { colors } from '../components/Theme'
import { H3 } from '../components/Typography'

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
    displayProject,
    wallet,
}) => {
    const { addProject, updateProject } = useProjects(wallet)
    const [newProject, setNewProject] = React.useState(displayProject)

    // const onAddNewProject = () => {
    //     addProject(testProject)
    //     .then(id => console.log(id))
    // }

    const onUpdateProject = () => {
        if (displayProject === newProject) {
            console.log('Nothing happened!')
        } else {
            updateProject(displayProject.id, newProject)
            .then(id => console.log(id))
        }
    }

    const handleOnChange = (e: any) => {
        e.persist()
        setNewProject((prev: any) => ({
            ...prev,
            [e.target.id]: e.target.value
        }))
    }
    
    return (
        <Main background={colors.grey}>
            <Card>
                <CardContainer>
                    <H3>Basic Information</H3>
                </CardContainer>
                <Line />
                <CardContainer>
                    <Label htmlFor="name">Name</Label>
                    <Input
                        id='name'
                        onChange={handleOnChange}
                        required
                        value={newProject.name}
                    />
                </CardContainer>
                <CardContainer>
                    <H3>Cover Image (coming soon)</H3>
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
            
            <ButtonAction onClick={onUpdateProject}>Save</ButtonAction>
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
