import React from 'react'
import styled from 'styled-components'
import useProjects from '../hooks/useProjects'

// Components
import { ButtonAction, ButtonAction2 } from '../components/Buttons'
import { Card, CardContainer, Main } from './Containers'
import { Label, Input, InputCopy, Select, TextArea } from './Form'
import { colors } from '../components/Theme'
import { H3, P1 } from '../components/Typography'

const NewProjects: React.FC<any> = ({
    displayProject,
    wallet,
}) => {
    const { addProject, deleteProject, updateProject } = useProjects(wallet)
    const [ isCopied, setIsCopied ] = React.useState(false)
    const [ isNew, setIsNew ] = React.useState(false)
    const [newProject, setNewProject] = React.useState(displayProject)

    React.useEffect(() => {
        if (newProject.id === undefined) {
            setIsNew(true)
        }
    }, [newProject])

    const onAddNewProject = () => {
        addProject(newProject)
        .then(id => console.log(id))
    }

    const onDeleteProject = () => {
        deleteProject(newProject.id)
        .then(id => console.log(id))
    }

    const onUpdateProject = () => {
        if (displayProject === newProject) {
            console.log('Nothing happened!')
        } else {
            updateProject(displayProject.id, newProject)
            .then(id => console.log(id))
        }
    }

    const handleOnChange = (e: any) => {
        if (newProject.isLocked) {
            return
        }
        
        e.persist()
        setNewProject((prev: any) => ({
            ...prev,
            [e.target.id]: e.target.value
        }))
        console.log(newProject)
    }

    const onCopy = () => {
        let copyText = document.getElementById("script") as HTMLInputElement;

        if (copyText !== null) {
            copyText.select();
            copyText.setSelectionRange(0, 99999); /*For mobile devices*/
            document.execCommand("copy");
            setIsCopied(true)
        }
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
                {isNew
                ? (<CardContainer>
                    <P1 color={colors.grey2}>Save project to get script tag. <a
                        href={'https://docs.dapphero.io/'}
                        style={{textDecoration: 'none', color: colors.green}}
                        target="_blank"
                        rel="noreferrer"
                    >Check Docs.</a></P1>
                    <br/>
                </CardContainer>)
                : (<CardContainer>
                    <P1 color={colors.grey2}>Copy and paste this into your HTML. <a
                        href={'https://docs.dapphero.io/'}
                        style={{textDecoration: 'none', color: colors.green}}
                        target="_blank"
                        rel="noreferrer"
                    >Check Docs.</a></P1>
                    <br/>
                    <InputCopy
                        id='script'
                        required
                        value={`<script src="https://package.dapphero.io/main.js" id="dh-apiKey" data-api="${newProject.id}"></script>`}
                    />
                    <ButtonAction onClick={onCopy}>{!isCopied ? 'Copy' : 'Copied!'}</ButtonAction>
                </CardContainer>)}
            </Card>

            <Card>
                <CardContainer>
                    <H3>Status</H3>
                </CardContainer>
                <Line />
                <CardContainer>
                    <P1 color={colors.grey2}>Pause the DappHero engine on your site, or prevent accidental project deletion. <a
                        href={'https://docs.dapphero.io/'}
                        style={{textDecoration: 'none', color: colors.green}}
                        target="_blank"
                        rel="noreferrer"
                    >Check Docs.</a></P1>
                    <br/>

                    <ButtonsContainer1>
                        <ButtonAction2 color={newProject.isPaused} onClick={() => setNewProject((prev: any) => ({...prev, isPaused: !prev.isPaused}))}>{!newProject.isPaused ? 'Enabled' : 'Paused'}</ButtonAction2>
                        <ButtonAction2 color={newProject.isLocked} onClick={() => setNewProject((prev: any) => ({...prev, isLocked: !prev.isLocked}))}>{!newProject.isLocked ? 'Lock' : 'Locked'}</ButtonAction2>
                    </ButtonsContainer1>
                </CardContainer>
            </Card>
            
            <ButtonsContainer2>
                <ButtonAction onClick={!isNew ? onUpdateProject : onAddNewProject}>Save</ButtonAction>
                {!isNew && (!newProject.isPaused && <ButtonAction color={colors.red} onClick={onDeleteProject}>Delete</ButtonAction>)}
            </ButtonsContainer2>
        </Main>
    )
}

export default NewProjects

const Line = styled.hr`
    border-bottom: 1px solid ${colors.grey};
    opacity: .15;
    width: 100%;
    padding-bottom: 5rem;
`

const ButtonsContainer1 = styled.div`
    display: flex;
    justify-content: space-between;
    width: 22rem;
`

const ButtonsContainer2 = styled.div`
    display: flex;
    justify-content: space-between;
    width: 28rem;
`
