import { readContract, interactWrite, interactRead } from 'smartweave'
import { JWKInterface } from 'arweave/node/lib/wallet'
import { useEffect, useState } from 'react'
import { ContractInterface } from '../../smartweave/interfaces'
import useArweave from './useArweave'

const CONTRACT_ADDRESS = 'uIF7JW5S1IuoFC5_r8zpMDLB6SSn2E2wnOeyU0YhHk4'
export interface ContractList {
    [id: string]: ContractInterface
}

export default function useContracts() {
    const arweave = useArweave()

    const [contracts, setContracts] = useState({} as ContractList)

    useEffect(() => {
        const fetchContracts = async () => {
            const result = await readContract(arweave, CONTRACT_ADDRESS) || {}
            setContracts(result)
        }
        fetchContracts()
    }, [arweave])

    const addContract = async (wallet: JWKInterface, contract: ContractInterface): Promise<string | false> => {
        const contractId = await interactWrite(arweave, wallet, CONTRACT_ADDRESS, {
            function: 'create',
            contract
        })
        const newContracts: ContractList = contracts
        newContracts[contractId as string] = contract
        setContracts(newContracts)
        return contractId
    }

    const updateContract = async (wallet: JWKInterface, id: string, contract: ContractInterface): Promise<string | false> => {
        const tx = await interactWrite(arweave, wallet, CONTRACT_ADDRESS, {
            function: 'update',
            id,
            contract
        })
        const newContracts: ContractList = contracts
        newContracts[id] = contract
        setContracts(newContracts)
        return tx
    }

    const getContract = async (wallet: JWKInterface, id: string): Promise<ContractInterface> => {
        const data: any = await interactRead(arweave, wallet, CONTRACT_ADDRESS, {
            function: 'get',
            id
        })

        return data.result
    }

    return [contracts, addContract, updateContract, getContract]
}