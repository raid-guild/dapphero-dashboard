import React from 'react'
import { JWKInterface } from 'arweave/node/lib/wallet'

// Consts
import { DEFAULT_CONTRACT, DEFAULT_PROJECT} from './consts'

// Hooks
import useContracts from './hooks/useContracts'
import useProjects from './hooks/useProjects'

// Components
import AddContract from './components/AddContract'
import AddProject from './components/AddProject'
import Contracts from './components/Contracts'
import Header from './components/Header'
import Layout from './components/Layout'
import Login from './components/Login'
import Navigation from './components/Navigation'
import Projects from './components/Projects'

// Helpers
import { addIdsToArrary } from './helpers'

const App = () => {
	const [router, setRouter] = React.useState<string>('projects')
	const [wallet, setWallet] = React.useState<JWKInterface | null>(null)

	const [displayContract, setDisplayContract] = React.useState(DEFAULT_CONTRACT)
	const [displayProject, setDisplayProject] = React.useState(DEFAULT_PROJECT)
	const [contractsArray, setContractsArray] = React.useState<any[]>([])
	const [projectsArray, setProjectsArray] = React.useState<any[]>([])

	const [loadingData, setLoadingData] = React.useState<boolean>(true)

	// Hooks
	const { getAllProjects } = useProjects(wallet! as JWKInterface)
	const { getAllContracts } = useContracts(wallet! as JWKInterface)

	

	// Load initial State
	React.useEffect(() => {
		const setInitialState = async () => {
	
			// Grabs all user projects from smartweave contract
			const projectsResult = await getAllProjects()
			const newProjectsArray = addIdsToArrary(projectsResult)
			setProjectsArray(newProjectsArray)

			// Grabs all user contracts from smartweave contract
			const contractsResult = await getAllContracts()
			const newContractsArray = addIdsToArrary(contractsResult)
			setContractsArray(newContractsArray)

			setLoadingData(false)
		}

		if (wallet) {
			setInitialState()
		}
		return
	// eslint-disable-next-line
	}, [wallet])

	// Upload wallet
	const uploadWallet = (evt: React.ChangeEvent<HTMLInputElement>) => {
		const fileReader = new FileReader()
		fileReader.onload = async (e) => {
			setWallet(JSON.parse(e.target!.result as string))
		}
		if (evt.target.files?.length) {
			fileReader.readAsText(evt.target.files[0])
		}
	}

	// Open Project component
	const onSelectProject = (project: any) => {
		setRouter('project')
		if (project === 'default') {
			setDisplayProject(DEFAULT_PROJECT)
		} else  {
			setDisplayProject(project)
		}
	}

	// Open Contract component
	const onSelectContract = (contract: any) => {
		setRouter('contract')
		if (contract === 'default') {
			setDisplayContract(DEFAULT_CONTRACT)
		} else  {
			setDisplayContract(contract)
		}
	}

	return (
		<>
			{!wallet &&
				<Login uploadWallet={uploadWallet} />
			}
			{wallet &&
				(<Layout>
					<Navigation router={router} setRouter={setRouter} />
					<Header router={router} />
					{router === 'projects' && <Projects
						loadingData={loadingData}
						onSelectProject={onSelectProject}
						projectsArray={projectsArray}
					/>}
					{router === 'project' && <AddProject
						contractsArray={contractsArray}
						displayProject={displayProject}
						wallet={wallet}
					/>}
					{router === 'contracts' && <Contracts
						contractsArray={contractsArray}
						loadingData={loadingData}
						onSelectContract={onSelectContract}
					/>}
					{router === 'contract' && <AddContract
						displayContract={displayContract}
						wallet={wallet}
					/>}
				</Layout>)
			}
		</>
	)
}

export default App
