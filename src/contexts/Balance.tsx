import React from 'react';
import { JWKInterface } from 'arweave/node/lib/wallet';

import useArweave from 'hooks/useArweave';
import { ArWalletContext } from 'contexts/ArWallet';

export interface ContextValues {
  // eslint-disable-next-line
  arBalance?: any;
}

export const BalanceContext = React.createContext<ContextValues>({});

export const BalanceProvider: React.FC = ({ children }) => {
  const { wallet } = React.useContext(ArWalletContext);
  const arweave = useArweave();
  const [arBalance, setArBalance] = React.useState<string>();

  const fetchBalances = React.useCallback(async (wallet: JWKInterface) => {
    try {
      if (wallet) {
        arweave.wallets.jwkToAddress(wallet).then((address) => {
          arweave.wallets.getBalance(address).then((balance) => {
            setArBalance(balance);
          });
        });
      }
    } catch (e) {
      console.error(e);
      setArBalance('0');
    }
  }, []);

  React.useEffect((): (() => void) => {
    if (wallet) {
      fetchBalances(wallet);
      const refreshInterval = setInterval(() => fetchBalances(wallet), 10000);
      return () => clearInterval(refreshInterval);
    } else {
      setArBalance('0');
    }
    return () => null;
  }, [wallet, fetchBalances]);

  return (
    <BalanceContext.Provider
      value={{
        arBalance,
      }}
    >
      {children}
    </BalanceContext.Provider>
  );
};
