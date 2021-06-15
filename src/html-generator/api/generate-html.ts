import { getEntireHtml } from '../src';
import type { IProject } from 'utils/types';

const generateHTML = async (abis: any[], project: IProject): Promise<any> => {
  try {
    let projectNetworkId = 1;
    switch (project.network) {
      case 'mainnet':
        projectNetworkId = 1;
        break;
      case 'ropsten':
        projectNetworkId = 3;
        break;
      case 'rinkeby':
        projectNetworkId = 4;
        break;
      case 'goerli':
        projectNetworkId = 5;
        break;
      case 'kovan':
        projectNetworkId = 42;
        break;
      case 'xDai':
        projectNetworkId = 100;
        break;
      case 'maticMumbaiTestnet':
        projectNetworkId = 80001;
        break;
      default:
        projectNetworkId = 4;
    }

    const projectId = project.id;
    const projectNetworkName = project.network;
    const projectDescription = project.description;
    const projectImage = project.coverImg;
    const projectName = project.name;

    if (!projectId) {
      return console.error('Project id not defined');
    }
    if (!abis) {
      return console.error('ABIs not defined');
    }

    if (!Array.isArray(abis)) {
      return console.error('Invalid ABI');
    }

    const html = getEntireHtml({
      abis,
      projectId,
      projectNetworkId,
      projectNetworkName,
      projectDescription,
      projectImage,
      projectName,
    });
    return html;
  } catch (err) {
    console.error(`Can't generate HTML`, err);
  }
};

export default generateHTML;
