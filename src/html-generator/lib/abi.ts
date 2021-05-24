export const filterAnonymousMethods = (abi = []) => abi.filter(({ name }) => name);

export const getEvents = (abi = []) => abi.filter(({ type }) => type === 'event');

export const getMethods = (abi = []) => abi.filter(({ type }) => type !== 'event');

export const getViewMethods = (abi = []) => abi.filter(({ stateMutability }) => stateMutability === 'view');

export const getTransactionMethods = (abi = []) =>
  abi.filter(
    ({ constant, type, stateMutability }) =>
      !constant &&
      type !== 'constructor' &&
      type !== 'event' &&
      stateMutability !== 'view' &&
      stateMutability !== 'pure',
  );
