import { readContract, interactWrite, interactRead } from 'smartweave'
import { JWKInterface } from 'arweave/node/lib/wallet'
import { useEffect, useState } from 'react'
import { ProjectInterface } from '../../smartweave/interfaces'
import useArweave from './useArweave'

const CONTRACT_ADDRESS = 'DVI-gBX6HtNUjoZHWLHnWmeujp01rQRnPOEDs4COwx0'
export type ProjectList = Record<string,ProjectInterface>

export default function useProjects() {
    const arweave = useArweave() 

    const [projects, setProjects] = useState<ProjectList>({})

    useEffect(() => {
        const fetchProjects = async () => {
            const result = await readContract(arweave, CONTRACT_ADDRESS) || {}
            setProjects(result.projects)
        }
        fetchProjects()
    }, [arweave])

    const addProject = async (wallet: JWKInterface, project: ProjectInterface): Promise<string | false> => {
        const projectId = await interactWrite(arweave, wallet, CONTRACT_ADDRESS, {
            function: 'create',
            project
        })
        const newProjects: ProjectList = projects
        newProjects[projectId as string] = project
        setProjects(newProjects)
        return projectId
    }

    const updateProject = async (wallet: JWKInterface, id: string, project: ProjectInterface): Promise<string | false> => { 
        const tx = await interactWrite(arweave, wallet, CONTRACT_ADDRESS, {
            function: 'update',
            id,
            project
        })
        const newProjects: ProjectList = projects
        newProjects[id] = project
        setProjects(newProjects)
        return tx
    }

    const getProject = async (wallet: JWKInterface, id: string): Promise<ProjectInterface> => {
        const data: any = await interactRead(arweave, wallet, CONTRACT_ADDRESS, {
            function: 'get',
            id
        })
        
        return data.result
    }

    return { projects, addProject, updateProject, getProject }
}