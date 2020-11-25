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
    admin: 'uhE-QeYS8i4pmUtnxQyHD7dzXFNaJ9oMK-IM-QPNY6M',
    user: 'VAg65x9jNSfO9KQHdd3tfx1vQa8qyCyJ_uj7QcxNLDk',
    nonuser: 'DiFv0MDBxKEFkJEy_KNgJXNG6mxxSTcxgV0h4gzAgsc'
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
                    abi: '[{}]'
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
                    abi: '[{"foo":"foo"}]'
                }
            }, caller: addresses.user
        })

        expect(state.contracts[updateId].name).toBe('My Contract (Updated)')
        expect(state.contracts[updateId].description).toBe('Blah blah blah (Updated)')
        expect(state.contracts[updateId].deployedAddress).toBe('0xCfb67396c3Af5Bb5B67381Dfa23f52A1A24E57cG')
        expect(state.contracts[updateId].network).toBe('rinkeby')
        expect(state.contracts[updateId].abi).toBe('[{"foo":"foo"}]')
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
 })