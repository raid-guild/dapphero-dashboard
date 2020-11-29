import React from 'react'

// Hooks
import useContracts from '../hooks/useContracts'
import useProjects from '../hooks/useProjects'

// Components
import { ButtonAction1, ButtonAction2, ButtonsContainer1, ButtonsContainer2 } from './Buttons'
import { Card, CardContainer, Main } from './Containers'
import { Label, Input, InputCopy, Select, TextArea } from './Form'
import Line from './Line'
import Spinner from './Spinner'
import { Table, TableBodyCell, TableBodyRow, Dot} from './Table'
import { colors } from './Theme'
import { H3, P1, P2 } from './Typography'

const AddProject: React.FC<any> = ({
    contractsArray,
    displayProject,
    wallet,
}) => {
    const [ isCopied, setIsCopied ] = React.useState<boolean>(false)
    const [ isNew, setIsNew ] = React.useState<boolean>(false)
    const [ contractList, setContractList ] = React.useState<any[]>([])
    const [ contractsPending, setContractsPending ] = React.useState<boolean>(false)
    const [ newProject, setNewProject ] = React.useState(displayProject)

    // Hooks
    const { getContract } = useContracts(wallet)
    const { addProject, deleteProject, updateProject } = useProjects(wallet)

    React.useEffect(() => {
        if (newProject.id === undefined) {
            setIsNew(true)
        }

    }, [newProject])

    React.useEffect(() => {
        displayContracts()
    }, [])

    const onAddNewProject = async () => {
        console.log('Saving...')
        const id = await addProject(newProject)
        console.log(id)
    }

    const onDeleteProject = async () => {
        console.log('Deleting...')
        const id = await deleteProject(newProject.id)
        console.log(id)
    }

    const onUpdateProject = async () => {
        console.log('Updating...')
        if (displayProject === newProject) {
            console.log('Nothing happened!')
        } else {
            const id = await updateProject(displayProject.id, newProject)
            console.log(id)
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

    const onAddContract = () => {
        let e = document.getElementById('contract') as HTMLInputElement

        if (e.value === '') {
            return
        }

        let newContractsArray = newProject.contracts
        newContractsArray.push(e.value)
        if (e !== null) {
            setNewProject((prev: any) => ({
                ...prev,
                contracts: newContractsArray
            }))
            displayContracts()
        }
    }

    const displayContracts = async () => {
        setContractsPending(true)
        let contractsListArray: any[] = []

        for (let i=0; i < newProject.contracts.length; i++) {
            await getContract(newProject.contracts[i])
            .then(contract => {
                let addContractId: any = contract
                addContractId.id = newProject.contracts[i]
                contractsListArray.push(addContractId)
            })
        }

        setContractList(contractsListArray)
        setContractsPending(false)

        return
    }

    const onRemoveContract = async (index: string | number) => {
        let newArray = newProject.contracts
        newArray.splice(index, 1)
        console.log('deleting')
        setNewProject((prev: any) => ({
            ...prev,
            contracts: newArray
        }))

        displayContracts()
    }
    
    return (
        <>
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
                        <H3>Networks and Contracts</H3>
                    </CardContainer>
                    <Line />
                    <CardContainer>
                        <P1 color={colors.grey2}>Select a network for your project, followed by one or more smart contracts deployed on that network.</P1>
                        <br/>
                        <Label htmlFor="network">Select a project Network:</Label>
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
                        <P2 style={{marginTop: '-2rem'}} color={colors.grey2}>A project can have only one network.</P2>
                        <br />
                        <br />
                        <Label htmlFor="contract">Add Smart Contract:</Label>
                        <Select onChange={handleOnChange} name="contract" id="contract">
                            <option value={''}>choose an option</option>
                            {newProject.network !== '' && contractsArray.filter((contract: { network: any }) => contract.network === newProject.network).map((contract: any, index: any) => {
                                return <option key={index} value={contract.id}>{contract.name}</option>
                            })}
                        </Select>
                        <ButtonAction1 onClick={onAddContract}>Add +</ButtonAction1>
                        <br />
                        <P2 color={colors.grey2}>Remember contracts must be deployed on the selected network above.</P2>
                        <br />
                            <Table>
                                <tbody>
                                {contractsArray.map((contract: any, index: string | number) => {
                                    return (
                                        <TableBodyRow key={index}>
                                            <TableBodyCell>
                                                <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}>
                                                    <Dot />
                                                    <P1 color={colors.black2}>{contract.name}</P1>
                                                </div>
                                            </TableBodyCell>
                                            <TableBodyCell>
                                                <P1 color={colors.green}>{contract.deployedAddress.slice(0, 10)}...</P1>
                                            </TableBodyCell>
                                            <TableBodyCell onClick={onRemoveContract.bind(this, index)}>
                                                <P1 color={colors.red}>Delete</P1>
                                            </TableBodyCell>
                                        </TableBodyRow>
                                    )
                                })}

                            </tbody>
                        </Table>
                        {contractsPending && <Spinner />}
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
                        <ButtonAction1 onClick={onCopy}>{!isCopied ? 'Copy' : 'Copied!'}</ButtonAction1>
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
                    <ButtonAction1 onClick={!isNew ? onUpdateProject : onAddNewProject}>Save</ButtonAction1>
                    {!isNew && (!newProject.isPaused && <ButtonAction1 color={colors.red} onClick={onDeleteProject}>Delete</ButtonAction1>)}
                </ButtonsContainer2>
            </Main>
        </>
    )
}

export default AddProject

