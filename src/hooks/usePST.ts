import useArweave from './useArweave';
import { readContract, selectWeightedPstHolder } from 'smartweave';
import { JWKInterface } from 'arweave/node/lib/wallet';

const PST_TOKEN_ID = 'd2D-oGZIHnuYzNtFnKtUVY4-xmmCKH8w6KUVKrrjtuc';

export default function usePST(wallet: JWKInterface) {
  const arweave = useArweave();

  const sendTip = async () => {
    const { balances } = await readContract(arweave, PST_TOKEN_ID);
    console.log(balances);
    const holder = selectWeightedPstHolder(balances);
    console.log(holder);
    const tx = await arweave.createTransaction(
      { target: holder, quantity: arweave.ar.arToWinston('0.001') },
      wallet! as JWKInterface,
    );
    await arweave.transactions.sign(tx, wallet! as JWKInterface);
    await arweave.transactions.post(tx);
  };

  return { sendTip };
}
