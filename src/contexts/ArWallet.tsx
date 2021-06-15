import React from 'react';
import { JWKInterface } from 'arweave/node/lib/wallet';

export interface ContextValues {
  wallet: JWKInterface | null;
  uploadWallet: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  loginError: boolean;
}

export const ArWalletContext = React.createContext<ContextValues>({
  wallet: null,
  loginError: false,
  uploadWallet: (evt) => {
    return;
  },
});

export const ArWalletProvider: React.FC = ({ children }) => {
  const [wallet, setWallet] = React.useState<JWKInterface | null>(null);
  const [loginError, setLoginError] = React.useState<boolean>(false);

  const uploadWallet = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();

    fileReader.onload = async (e) => {
      try {
        setWallet(JSON.parse((e.target?.result as string) || ''));
      } catch (err) {
        setLoginError(true);
        console.error('Invalid wallet was uploaded.', err);
      }
    };

    if (evt.target.files?.length) {
      fileReader.readAsText(evt.target.files[0]);
    }
  };

  return (
    <ArWalletContext.Provider
      value={{
        wallet,
        loginError,
        uploadWallet,
      }}
    >
      {children}
    </ArWalletContext.Provider>
  );
};
