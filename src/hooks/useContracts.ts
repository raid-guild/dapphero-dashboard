import { interactWrite, interactRead } from 'smartweave';
import { JWKInterface } from 'arweave/node/lib/wallet';
import { useState } from 'react';
import { ContractInterface, ContractList } from '../../smartweave/interfaces';
import useArweave from './useArweave';
import usePST from './usePST';

const CONTRACT_ADDRESS = 'jYn1iueQHZBo-1EJnK6wfiJzl6nSnIdvjQthxPdlnK4';

export default function useContracts(wallet: JWKInterface) {
  const arweave = useArweave();
  const { sendTip } = usePST(wallet);

  const [contracts, setContracts] = useState<ContractList>({});

  // useEffect(() => {
  //     const fetchContracts = async () => {
  //         const data = await interactRead(arweave, wallet, CONTRACT_ADDRESS, {
  //             function: 'getByCreator'
  //         })
  //         setContracts(data)
  //     }
  //     fetchContracts()
  // }, [arweave, wallet])

  const addContract = async (contract: ContractInterface): Promise<string | false> => {
    await sendTip();
    const contractId = await interactWrite(arweave, wallet, CONTRACT_ADDRESS, {
      function: 'create',
      contract,
    });
    const newContracts: ContractList = contracts;
    newContracts[contractId as string] = contract;
    setContracts(newContracts);
    return contractId;
  };

  const updateContract = async (id: string, contract: ContractInterface): Promise<string | false> => {
    await sendTip();
    const tx = await interactWrite(arweave, wallet, CONTRACT_ADDRESS, {
      function: 'update',
      id,
      contract,
    });
    const newContracts: ContractList = contracts;
    newContracts[id] = contract;
    setContracts(newContracts);
    return tx;
  };

  const getContract = async (id: string): Promise<ContractInterface> => {
    const data: any = await interactRead(arweave, wallet, CONTRACT_ADDRESS, {
      function: 'get',
      id,
    });

    return data;
  };

  const deleteContract = async (id: string): Promise<ContractInterface> => {
    const tx: any = await interactWrite(arweave, wallet, CONTRACT_ADDRESS, {
      function: 'delete',
      id,
    });

    return tx;
  };

  const getAllContracts = async (): Promise<ContractList> => {
    const data = await interactRead(arweave, wallet, CONTRACT_ADDRESS, {
      function: 'getByCreator',
    });

    return data;
  };

  return { contracts, addContract, updateContract, getContract, deleteContract, getAllContracts };
}
