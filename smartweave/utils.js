/* eslint-disable no-undef */
export function isString(val) {
    return typeof val === 'string'
}

export function isBool(val) {
    return typeof val === 'boolean'
}

export function validateProject(proj) {
    if (!isString(proj.name)) {
        throw new ContractError(`Invalid name provided: ${proj.name}`)
    }
    if (!isString(proj.description)) {
        throw new ContractError(`Invalid description provided: ${proj.description}`)
    }
    if (!isString(proj.coverImg)) {
        throw new ContractError(`Invalid coverImg provided: ${proj.coverImg}`)
    }
    if (!isString(proj.network)) {
        throw new ContractError(`Invalid network provided: ${proj.network}`)
    }
}

export function validateContract(contract) {

    if (!isString(contract.name)) {
        throw new ContractError(`Invalid name provided: ${contract.name}`)
    }
    if (!isString(contract.description)) {
        throw new ContractError(`Invalid description provided: ${contract.description}`)
    }
    if (!isString(contract.network)) {
        throw new ContractError(`Invalid network provided: ${contract.network}`)
    }
    if (!isString(contract.deployedAddress)) {
        throw new ContractError(`Invalid deployedAddress provided: ${contract.deployedAddress}`)
    }
    if (!isString(contract.abi)) {
        throw new ContractError(`Invalid abi provided: ${contract.abi}`)
    }
}