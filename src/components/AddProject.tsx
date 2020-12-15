import React from 'react'

// Components
import { ButtonAction1, ButtonAction2, ButtonsContainer1, ButtonsContainer2 } from './Buttons'
import { Card, CardContainer, Main } from './Containers'
import { Label, Input, InputCopy, Select, TextArea } from './Form'
import Line from './Line'
import ProjectContractsTable from './ProjectContractsTable'
import SpinnerTransaction from './SpinnerTransaction'
import { colors } from './Theme'
import { H3, P1, P2 } from './Typography'

// Consts
import { CORE_ADDRESS } from '../consts'

// Helpers
import generateHTML from '../html-generator/api/generate-html'

// Hooks
import useProjects from '../hooks/useProjects'

const AddProject: React.FC<any> = ({
    arweave,
    contractsArray,
    displayProject,
    onSnackbar,
    setRouter,
    subscribeToTransaction,
    wallet,
}) => {
    const [ newContract, setNewContract ] = React.useState<string>('')
    const [ contractList, setContractList ] = React.useState<any[]>([])
    const [ isCopied, setIsCopied ] = React.useState<boolean>(false)
    const [ isNew, setIsNew ] = React.useState<boolean>(false)
    const [ newProject, setNewProject ] = React.useState(displayProject)
    const [ pendingSave, setPendingSave ] = React.useState<boolean>(false)
    const [ pendingDelete, setPendingDelete ] = React.useState<boolean>(false)

    const [transactionId, setTransactionId] = React.useState('')

    // Hooks
    const { addProject, deleteProject, updateProject } = useProjects(wallet)

    // Determine whether the project is new or being updated
    React.useEffect(() => {
        if (newProject.id === undefined) {
            setIsNew(true)
        }

        let el = document.getElementById('top') as HTMLElement
        el.scrollIntoView({behavior: 'smooth', block: 'start'})
        return
        // eslint-disable-next-line
    }, [])

    // Get contracts to display
    const displayContracts = React.useCallback(
		async () => {
            let filteredContracts: any[] = []

            for (let i=0; i < newProject.contracts.length; i++) {
                let filtertedContract = contractsArray.find((contract: { id: string }) => contract.id === newProject.contracts[i])
                filteredContracts.push(filtertedContract)
            }

            let filterByNetwork = filteredContracts.filter(contract => contract.network === newProject.network)
            setContractList(filterByNetwork)
        },
        [contractsArray, newProject]
    )

    // Add new contract to display
    const onAddContract = () => {

        // If no contract value is selected, return nothing
        if (newContract === '') {
            console.log('No contract selected.')
            return
        }

        // If contract already exists in display, do not add duplicate
        if (contractList.find((contract: {id: string }) => contract.id === newContract)) {
            console.log('Duplicate contract.')
            return
        }

        // Add new contract to newProject
        let newContractsArray = newProject.contracts
        newContractsArray.push(newContract)
        setNewProject((prev: any) => ({
            ...prev,
            contracts: newContractsArray
        }))
        console.log('Contract added.')
    }

    // Remove contract from display
    const onRemoveContract = async (index: string | number) => {
        console.log('Removing...')
        let newArray = newProject.contracts
        newArray.splice(index, 1)
        setNewProject((prev: any) => ({
            ...prev,
            contracts: newArray
        }))

        displayContracts()
        console.log('remove')
    }

    React.useEffect(() => {
        displayContracts()
    }, [displayContracts])

    // Add new project
    const onAddNewProject = async () => {
        try {
            console.log('Saving...')
            setPendingSave(true)
            const id = await addProject(newProject)
            console.log('Transaction ID: ', id)
            onSnackbar(id)
            setPendingSave(false)
            setRouter('projects')
            subscribeToTransaction(id)
        } catch (err) {
            console.error(`Can't add project to Arweave.`, err)
        }
        
    }

    // Delete project
    const onDeleteProject = async () => {
        try {
            console.log('Deleting...')
            setPendingDelete(true)
            const id = await deleteProject(newProject.id)
            console.log('Transaction ID: ', id)
            onSnackbar(id)
            setPendingDelete(false)
            setRouter('projects')
            subscribeToTransaction(id)
        } catch (err) {
            console.error(`Can't delete project on Arweave.`, err)
        }
        
    }

    // Update project
    const onUpdateProject = async () => {
        try {
            if (displayProject === newProject) {
                console.log('No changes were made. Project was not saved.')
            } else {
                console.log('Updating...')
                setPendingSave(true)
                const id = await updateProject(displayProject.id, newProject)
                console.log('Transaction ID: ', id)
                onSnackbar(id)
                setPendingSave(false)
            }
        } catch (err) {
            console.error(`Can't update project on Arweave.`, err)
        }
        
    }

    // Handle input changes
    const handleOnChange = (e: any) => {
        e.persist()

        // Don't allow changes if project is locked
        if (newProject.isLocked || pendingSave || pendingDelete) {
            return
        }

        // Reset contract if network changes
        if (e.target.id === 'network') {
            setNewProject((prev: any) => ({
                ...prev,
                contracts: []
            }))
            let el = document.getElementById('contract') as HTMLInputElement
            el.value = ''
            setNewContract('')
        }

        // Set new contract id if it changes
        if (e.target.id === 'contract') {
            setNewContract(e.target.value)
            return
        }
        
        // Add changes to newProject
        setNewProject((prev: any) => ({
            ...prev,
            [e.target.id]: e.target.value
        }))
    }

    // Handle copy on script tag
    const onCopy = () => {
        let copyText = document.getElementById("script") as HTMLInputElement;

        if (copyText !== null) {
            copyText.select();
            copyText.setSelectionRange(0, 99999); /*For mobile devices*/
            document.execCommand("copy");
            setIsCopied(true)
        }
    }

    const testDeploy = async () => {
        const htmlData = await generateHTML()
        let htmlTransaction = await arweave.createTransaction({
            data: htmlData
        }, wallet);
        htmlTransaction.addTag('Content-Type', 'text/html');
        await arweave.transactions.sign(htmlTransaction, wallet);
        let uploader = await arweave.transactions.getUploader(htmlTransaction);

        while (!uploader.isComplete) {
        await uploader.uploadChunk();
            console.log(`${uploader.pctComplete}% complete, ${uploader.uploadedChunks}/${uploader.totalChunks}`);
            setTransactionId(htmlTransaction.id)
        }
    }

    return (
        <Main id="top" background={colors.grey}>
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
                    <Select disabled={newProject.isLocked || pendingSave || pendingDelete} defaultValue={newProject.network} onChange={handleOnChange} name="network" id="network">
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
                    <Select disabled={newProject.isLocked || pendingSave || pendingDelete} defaultValue={''} onChange={handleOnChange} name="contract" id="contract">
                        <option value={''}>choose an option</option>
                        {newProject.network !== '' && contractsArray.filter((contract: { network: any }) => contract.network === newProject.network).map((contract: any, index: any) => {
                            return <option key={index} value={contract.id}>{contract.name}</option>
                        })}
                    </Select>
                    <ButtonAction1 onClick={onAddContract}>Add +</ButtonAction1>
                    <br />
                    <P2 color={colors.grey2}>Remember contracts must be deployed on the selected network above.</P2>
                    <br />
                    <ProjectContractsTable
                        contractList={contractList}
                        onRemoveContract={onRemoveContract}
                    />
                    <br />
                    <br />
                    <br />
                    <Label htmlFor="provider">Default read-only Ethereum provider (e.g. Infura, Alchemy, etc...):</Label>
                    <Input
                        id='provider'
                        onChange={handleOnChange}
                        required
                        value={newProject.provider}
                        style={{marginBottom: '2rem'}}
                    />
                    <P2 color={colors.grey2}>(Connection must be 'HTTPS')</P2>
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
                        defaultValue={`<script src="${CORE_ADDRESS}" id="dh-apiKey" data-api="${newProject.id}" data-provider="${newProject.provider}"></script>`}
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
                        <ButtonAction2 disabled={newProject.isLocked || pendingSave || pendingDelete} active={newProject.isPaused} onClick={() => setNewProject((prev: any) => ({...prev, isPaused: !prev.isPaused}))}>{!newProject.isPaused ? 'Enabled' : 'Paused'}</ButtonAction2>
                        <ButtonAction2 disabled={pendingSave || pendingDelete} active={newProject.isLocked} onClick={() => setNewProject((prev: any) => ({...prev, isLocked: !prev.isLocked}))}>{!newProject.isLocked ? 'Lock' : 'Locked'}</ButtonAction2>
                    </ButtonsContainer1>
                </CardContainer>
            </Card>
            
            <ButtonsContainer2>
                <ButtonAction1 disabled={pendingSave || pendingDelete} onClick={!isNew ? onUpdateProject : onAddNewProject}>
                    {
                        pendingSave ? <SpinnerTransaction /> : 'Save'
                    }
                </ButtonAction1>
                {!isNew && (!newProject.isPaused && <ButtonAction1 disabled={pendingSave || pendingDelete}  color={colors.red} onClick={onDeleteProject}>
                    {
                        pendingDelete ? <SpinnerTransaction /> : 'Delete'
                    }
                </ButtonAction1>)}
            </ButtonsContainer2>
            <br />
            <button onClick={testDeploy}>Test Deploy</button>
            <a rel="noreferrer" target="_blank" href={`https://arweave.net/${transactionId}`}>https://arweave.net/{transactionId}</a>
        </Main>
    )
}

export default AddProject
