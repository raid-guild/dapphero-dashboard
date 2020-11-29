// import Arweave from 'arweave';
import React from 'react'
import styled from 'styled-components'
import useContracts from '../hooks/useContracts'

// Components
import { ButtonAction, ButtonAction2 } from './Buttons'
import { Card, CardContainer, Main } from './Containers'
import { Label, Input, Select, TextArea } from './Form'
import { colors } from './Theme'
import { H3, P1 } from './Typography'

const AddContract: React.FC<any> = ({
    displayContract,
    wallet,
}) => {
    const { addContract, deleteContract, updateContract } = useContracts(wallet)
    const [ isNew, setIsNew ] = React.useState(false)
    const [ newContract, setNewContract ] = React.useState(displayContract)

    React.useEffect(() => {
        if (newContract.id === undefined) {
            setIsNew(true)
        }

    }, [newContract])

    const onAddNewContract = () => {
        console.log('Adding...')
        addContract(newContract)
        .then(id => console.log(id))
    }

    const onDeleteContract = () => {
        console.log('Deleting...')
        deleteContract(newContract.id)
        .then(id => console.log(id))
    }

    const onUpdateContract = () => {
        if (displayContract === newContract) {
            console.log('Nothing happened!')
        } else {
            console.log('Updating...')
            updateContract(displayContract.id, newContract)
            .then(id => console.log(id))
        }
    }

    const handleOnChange = (e: any) => {
        if (newContract.isLocked) {
            return
        }
        
        e.persist()
        setNewContract((prev: any) => ({
            ...prev,
            [e.target.id]: e.target.value
        }))
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
                        <Select defaultValue={newContract.network} onChange={handleOnChange} name="network" id="network">
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

                        <ButtonAction2 color={newContract.isLocked} onClick={() => setNewContract((prev: any) => ({...prev, isLocked: !prev.isLocked}))}>{!newContract.isLocked ? 'Lock' : 'Locked'}</ButtonAction2>
                    </CardContainer>
                </Card>

                <ButtonsContainer2>
                    <ButtonAction onClick={!isNew ? onUpdateContract : onAddNewContract}>Save</ButtonAction>
                    {!isNew && (!newContract.isPaused && <ButtonAction color={colors.red} onClick={onDeleteContract}>Delete</ButtonAction>)}
                </ButtonsContainer2>
            </Main>
        </>
    )
}

export default AddContract

const Line = styled.hr`
    border-bottom: 1px solid ${colors.grey};
    opacity: .15;
    width: 100%;
    padding-bottom: 5rem;
`

const ButtonsContainer2 = styled.div`
    display: flex;
    justify-content: space-between;
    width: 28rem;
`
