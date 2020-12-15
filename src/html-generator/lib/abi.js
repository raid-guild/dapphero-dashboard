const filterAnonymousMethods = (abi = []) => abi.filter(({ name }) => name);

const getEvents = (abi = []) => abi.filter(({ type }) => type === 'event');

const getMethods = (abi = []) => abi.filter(({ type }) => type !== 'event');

const getViewMethods = (abi = []) => abi.filter(({ stateMutability }) => stateMutability === 'view');

const getTransactionMethods = (abi = []) =>
  abi.filter(({ constant, type, stateMutability }) => !constant && type !== 'constructor' && type !== 'event' && stateMutability !== "view" && stateMutability !== "pure");

module.exports = { filterAnonymousMethods, getEvents, getMethods, getViewMethods, getTransactionMethods };
