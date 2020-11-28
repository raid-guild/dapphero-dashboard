import { ProjectActionInterface, ProjectInput, ProjectList } from './interfaces'

declare const ContractError: any
declare const SmartWeave: any

export function handle(state: any, action: ProjectActionInterface) {
    const input: ProjectInput = action.input

    if (input.function === 'create') { 
        const project = input.project
       
        state.projects[SmartWeave.transaction.id] = {
            name: project.name ,
            description: project.description,
            coverImg: project.coverImg,
            network: project.network,
            contracts: project.contracts,
            creator: action.caller,
            createdAt: new Date().toUTCString(),
            updatedAt: new Date().toUTCString(),
            isPaused: false,
            isLocked: false
        }

        return { state }
    }

    if (input.function === 'update') {
        const id = input.id || ''
        const project = input.project
        
        if (!state.projects[id]) {
            throw new ContractError('Project does not exist')
        }

        if (state.projects[id].creator !== action.caller) {
            throw new ContractError('Project is owned by another caller') 
        }

        state.projects[id].name = project.name
        state.projects[id].description = project.description
        state.projects[id].coverImg = project.coverImg
        state.projects[id].network = project.network
        state.projects[id].contracts = project.contracts
        state.projects[id].updatedAt = new Date().toUTCString()

        return { state }
    }

    if (action.input.function === 'get') {
        const id = input.id || ''

        if (!state.projects[id]) {
            throw new ContractError('Project does not exist')
        }

        const result = state.projects[id]

        return { result }
    }

    if (action.input.function === 'delete') {
        const id = input.id || ''

        if (!state.projects[id]) {
            throw new ContractError('Project does not exist')
        }

        if (state.projects[id].creator !== action.caller) {
            throw new ContractError('Project is owned by another caller')
        }

        delete state.projects[id]

        return { state }
    }

    if (action.input.function === 'getByCreator') {
        let result: ProjectList = {}

        for (let key in state.projects) {
            if (state.projects[key].creator === action.caller) {
                result[key] = state.projects[key]
            }
        }

        return { result }
    }

    throw new ContractError(`No function supplied or function not recognised: "${input.function}"`)
}