// import Arweave from 'arweave';
import React from 'react'
import styled from 'styled-components'
import useContracts from '../hooks/useContracts'

// Components
import { ButtonAction, ButtonAction2 } from './Buttons'
import { Card, CardContainer, Main } from './Containers'
import { Label, Input, InputCopy, Select, TextArea } from './Form'
import { Table, TableBodyCell, TableBodyRow, Dot} from './Table'
import { colors } from './Theme'
import { H3, P1, P2 } from './Typography'
import Spinner from './Spinner'

const AddContract: React.FC<any> = ({
    displayContract,
    wallet,
}) => {
    const { addContract, deleteContract, updateContract, getContract } = useContracts(wallet)
    const [ isNew, setIsNew ] = React.useState(false)
    const [ newContract, setNewContract ] = React.useState(displayContract)

    React.useEffect(() => {
        if (newContract.id === undefined) {
            setIsNew(true)
        }

    }, [newContract])

    const onAddNewContract = () => {
        addContract(newContract)
        .then(id => console.log(id))
    }

    const onDeleteContract = () => {
        deleteContract(newContract.id)
        .then(id => console.log(id))
    }

    const onUpdateContract = () => {
        if (displayContract === newContract) {
            console.log('Nothing happened!')
        } else {
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
