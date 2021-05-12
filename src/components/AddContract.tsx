import React from 'react';
import type { INewContract } from 'utils/types';

// Hooks
import useContracts from '../hooks/useContracts';

// Components
import { ButtonAction1, ButtonAction2, ButtonsContainer2 } from './Buttons';
import { Card, CardContainer, Main } from './Containers';
import { Label, Input, Select, TextArea } from './Form';
import Line from './Line';
import Spacer from 'components/Spacer';
import SpinnerTransaction from './SpinnerTransaction';
import { colors } from './Theme';
import { H3, P1, P2 } from './Typography';

const AddContract: React.FC<any> = ({
  arweave,
  displayContract,
  onSnackbar,
  setRouter,
  subscribeToTransaction,
  wallet,
}) => {
  const [abiText, setAbiText] = React.useState<string>('[]');
  const [originalAbiText, setOriginalAbiText] = React.useState<string>('');
  const [isNew, setIsNew] = React.useState<boolean>(false);
  const [isUploading, setIsUploading] = React.useState<boolean>(false);
  const [newContract, setNewContract] = React.useState<INewContract>(displayContract);
  const [pendingSave, setPendingSave] = React.useState<boolean>(false);
  const [pendingDelete, setPendingDelete] = React.useState<boolean>(false);

  // Hooks
  const { addContract, deleteContract, updateContract } = useContracts(wallet);

  React.useEffect(() => {
    if (newContract.id === undefined) {
      setIsNew(true);
    }

    if (displayContract.abi != '') {
      arweave.transactions.getData(displayContract.abi, { decode: true, string: true }).then((data: string) => {
        setOriginalAbiText(data);
        setAbiText(data);
      });
    }

    const el = document.getElementById('top') as HTMLElement;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return;
    // eslint-disable-next-line
  }, []);

  // Add new contract
  const onAddNewContract = async () => {
    try {
      console.log('Adding...');
      setPendingSave(true);
      const id = await addContract(newContract);
      console.log('Transaction ID:', id);
      onSnackbar(id);
      setPendingSave(false);
      setRouter('contracts');
      subscribeToTransaction(id);
    } catch (err) {
      console.error(`Can't add contract to Arweave.`, err);
    }
  };

  // Delete contract
  const onDeleteContract = async () => {
    try {
      console.log('Deleting...');
      setPendingDelete(true);
      const id = await deleteContract(newContract.id);
      console.log('Transaction ID:', id);
      onSnackbar(id);
      setPendingDelete(false);
      setRouter('contracts');
      subscribeToTransaction(id);
    } catch (err) {
      console.error(`Can't delete contract on Arweave.`, err);
    }
  };

  // Update contract
  const onUpdateContract = async () => {
    try {
      if (displayContract === newContract) {
        console.log('No changes were made. Contract did not update.');
      } else {
        console.log('Updating...');
        setPendingSave(true);
        const id = await updateContract(displayContract.id, newContract);
        console.log('Transaction ID:', id);
        onSnackbar(id);
        setPendingSave(false);
      }
    } catch (err) {
      console.error(`Can't update contract on Arweave.`, err);
    }
  };

  const onUploadABI = async () => {
    setIsUploading(true);
    const transaction = await arweave.createTransaction(
      {
        data: abiText,
      },
      wallet,
    );
    transaction.addTag('Content-Type', 'text/plain');
    await arweave.transactions.sign(transaction, wallet);
    const uploader = await arweave.transactions.getUploader(transaction);
    while (!uploader.isComplete) {
      await uploader.uploadChunk();
      console.log(`${uploader.pctComplete}% complete, ${uploader.uploadedChunks}/${uploader.totalChunks}`);
      console.log('Transaction ID: ', transaction.id);
      setNewContract((prev: any) => ({
        ...prev,
        abi: transaction.id,
      }));
    }
    setIsUploading(false);
  };

  // Handle changes to contract details
  const handleOnChange = (e: any) => {
    if (newContract.isLocked || pendingSave || pendingDelete) {
      return;
    }

    e.persist();
    setNewContract((prev: any) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <Main id="top" background={colors.grey}>
      <Card>
        <CardContainer>
          <H3>Basic Information</H3>
        </CardContainer>
        <Line />
        <CardContainer>
          <Label htmlFor="name">Name:</Label>
          <Input id="name" onChange={handleOnChange} required value={newContract.name} />
          <Label htmlFor="description">Description:</Label>
          <TextArea id="description" onChange={handleOnChange} required value={newContract.description} />
        </CardContainer>
      </Card>

      <Card>
        <CardContainer>
          <H3>Networks and Contracts</H3>
        </CardContainer>
        <Line />
        <CardContainer>
          <P1 color={colors.grey2}>
            Please provide the network, address and ABI of your smart contract. If your contract is a verified Etherscan
            contract, you can load the ABI automatically.
          </P1>
          <br />
          <Label htmlFor="network">Select a project Network:</Label>
          <Select
            disabled={newContract.isLocked || pendingSave || pendingDelete}
            defaultValue={newContract.network}
            onChange={handleOnChange}
            name="network"
            id="network"
          >
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
          <Input id="deployedAddress" onChange={handleOnChange} required value={newContract.deployedAddress} />
          <Label htmlFor="abi-text">Contract ABI:</Label>
          <TextArea id="abi-text" onChange={(e) => setAbiText(e.target.value)} required value={abiText} />
          {originalAbiText != abiText ? (
            <P2 color={colors.grey2}>Make sure to hit &quot;Upload&quot; after adding ABI.</P2>
          ) : (
            <P2 color={colors.grey2}>Upload ID: {newContract.abi}</P2>
          )}
          <Spacer size={'sm'} />
          <ButtonAction1 disabled={isUploading || originalAbiText == abiText} onClick={onUploadABI} type={'button'}>
            {isUploading ? <SpinnerTransaction /> : 'Upload'}
          </ButtonAction1>
        </CardContainer>
      </Card>

      <Card>
        <CardContainer>
          <H3>Status</H3>
        </CardContainer>
        <Line />
        <CardContainer>
          <P1 color={colors.grey2}>To prevent accidental contract deletion you can lock it here.</P1>
          <br />
          <ButtonAction2
            disabled={pendingSave || pendingDelete}
            active={newContract.isLocked}
            onClick={() => setNewContract((prev: any) => ({ ...prev, isLocked: !prev.isLocked }))}
          >
            {!newContract.isLocked ? 'Lock' : 'Locked'}
          </ButtonAction2>
        </CardContainer>
      </Card>

      <ButtonsContainer2>
        <ButtonAction1 disabled={pendingSave || pendingDelete} onClick={!isNew ? onUpdateContract : onAddNewContract}>
          {pendingSave ? <SpinnerTransaction /> : 'Save'}
        </ButtonAction1>
        {!isNew && !newContract.isLocked && (
          <ButtonAction1 disabled={pendingSave || pendingDelete} color={colors.red} onClick={onDeleteContract}>
            {pendingDelete ? <SpinnerTransaction /> : 'Delete'}
          </ButtonAction1>
        )}
      </ButtonsContainer2>
    </Main>
  );
};

export default AddContract;
