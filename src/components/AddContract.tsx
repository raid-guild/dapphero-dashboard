import React from 'react'

// Hooks
import useContracts from '../hooks/useContracts'

// Components
import { ButtonAction1, ButtonAction2, ButtonsContainer2 } from './Buttons'
import { Card, CardContainer, Main } from './Containers'
import { Label, Input, Select, TextArea } from './Form'
import Line from './Line'
import SpinnerTransaction from './SpinnerTransaction'
import { colors } from './Theme'
import { H3, P1 } from './Typography'

const AddContract: React.FC<any> = ({
    displayContract,
    onSnackbar,
    setRouter,
    subscribeToTransaction,
    wallet,
}) => {
    const [ isNew, setIsNew ] = React.useState<boolean>(false)
    const [ newContract, setNewContract ] = React.useState(displayContract)
    const [ pendingSave, setPendingSave ] = React.useState<boolean>(false)
    const [ pendingDelete, setPendingDelete ] = React.useState<boolean>(false)

    // Hooks
    const { addContract, deleteContract, updateContract } = useContracts(wallet)

    React.useEffect(() => {
        if (newContract.id === undefined) {
            setIsNew(true)
        }
        return
    }, [newContract])

    // Add new contract
    const onAddNewContract = async () => {
        try {
            console.log('Adding...')
            setPendingSave(true)
            const id = await addContract(newContract)
            console.log('Transaction ID:', id)
            onSnackbar(id)
            setPendingSave(false)
            setRouter('projects')
            subscribeToTransaction(id)
        } catch (err) {
            console.error(`Can't add contract to Arweave.`, err)
        }
    }

    // Delete contract
    const onDeleteContract = async () => {
        try {
            console.log('Deleting...')
            setPendingDelete(true)
            const id = await deleteContract(newContract.id)
            console.log('Transaction ID:', id)
            onSnackbar(id)
            setPendingDelete(false)
            setRouter('projects')
            subscribeToTransaction(id)
        } catch (err) {
            console.error(`Can't delete contract on Arweave.`, err)
        }
    }

    // Update contract
    const onUpdateContract = async () => {
        try {
            if (displayContract === newContract) {
                console.log('No changes were made. Contract did not update.')
            } else {
                console.log('Updating...')
                setPendingSave(true)
                const id = await updateContract(displayContract.id, newContract)
                console.log('Transaction ID:', id)
                onSnackbar(id)
                setPendingSave(false)
            }
        } catch (err) {
            console.error(`Can't update contract on Arweave.`, err)
        }
    }

    // Handle changes to contract details
    const handleOnChange = (e: any) => {
        if (newContract.isLocked || pendingSave || pendingDelete) {
            return
        }

        e.persist()
        setNewContract((prev: any) => ({
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
                    <Label htmlFor="name">Name:</Label>
                    <Input
                        id='name'
                        onChange={handleOnChange}
                        required
                        value={newContract.name}
                    />
                    <Label htmlFor="description">Description:</Label>
                    <TextArea
                        id='description'
                        onChange={handleOnChange}
                        required
                        value={newContract.description}
                    />
                </CardContainer>
            </Card>

            <Card>
                <CardContainer>
                    <H3>Networks and Contracts</H3>
                </CardContainer>
                <Line />
                <CardContainer>
                    <P1 color={colors.grey2}>Please provide the network, address and ABI of your smart contract. If your contract is a verified Etherscan contract, you can load the ABI automatically.</P1>
                    <br/>
                    <Label htmlFor="network">Select a project Network:</Label>
                    <Select disabled={newContract.isLocked || pendingSave || pendingDelete} defaultValue={newContract.network} onChange={handleOnChange} name="network" id="network">
                        <option value="">choose an option</option>
                        <option value="rinkeby">rinkeby</option>
                        <option value="mainnet">mainnet</option>
                        <option value="kovan">kovan</option>
                        <option value="goerli">goerli</option>
                        <option value="ropsten">ropsten</option>
                        <option value="xDai">xDai</option>
                        <option value="maticMumbaiTestnet">maticMumbaiTestnet</option>
                    </Select>
                    <Label htmlFor="deployedAddress">Address deployed:</Label>
                    <Input
                        id='deployedAddress'
                        onChange={handleOnChange}
                        required
                        value={newContract.deployedAddress}
                    />
                    <Label htmlFor="abi">Contract ABI:</Label>
                    <TextArea
                        id='abi'
                        onChange={handleOnChange}
                        required
                        value={newContract.abi}
                    />
                </CardContainer>
            </Card>

            <Card>
                <CardContainer>
                    <H3>Status</H3>
                </CardContainer>
                <Line />
                <CardContainer>
                    <P1 color={colors.grey2}>To prevent accidental contract deletion you can lock it here.</P1>
                    <br/>
                    <ButtonAction2 disabled={pendingSave || pendingDelete} active={newContract.isLocked} onClick={() => setNewContract((prev: any) => ({...prev, isLocked: !prev.isLocked}))}>{!newContract.isLocked ? 'Lock' : 'Locked'}</ButtonAction2>
                </CardContainer>
            </Card>

            <ButtonsContainer2>
                <ButtonAction1 disabled={pendingSave || pendingDelete} onClick={!isNew ? onUpdateContract : onAddNewContract}>
                    {
                        pendingSave ? <SpinnerTransaction /> : 'Save'
                    }
                </ButtonAction1>
                {!isNew && (!newContract.isLocked && <ButtonAction1 disabled={pendingSave || pendingDelete} color={colors.red} onClick={onDeleteContract}>
                    {
                        pendingDelete ? <SpinnerTransaction /> : 'Delete'
                    }
                </ButtonAction1>)}
            </ButtonsContainer2>
        </Main>
    )
}

export default AddContract
