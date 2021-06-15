import React from 'react';
import { JWKInterface } from 'arweave/node/lib/wallet';

// Consts
import { DEFAULT_CONTRACT, DEFAULT_PROJECT } from './consts';

// Contexts
import { ArWalletContext } from 'contexts/ArWallet';

// Hooks
import useArweave from './hooks/useArweave';
import useContracts from './hooks/useContracts';
import useProjects from './hooks/useProjects';

// Components
import AddContract from './components/AddContract';
import AddProject from './components/AddProject';
import Contracts from './components/Contracts';
import Header from './components/Header';
import Layout from './components/Layout';
import Navigation from './components/Navigation';
import Projects from './components/Projects';
import Snackbar from './components/Snackbar';

// Helpers
import { addIdsToArrary } from './helpers';

import type { IProject, IContract } from './utils/types';

const App: React.FC = () => {
  const { wallet } = React.useContext(ArWalletContext);

  const [router, setRouter] = React.useState<string>('projects');
  const [displayContract, setDisplayContract] = React.useState<string | IContract>(DEFAULT_CONTRACT);
  const [displayProject, setDisplayProject] = React.useState<string | IProject>(DEFAULT_PROJECT);
  const [contractsArray, setContractsArray] = React.useState<IContract[]>([]);
  const [projectsArray, setProjectsArray] = React.useState<IProject[]>([]);
  const [transactionId, setTransactionId] = React.useState<string>('');
  const [snackbar, setSnackbar] = React.useState<boolean>(false);

  const [loadingData, setLoadingData] = React.useState<boolean>(false);

  // Hooks
  const arweave = useArweave();
  const { getAllProjects } = useProjects((wallet as JWKInterface) || null);
  const { getAllContracts } = useContracts((wallet as JWKInterface) || null);

  // Set Initial State
  const setInitialState = async () => {
    console.log('Retrieving data...');
    setLoadingData(true);
    // Grabs all user projects from smartweave contract
    const projectsResult = await getAllProjects();
    const newProjectsArray = addIdsToArrary(projectsResult);
    setProjectsArray(newProjectsArray);

    // Grabs all user contracts from smartweave contract
    const contractsResult = await getAllContracts();
    const newContractsArray = addIdsToArrary(contractsResult);
    setContractsArray(newContractsArray);

    setLoadingData(false);
  };

  // setInitialState when mounted
  React.useEffect(() => {
    if (wallet) {
      try {
        setInitialState();
      } catch (err) {
        console.error(`can't retrieve data from Arweave.`, err);
      }
    }
    return;
    // eslint-disable-next-line
	}, [wallet])

  // Subscribe to transaction
  const subscribeToTransaction = async (transaction: string) => {
    arweave.transactions.getStatus(transaction).then((status) => {
      if (status.confirmed == null) {
        setTimeout(() => subscribeToTransaction(transaction), 10000);
      } else {
        setInitialState();
        console.log('Transaction confirmed: ', transaction);
      }
    });
  };

  // Open Project component
  const onSelectProject = (project: string | IProject) => {
    setRouter('project');
    if (project === 'default') {
      setDisplayProject(DEFAULT_PROJECT);
    } else {
      setDisplayProject(project);
    }
  };

  // Open Contract component
  const onSelectContract = (contract: string | IContract) => {
    setRouter('contract');
    if (contract === 'default') {
      setDisplayContract(DEFAULT_CONTRACT);
    } else {
      setDisplayContract(contract);
    }
  };

  const onSnackbar = (id: string) => {
    setSnackbar(true);
    setTransactionId(id);
  };

  return (
    <>
      <Layout>
        <Navigation router={router} setRouter={setRouter} />
        <Header router={router} />
        {snackbar && <Snackbar setSnackbar={setSnackbar} transactionId={transactionId} />}
        {router === 'projects' && wallet && (
          <Projects loadingData={loadingData} onSelectProject={onSelectProject} projectsArray={projectsArray} />
        )}
        {router === 'project' && typeof displayProject !== 'string' && wallet && (
          <AddProject
            arweave={arweave}
            contractsArray={contractsArray}
            displayProject={displayProject}
            onSnackbar={onSnackbar}
            setRouter={setRouter}
            subscribeToTransaction={subscribeToTransaction}
            wallet={wallet}
          />
        )}
        {router === 'contracts' && wallet && (
          <Contracts contractsArray={contractsArray} loadingData={loadingData} onSelectContract={onSelectContract} />
        )}
        {router === 'contract' && typeof displayContract !== 'string' && wallet && (
          <AddContract
            arweave={arweave}
            displayContract={displayContract}
            onSnackbar={onSnackbar}
            setRouter={setRouter}
            subscribeToTransaction={subscribeToTransaction}
            wallet={wallet}
          />
        )}
      </Layout>
    </>
  );
};

export default App;
