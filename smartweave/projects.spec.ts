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

const { handle } = require('./projects.ts')

let { handler, swGlobal } = createContractExecutionEnvironment(arweave, handle.toString(), '4-YMdP_cr5BPzunSfFmtdXX_taJapeUDzwkaScVVRTA')

const addresses = {
    admin: 'uhE-QeYS8i4pmUtnxQyHD7dzXFNaJ9oMK-IM-QPNY6M',
    user: 'VAg65x9jNSfO9KQHdd3tfx1vQa8qyCyJ_uj7QcxNLDk',
    nonuser: 'DiFv0MDBxKEFkJEy_KNgJXNG6mxxSTcxgV0h4gzAgsc'
};

describe('Create, Update, Fetch Projects', () => {

    let state: any

    beforeEach(() => {
        state = JSON.parse(fs.readFileSync('./smartweave/projects.json', 'utf8'))
    })
   
    it('Should create new projects', () => {
        handler(state, {
            input: {
                function: 'create',
                project:  {
                    name: 'My Project',
                    description: 'Blah blah blah',
                    coverImg: 'https://example.com/cover.png',
                    network: 'mainnet',
                    contracts: []
                }
            }, caller: addresses.user
        })

        expect(Object.keys(state.projects).length).toBe(1)
    })

    it('Should update an existing project', () => {
        handler(state, {
            input: {
                function: 'create',
                project: {
                    name: 'My Project',
                    description: 'Blah blah blah',
                    coverImg: 'https://example.com/cover.png',
                    network: 'mainnet',
                    contracts: []
                }
            }, caller: addresses.user
        })

        const updateId = Object.keys(state.projects)[0]

        handler(state, {
            input: {
                function: 'update',
                id: updateId,
                project: {
                    name: 'My Project (Updated)',
                    description: 'Blah blah blah (Updated)',
                    coverImg: 'https://example.com/cover_updated.png',
                    network: 'rinkeby',
                    contracts: [
                        '0xCfb67396c3Af5Bb5B67381Dfa23f52A1A24E57cF'
                    ]
                }
            }, caller: addresses.user
        })

        expect(state.projects[updateId].name).toBe('My Project (Updated)')
        expect(state.projects[updateId].description).toBe('Blah blah blah (Updated)')
        expect(state.projects[updateId].coverImg).toBe('https://example.com/cover_updated.png')
        expect(state.projects[updateId].network).toBe('rinkeby')
        expect(state.projects[updateId].contracts[0]).toBe('0xCfb67396c3Af5Bb5B67381Dfa23f52A1A24E57cF')
    })

    it('Should fetch an existing project', async () => {
        const project = {
            name: 'My Project',
            description: 'Blah blah blah',
            coverImg: 'https://example.com/cover.png',
            network: 'mainnet',
            contracts: []
        }

        handler(state, {
            input: {
                function: 'create',
                project 
            }, caller: addresses.user
        })

        const fetchId = Object.keys(state.projects)[0]

        const data = await handler(state, {
            input: {
                function: 'get',
                id: fetchId
            }, caller: addresses.user
        })

        expect(data.result.name).toBe('My Project')
        expect(data.result.description).toBe('Blah blah blah')
        expect(data.result.coverImg).toBe('https://example.com/cover.png')
        expect(data.result.network).toBe('mainnet')
    })
 })