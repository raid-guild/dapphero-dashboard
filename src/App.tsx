import React from 'react'
import styled from 'styled-components'
import Arweave from 'arweave';
import { JWKInterface } from 'arweave/node/lib/wallet';
import useProjects from './hooks/useProjects'
import { media } from './components/Breakpoints'

// Components
import Header from './components/Header'
import Login from './components/Login'
import Navigation from './components/Navigation'
import NewProject from './components/NewProject'
import Projects from './components/Projects'


const TEMP_PROJECT = {
    name: 'myProjectName',
    description: 'My new project description',
    coverImg: 'Test 1 image',
    network: '',
    contracts: [''],
    creator: '',
    createdAt: '',
    updatedAt: '',
    isPaused: false,
    isLocked: false,
}

const App = () => {
	const [address, setAddress] = React.useState('')
	const [loadingProjects, setLoadingProject] = React.useState(true)
	const [router, setRouter] = React.useState('projects')
	const [projectsArray, setProjectsArray] = React.useState<any[]>([])
	const [displayProject, setDisplayProject] = React.useState(TEMP_PROJECT)
	const [wallet, setWallet] = React.useState(null)
	const { getAllProjects } = useProjects(wallet! as JWKInterface)
	
	const arweave = Arweave.init({
		host: 'arweave.net',// Hostname or IP address for a Arweave host
		port: 443,          // Port
		protocol: 'https',  // Network protocol http or https
		timeout: 20000,     // Network request timeouts in milliseconds
		logging: false,     // Enable network request logging
	});

	React.useEffect(() => {
		const getAddress = async () => {
			setAddress(await arweave.wallets.jwkToAddress(wallet! as JWKInterface));
		}

		if (wallet) {
			getAddress();
			getAllProjects().then(result => {
				let newIdArray: any[] = []
				let newProjectsArray: any[] = []
				newIdArray = Object.keys(result)
	
				Object.keys(result).map(function(key, index) {
					newProjectsArray.push(result[key])
					newProjectsArray[index].id = newIdArray[index]
					return newProjectsArray
				})
				setProjectsArray(newProjectsArray)
				setLoadingProject(false)
			})
		}		
	}, [arweave, wallet, projectsArray, getAllProjects])

	const uploadWallet = (evt: React.ChangeEvent<HTMLInputElement>) => {
		const fileReader = new FileReader();
		fileReader.onload = async (e) => {
			setWallet(JSON.parse(e.target!.result as string));
		}
		if (evt.target.files?.length) {
			fileReader.readAsText(evt.target.files[0]);
		}
	}

	const onSelectProject = (project: any) => {
		setRouter('project')
		if (project === 'default') {
			setDisplayProject(TEMP_PROJECT)
		} else  {
			setDisplayProject(project)
		}
	}

	return (
		<>
			{!wallet &&
				<Login uploadWallet={uploadWallet} />
			}
			{wallet && <Layout>
					<Navigation router={router} setRouter={setRouter} />
					<Header router={router} setrouter={setRouter} />
					{router === 'projects' && <Projects
						projectsArray={projectsArray}
						setRouter={setRouter} address={address}
						loadingProjects={loadingProjects}
						onSelectProject={onSelectProject}
					/>}
					{router === 'project' && <NewProject
						displayProject={displayProject}
						setRouter={setRouter}
						wallet={wallet}
						address={address}
					/>}
				</Layout>
			}
		</>
	);
}

export default App;

const Layout = styled.div`
	display: grid;
	grid-template-columns: 25rem auto;
	grid-template-rows: 12rem auto;

	${media.medium`
		grid-template-columns: 30rem auto;
    `}
`
