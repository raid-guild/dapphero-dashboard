import { readContract, interactWrite, interactRead } from 'smartweave'
import { JWKInterface } from 'arweave/node/lib/wallet'
import { useEffect, useState } from 'react'
import { ContractInterface, ContractList } from '../../smartweave/interfaces'
import useArweave from './useArweave'

const CONTRACT_ADDRESS = 'bSc5KRKVZoG7e90QQKimcVfTahKx5C4t74DE4qIUISo'

export default function useContracts(wallet: JWKInterface) {
    const arweave = useArweave()

    const [contracts, setContracts] = useState<ContractList>({})

    useEffect(() => {
        const fetchContracts = async () => {
            const data = await interactRead(arweave, wallet, CONTRACT_ADDRESS, {
                function: 'getByCreator'
            })
            setContracts(data.result)
        }
        fetchContracts()
    }, [arweave, wallet])

    const addContract = async (contract: ContractInterface): Promise<string | false> => {
        const contractId = await interactWrite(arweave, wallet, CONTRACT_ADDRESS, {
            function: 'create',
            contract
        })
        const newContracts: ContractList = contracts
        newContracts[contractId as string] = contract
        setContracts(newContracts)
        return contractId
    }

    const updateContract = async (id: string, contract: ContractInterface): Promise<string | false> => {
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

    const getContract = async (id: string): Promise<ContractInterface> => {
        const data: any = await interactRead(arweave, wallet, CONTRACT_ADDRESS, {
            function: 'get',
            id
        })

        return data.result
    }

    return { contracts, addContract, updateContract, getContract }
}