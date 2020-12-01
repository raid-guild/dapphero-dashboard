/* eslint-disable jest/no-conditional-expect */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Arweave from 'arweave/node';
import * as fs from 'fs';
import { createContractExecutionEnvironment } from './swglobal/contract-load'
require("typescript.api").register()

const arweave = Arweave.init({
    host: 'arweave.net',
    protocol: 'https',
    port: 443
})

const { handle } = require('./contracts.ts')

let { handler, swGlobal } = createContractExecutionEnvironment(arweave, handle.toString(), '4-YMdP_cr5BPzunSfFmtdXX_taJapeUDzwkaScVVRTA')

const addresses = {
    user: 'uhE-QeYS8i4pmUtnxQyHD7dzXFNaJ9oMK-IM-QPNY6M',
    otherUser: 'VAg65x9jNSfO9KQHdd3tfx1vQa8qyCyJ_uj7QcxNLDk'
};

describe('Create, Update, Fetch Contracts', () => {

    let state: any

    beforeEach(() => {
        state = JSON.parse(fs.readFileSync('./smartweave/contracts.json', 'utf8'))
    })
   
    it('Should create new contracts', () => {
        handler(state, {
            input: {
                function: 'create',
                contract:  {
                    name: 'My Contract',
                    description: 'Blah blah blah',
                    deployedAddress: '0xCfb67396c3Af5Bb5B67381Dfa23f52A1A24E57cF',
                    network: 'mainnet',
                    abi: '[{}]',
                    isLocked: true
                }
            }, caller: addresses.user
        })

        expect(Object.keys(state.contracts).length).toBe(1)
    })

    it('Should update an existing contract', () => {
        handler(state, {
            input: {
                function: 'create',
                contract: {
                    name: 'My Contract',
                    description: 'Blah blah blah',
                    deployedAddress: '0xCfb67396c3Af5Bb5B67381Dfa23f52A1A24E57cF',
                    network: 'mainnet',
                    abi: '[{}]'
                }
            }, caller: addresses.user
        })

        const updateId = Object.keys(state.contracts)[0]

        handler(state, {
            input: {
                function: 'update',
                id: updateId,
                contract: {
                    name: 'My Contract (Updated)',
                    description: 'Blah blah blah (Updated)',
                    deployedAddress: '0xCfb67396c3Af5Bb5B67381Dfa23f52A1A24E57cG',
                    network: 'rinkeby',
                    abi: '[{"foo":"foo"}]',
                    isLocked: true
                }
            }, caller: addresses.user
        })

        expect(state.contracts[updateId].name).toBe('My Contract (Updated)')
        expect(state.contracts[updateId].description).toBe('Blah blah blah (Updated)')
        expect(state.contracts[updateId].deployedAddress).toBe('0xCfb67396c3Af5Bb5B67381Dfa23f52A1A24E57cG')
        expect(state.contracts[updateId].network).toBe('rinkeby')
        expect(state.contracts[updateId].abi).toBe('[{"foo":"foo"}]')
        expect(state.contracts[updateId].isLocked).toBe(true)
    })

    it('Should not allow updates of contracts not owned by the caller', () => {
        handler(state, {
            input: {
                function: 'create',
                contract: {
                    name: 'My Contract',
                    description: 'Blah blah blah',
                    deployedAddress: '0xCfb67396c3Af5Bb5B67381Dfa23f52A1A24E57cF',
                    network: 'mainnet',
                    abi: '[{}]'
                }
            }, caller: addresses.user
        })

        const updateId = Object.keys(state.contracts)[0]

        try {
            handler(state, {
                input: {
                    function: 'update',
                    id: updateId,
                    contract: {
                        name: 'My Contract (Updated)',
                        description: 'Blah blah blah (Updated)',
                        deployedAddress: '0xCfb67396c3Af5Bb5B67381Dfa23f52A1A24E57cG',
                        network: 'rinkeby',
                        abi: '[{"foo":"foo"}]'
                    }
                }, caller: addresses.otherUser
            })
        } catch (err) {
            expect(err.name).toBe('ContractError')
        }

        expect(state.contracts[updateId].name).toBe('My Contract')
        expect(state.contracts[updateId].description).toBe('Blah blah blah')
        expect(state.contracts[updateId].deployedAddress).toBe('0xCfb67396c3Af5Bb5B67381Dfa23f52A1A24E57cF')
        expect(state.contracts[updateId].network).toBe('mainnet')
        expect(state.contracts[updateId].abi).toBe('[{}]')
    })

    it('Should fetch an existing contract', async () => {
        const contract = {
            name: 'My Contract',
            description: 'Blah blah blah',
            deployedAddress: '0xCfb67396c3Af5Bb5B67381Dfa23f52A1A24E57cF',
            network: 'mainnet',
            abi: '[{}]'
        }

        handler(state, {
            input: {
                function: 'create',
                contract 
            }, caller: addresses.user
        })

        const fetchId = Object.keys(state.contracts)[0]

        const data = await handler(state, {
            input: {
                function: 'get',
                id: fetchId
            }, caller: addresses.user
        })

        expect(data.result.name).toBe('My Contract')
        expect(data.result.description).toBe('Blah blah blah')
        expect(data.result.deployedAddress).toBe('0xCfb67396c3Af5Bb5B67381Dfa23f52A1A24E57cF')
        expect(data.result.network).toBe('mainnet')
    })

    it('Should delete an existing contract', async () => {
        const contract = {
            name: 'My Contract',
            description: 'Blah blah blah',
            deployedAddress: '0xCfb67396c3Af5Bb5B67381Dfa23f52A1A24E57cF',
            network: 'mainnet',
            abi: '[{}]'
        }

        handler(state, {
            input: {
                function: 'create',
                contract
            }, caller: addresses.user
        })

        const fetchId = Object.keys(state.contracts)[0]

        await handler(state, {
            input: {
                function: 'delete',
                id: fetchId
            }, caller: addresses.user
        })

        expect(state.contracts[fetchId]).toBe(undefined)
    })

    it('Should fetch contracts belonging to creator', async () => {
        const contract = {
            name: 'My Contract',
            description: 'Blah blah blah',
            deployedAddress: '0xCfb67396c3Af5Bb5B67381Dfa23f52A1A24E57cF',
            network: 'mainnet',
            abi: '[{}]'
        }

        for (let i = 0; i < 3; i++) {
            handler(state, {
                input: {
                    function: 'create',
                    contract
                }, caller: addresses.user
            })
        }

        for (let i = 0; i < 4; i++) {
            handler(state, {
                input: {
                    function: 'create',
                    contract
                }, caller: addresses.otherUser
            })
        }

        const data = await handler(state, {
            input: {
                function: 'getByCreator'
            }, caller: addresses.user
        })

        let count = 0
        for (let key in data.result) {
            expect(data.result[key].creator).toBe(addresses.user)
            count++
        }
        expect(count).toBe(3)
    })
 })