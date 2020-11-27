import { interactWrite, interactRead } from 'smartweave'
import { JWKInterface } from 'arweave/node/lib/wallet'
import { useState } from 'react'
import { ProjectInterface } from '../../smartweave/interfaces'
import useArweave from './useArweave'

const CONTRACT_ADDRESS = 'N9n48HdcRPNB34A4Zcxg2RiYvfFUa7HkbKFbZ1GmjZ8'
export type ProjectList = Record<string,ProjectInterface>

export default function useProjects(wallet: JWKInterface) {
    const arweave = useArweave() 

    const [projects, setProjects] = useState<ProjectList>({})

    // useEffect(() => {
    //     const fetchProjects = async () => {
    //         const data = await interactRead(arweave, wallet, CONTRACT_ADDRESS, {
    //             function: 'getByCreator'
    //         })
    //         setProjects(data)
    //     }
    //     fetchProjects()
    // }, [arweave, wallet])

    const addProject = async (project: ProjectInterface): Promise<string | false> => {
        const projectId = await interactWrite(arweave, wallet, CONTRACT_ADDRESS, {
            function: 'create',
            project
        })
        const newProjects: ProjectList = projects
        newProjects[projectId as string] = project
        setProjects(newProjects)
        return projectId
    }

    const updateProject = async (id: string, project: ProjectInterface): Promise<string | false> => { 
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

    const getProject = async (id: string): Promise<ProjectInterface> => {
        const data: any = await interactRead(arweave, wallet, CONTRACT_ADDRESS, {
            function: 'get',
            id
        })
        
        return data.result
    }

    const getAllProjects = async (): Promise<ProjectList> => {
        const data = await interactRead(arweave, wallet, CONTRACT_ADDRESS, {
            function: 'getByCreator'
        })
        
        return data
    }

    return { projects, addProject, updateProject, getProject, getAllProjects }
}