/* eslint-disable no-undef */
import { validateProject, isBool } from './utils'

/**
* Project
*  name: string
*  description: string
*  coverImg: string
*  network: string
*  contracts: string[]
*  creator: string
*  createdAt: string
*  updatedAt: string
*  isPaused: boolean
*  isLocked: boolean
*/

export function handle(state, action) {
    
    if (action.input.function === 'create') { 
        validateProject(action.input)
        
        state.projects[SmartWeave.transaction.id] = {
            name: action.input.name,
            description: action.input.description,
            coverImg: action.input.coverImg,
            network: action.input.network,
            contracts: action.input.contracts,
            creator: SmartWeave.transaction.owner,
            createdAt: new Date().toUTCString(),
            updatedAt: new Date().toUTCString(),
            isPaused: false,
            isLocked: false
        }

        return { state }
    }

    if (action.input.function === 'update') {

        if (!state.projects[action.input.id]) {
            throw new ContractError('Project deos not exist')
        }

        validateProject(action.input)

        state.projects[action.input.id].name = action.input.name
        state.projects[action.input.id].description = action.input.description
        state.projects[action.input.id].coverImg = action.input.coverImg
        state.projects[action.input.id].network = action.input.network
        state.projects[action.input.id].contracts = action.input.contracts
        state.projects[action.input.id].updatedAt = new Date().toUTCString()

        return { state }
    }

    if (action.input.function === 'setPaused') {

        if (!state.projects[action.input.id]) {
            throw new ContractError('Project deos not exist')
        }

        if (!isBool(action.input.isPaused)) {
            throw new ContractError('Invalid paused state provided')
        }

        state.projects[action.input.id].isPaused = action.input.isPaused
        state.projects[action.input.id].updatedAt = new Date().toUTCString()

        return { state }
    }

    if (action.input.function === 'setLocked') {

        if (!state.projects[action.input.id]) {
            throw new ContractError('Project does not exist')
        }

        if (!isBool(action.input.isLocked)) {
            throw new ContractError('Invalid locked state provided')
        }

        state.projects[action.input.id].isLocked = action.input.isLocked
        state.projects[action.input.id].updatedAt = new Date().toUTCString()

        return { state }
    }

    throw new ContractError('Invalid input')
}