import React from 'react'
import styled from 'styled-components'
import useProjects from '../hooks/useProjects'

// Components
import { ButtonAction } from '../components/Buttons'
import { Card, CardContainer, Main } from './Containers'
import { Label, Input, Select, TextArea } from './Form'
import { colors } from '../components/Theme'
import { H3, P1 } from '../components/Typography'

const Projects: React.FC<any> = ({
    displayProject,
    wallet,
}) => {
    const { addProject, updateProject } = useProjects(wallet)
    const [ isNew, setIsNew ] = React.useState(false)
    const [newProject, setNewProject] = React.useState(displayProject)

    const onAddNewProject = () => {
        addProject(newProject)
        .then(id => console.log(id))
    }

    React.useEffect(() => {
        if (newProject.id === undefined) {
            setIsNew(true)
        }
    }, [newProject])

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
        console.log(newProject)
    }
    
    return (
        <Main background={colors.grey}>
            <Card>
                <CardContainer>
                    <H3>Basic Information</H3>
                </CardContainer>
                <Line />
                <CardContainer>
                    <Label htmlFor="name">Name:</Label>
                    <Input
                        id='name'
                        onChange={handleOnChange}
                        required
                        value={newProject.name}
                    />
                    <Label htmlFor="description">Description:</Label>
                    <TextArea
                        id='description'
                        onChange={handleOnChange}
                        required
                        value={newProject.description}
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
                <CardContainer>
                    <P1 color={colors.grey2}>Select a network for your project, followed by one or more smart contracts deployed on that network.</P1>
                    <br/>
                    <Label htmlFor="network">Select a project network:</Label>
                    <Select defaultValue={newProject.network} onChange={handleOnChange} name="network" id="network">
                        <option value="">choose an option</option>
                        <option value="rinkeby">rinkeby</option>
                        <option value="mainnet">mainnet</option>
                        <option value="kovan">kovan</option>
                        <option value="goerli">goerli</option>
                        <option value="ropsten">ropsten</option>
                        <option value="xDai">xDai</option>
                        <option value="maticMumbaiTestnet">maticMumbaiTestnet</option>
                    </Select>
                </CardContainer>
            </Card>

            <Card>
                <CardContainer>
                    <H3>Project Script Tag</H3>
                </CardContainer>
                <Line />
                <CardContainer>
                    <P1 color={colors.grey2}>Copy and paste this into your HTML. <a
                        href={'https://docs.dapphero.io/'}
                        style={{textDecoration: 'none', color: colors.green}}
                        target="_blank"
                        rel="noreferrer"
                    >Check Docs.</a></P1>
                </CardContainer>
            </Card>

            <Card>
                <CardContainer>
                    <H3>Status</H3>
                </CardContainer>
                <Line />
            </Card>
            
            <ButtonAction onClick={!isNew ? onUpdateProject : onAddNewProject}>Save</ButtonAction>
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
