import Arweave from 'arweave'
import { readContract, interactWrite, interactRead } from 'smartweave'
import { JWKInterface } from 'arweave/node/lib/wallet'
import { useEffect, useState } from 'react'
import { ProjectInterface } from '../../smartweave/interfaces'

const CONTRACT_ADDRESS = 'DVI-gBX6HtNUjoZHWLHnWmeujp01rQRnPOEDs4COwx0'

export interface ProjectList {
    [id: string]: ProjectInterface
}

export default function useProjects() {
    const arweave = Arweave.init({
        host: 'arweave.net',// Hostname or IP address for a Arweave host
        port: 443,          // Port
        protocol: 'https',  // Network protocol http or https
        timeout: 20000,     // Network request timeouts in milliseconds
        logging: false,     // Enable network request logging
    })

    const [projects, setProjects] = useState({} as ProjectList)

    useEffect(() => {
        const fetchProjects = async () => {
            const result = await readContract(arweave, CONTRACT_ADDRESS) || {}
            setProjects(result)
        }
        fetchProjects()
    }, [arweave])

    const addProject = async (wallet: JWKInterface, project: ProjectInterface) => {
        const projectId = await interactWrite(arweave, wallet, CONTRACT_ADDRESS, {
            function: 'create',
            project
        })
        const newProjects: ProjectList = projects
        newProjects[projectId as string] = project
        setProjects(newProjects)
    }

    const updateProject = async (wallet: JWKInterface, id: string, project: ProjectInterface) => { 
        await interactWrite(arweave, wallet, CONTRACT_ADDRESS, {
            function: 'update',
            id,
            project
        })
        const newProjects: ProjectList = projects
        newProjects[id] = project
        setProjects(newProjects)
    }

    const getProject = async (wallet: JWKInterface, id: string): Promise<ProjectInterface> => {
        const data: any = await interactRead(arweave, wallet, CONTRACT_ADDRESS, {
            function: 'get',
            id
        })
        
        return data.result
    }

    return [projects, addProject, updateProject, getProject]
}