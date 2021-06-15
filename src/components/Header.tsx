import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';

import { ArWalletContext } from 'contexts/ArWallet';
import useArweave from 'hooks/useArweave';

import { shortenAddress } from 'utils';

// Components
import { ButtonLink, ButtonAction1 } from './Buttons';
import { colors, shadows } from './Theme';
import { H1 } from './Typography';

const Header: React.FC<any> = ({ router }) => {
  const arweave = useArweave();
  const history = useHistory();
  const { wallet } = React.useContext(ArWalletContext);
  const [address, setAddress] = React.useState<string>('');

  React.useEffect(() => {
    if (wallet) {
      arweave.wallets.jwkToAddress(wallet).then((address) => {
        setAddress(address);
      });
    }
  }, [wallet]);

  return (
    <HeaderContainer>
      <H1>
        {wallet
          ? router === ''
            ? 'Projects'
            : router.charAt(0).toUpperCase() + router.slice(1)
          : 'You must connect your wallet to use app.'}
      </H1>
      <div>
        <a
          style={{
            marginRight: '20px',
          }}
          href="https://docs.dapphero.io/"
          target="_blank"
          rel="noreferrer"
        >
          <ButtonLink>Documentation</ButtonLink>
        </a>
        <ButtonAction1
          onClick={() => {
            history.push('/connect');
          }}
        >
          {wallet ? shortenAddress(address, 3) : 'Connect'}
        </ButtonAction1>
      </div>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
  background: ${colors.white};
  box-shadow: ${shadows.card};
  display: flex;
  grid-column: 2 / -1;
  grid-row: 1 / 2;
  justify-content: space-between;
  position: sticky;
  padding: 4rem 5rem;
  top: 0;
  z-index: 98;
`;
