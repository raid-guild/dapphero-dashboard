import React from 'react'

// Components
import { ButtonAction1 } from '../components/Buttons'
import { Main } from './Containers'
import { IsLocked, Dot, Table, TableBodyCell, TableBodyRow, TableHeadCell, TableHeadRow } from './Table'
import Spinner from './Spinner'
import { colors } from '../components/Theme'
import { H4, H5, P1 } from '../components/Typography'

const Contracts: React.FC<any> = ({
    contractsArray,
    loadingData,
    onSelectContract,
}) => {
    return (
        <Main background={colors.white}>
            <H4>The Contracts tab offers you a quick overview of the contracts you have associated with your DappHero Account. Once you create a contract here, you will be able to use it in an of your DappHero projects.</H4>
            <ButtonAction1 onClick={onSelectContract.bind(this, 'default')}>New +</ButtonAction1>
            {!loadingData && <Table>
                <thead>
                    <TableHeadRow>
                        <TableHeadCell>
                            <H5>Contract Name</H5>
                        </TableHeadCell>
                        <TableHeadCell>
                            <H5>Address</H5>
                        </TableHeadCell>
                        <TableHeadCell>
                            <H5>Network</H5>
                        </TableHeadCell>
                        <TableHeadCell>
                            <H5>Status</H5>
                        </TableHeadCell>
                    </TableHeadRow>
                </thead>
                <tbody>
                    {contractsArray.map((contract: { name: React.ReactNode; deployedAddress: string; network: React.ReactNode; isLocked: any }, index: string | number | null | undefined) => {
                        return(
                            <TableBodyRow key={index} onClick={onSelectContract.bind(this, contract)}>
                                <TableBodyCell>
                                    <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}>
                                        <Dot />
                                        <P1 color={colors.black2}>{contract.name}</P1>
                                    </div>
                                </TableBodyCell>
                                <TableBodyCell>
                                    <P1 color={colors.green}>{contract.deployedAddress.slice(0, 10)}...</P1>
                                </TableBodyCell>
                                <TableBodyCell>
                                    <P1 color={contract.network ? colors.green : colors.red}>{contract.network ? contract.network : 'missing'}</P1>
                                </TableBodyCell>
                                <TableBodyCell>{contract.isLocked ? 'Locked' : <IsLocked>unlocked</IsLocked>}</TableBodyCell>
                            </TableBodyRow>
                        )
                    })}
                </tbody>
            </Table>}
            {loadingData && <Spinner />}
        </Main>
    )
}

export default Contracts
