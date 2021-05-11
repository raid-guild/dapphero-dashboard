/* eslint-disable jest/no-conditional-expect */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Arweave from 'arweave/node';
import * as fs from 'fs';
import { createContractExecutionEnvironment } from './swglobal/contract-load';
require('typescript.api').register();

const arweave = Arweave.init({
  host: 'arweave.net',
  protocol: 'https',
  port: 443,
});

const { handle } = require('./projects.ts');

const { handler, swGlobal } = createContractExecutionEnvironment(
  arweave,
  handle.toString(),
  '4-YMdP_cr5BPzunSfFmtdXX_taJapeUDzwkaScVVRTA',
);

const addresses = {
  user: 'uhE-QeYS8i4pmUtnxQyHD7dzXFNaJ9oMK-IM-QPNY6M',
  otherUser: 'VAg65x9jNSfO9KQHdd3tfx1vQa8qyCyJ_uj7QcxNLDk',
};

describe('Create, Update, Fetch Projects', () => {
  let state: any;

  beforeEach(() => {
    state = JSON.parse(fs.readFileSync('./smartweave/projects.json', 'utf8'));
  });

  it('Should create new projects', () => {
    handler(state, {
      input: {
        function: 'create',
        project: {
          name: 'My Project',
          description: 'Blah blah blah',
          coverImg: 'https://example.com/cover.png',
          network: 'mainnet',
          provider: 'https://infura.io/blahblahblah',
          isPaused: true,
          isLocked: false,
          contracts: [],
        },
      },
      caller: addresses.user,
    });

    expect(Object.keys(state.projects).length).toBe(1);
  });

  it('Should update an existing project', () => {
    handler(state, {
      input: {
        function: 'create',
        project: {
          name: 'My Project',
          description: 'Blah blah blah',
          coverImg: 'https://example.com/cover.png',
          network: 'mainnet',
          provider: 'https://infura.io/blahblahblah',
          contracts: [],
        },
      },
      caller: addresses.user,
    });

    const updateId = Object.keys(state.projects)[0];

    handler(state, {
      input: {
        function: 'update',
        id: updateId,
        project: {
          name: 'My Project (Updated)',
          description: 'Blah blah blah (Updated)',
          coverImg: 'https://example.com/cover_updated.png',
          network: 'rinkeby',
          provider: 'https://infura.io/12345',
          contracts: ['0xCfb67396c3Af5Bb5B67381Dfa23f52A1A24E57cF'],
          isLocked: true,
          isPaused: true,
        },
      },
      caller: addresses.user,
    });

    expect(state.projects[updateId].name).toBe('My Project (Updated)');
    expect(state.projects[updateId].description).toBe('Blah blah blah (Updated)');
    expect(state.projects[updateId].coverImg).toBe('https://example.com/cover_updated.png');
    expect(state.projects[updateId].network).toBe('rinkeby');
    expect(state.projects[updateId].provider).toBe('https://infura.io/12345');
    expect(state.projects[updateId].isPaused).toBe(true);
    expect(state.projects[updateId].isLocked).toBe(true);
    expect(state.projects[updateId].contracts[0]).toBe('0xCfb67396c3Af5Bb5B67381Dfa23f52A1A24E57cF');
  });

  it('Should not allow updates of projects not owned by the caller', () => {
    handler(state, {
      input: {
        function: 'create',
        project: {
          name: 'My Project',
          description: 'Blah blah blah',
          coverImg: 'https://example.com/cover.png',
          network: 'mainnet',
          provider: 'https://infura.io/blahblahblah',
          contracts: [],
        },
      },
      caller: addresses.user,
    });

    const updateId = Object.keys(state.projects)[0];

    try {
      handler(state, {
        input: {
          function: 'update',
          id: updateId,
          project: {
            name: 'My Project (Updated)',
            description: 'Blah blah blah (Updated)',
            coverImg: 'https://example.com/cover_updated.png',
            network: 'rinkeby',
            provider: 'https://infura.io/12345',
            contracts: ['0xCfb67396c3Af5Bb5B67381Dfa23f52A1A24E57cF'],
          },
        },
        caller: addresses.otherUser,
      });
    } catch (err) {
      expect(err.name).toBe('ContractError');
    }

    expect(state.projects[updateId].name).toBe('My Project');
    expect(state.projects[updateId].description).toBe('Blah blah blah');
    expect(state.projects[updateId].coverImg).toBe('https://example.com/cover.png');
    expect(state.projects[updateId].network).toBe('mainnet');
    expect(state.projects[updateId].provider).toBe('https://infura.io/blahblahblah');
    expect(state.projects[updateId].contracts[0]).toBe(undefined);
  });

  it('Should fetch an existing project', async () => {
    const project = {
      name: 'My Project',
      description: 'Blah blah blah',
      coverImg: 'https://example.com/cover.png',
      network: 'mainnet',
      provider: 'https://infura.io/blahblahblah',
      contracts: [],
    };

    handler(state, {
      input: {
        function: 'create',
        project,
      },
      caller: addresses.user,
    });

    const fetchId = Object.keys(state.projects)[0];

    const data = await handler(state, {
      input: {
        function: 'get',
        id: fetchId,
      },
      caller: addresses.user,
    });

    expect(data.result.name).toBe('My Project');
    expect(data.result.description).toBe('Blah blah blah');
    expect(data.result.coverImg).toBe('https://example.com/cover.png');
    expect(data.result.network).toBe('mainnet');
    expect(data.result.provider).toBe('https://infura.io/blahblahblah');
  });

  it('Should delete an existing project', async () => {
    const project = {
      name: 'My Project',
      description: 'Blah blah blah',
      coverImg: 'https://example.com/cover.png',
      network: 'mainnet',
      provider: 'https://infura.io/blahblahblah',
      contracts: [],
    };

    handler(state, {
      input: {
        function: 'create',
        project,
      },
      caller: addresses.user,
    });

    const fetchId = Object.keys(state.projects)[0];

    await handler(state, {
      input: {
        function: 'delete',
        id: fetchId,
      },
      caller: addresses.user,
    });

    expect(state.projects[fetchId]).toBe(undefined);
  });

  it('Should fetch projects belonging to caller', async () => {
    const project = {
      name: 'My Project',
      description: 'Blah blah blah',
      coverImg: 'https://example.com/cover.png',
      network: 'mainnet',
      provider: 'https://infura.io/blahblahblah',
      contracts: [],
    };

    for (let i = 0; i < 3; i++) {
      handler(state, {
        input: {
          function: 'create',
          project,
        },
        caller: addresses.user,
      });
    }

    for (let j = 0; j < 4; j++) {
      handler(state, {
        input: {
          function: 'create',
          project,
        },
        caller: addresses.otherUser,
      });
    }

    const data = await handler(state, {
      input: {
        function: 'getByCreator',
      },
      caller: addresses.user,
    });

    let count = 0;
    for (const key in data.result) {
      expect(data.result[key].creator).toBe(addresses.user);
      count++;
    }
    expect(count).toBe(3);
  });
});
