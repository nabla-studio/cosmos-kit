import { Wallet } from '@cosmos-kit/core';
import { MainWalletBase } from '@cosmos-kit/core';

import { ChainTerrastationExtension } from './chain-wallet';
import { TerrastationClient } from './client';
import { getTerrastationFromExtension } from './utils';

export class TerrastationExtensionWallet extends MainWalletBase {
  constructor(walletInfo: Wallet) {
    super(walletInfo, ChainTerrastationExtension);
  }

  async initClient() {
    this.initingClient();
    try {
      const terrastation = await getTerrastationFromExtension();
      this.initClientDone(
        terrastation ? new TerrastationClient(terrastation) : undefined
      );
    } catch (error) {
      this.logger?.error(error);
      this.initClientError(error);
    }
  }
}
