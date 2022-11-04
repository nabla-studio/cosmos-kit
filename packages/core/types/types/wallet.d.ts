/// <reference types="long" />
import { AminoSignResponse, StdSignDoc } from '@cosmjs/amino';
import { DirectSignResponse, OfflineDirectSigner, OfflineSigner } from '@cosmjs/proto-signing';
import { IconType } from 'react-icons';
import { ChainWalletBase, MainWalletBase } from '../bases';
import { ChainRecord } from './chain';
import { Data } from './common';
export declare type WalletName = string;
export declare enum WalletStatus {
    Disconnected = "Disconnected",
    Connecting = "Connecting",
    Connected = "Connected",
    NotExist = "NotExist",
    Rejected = "Rejected",
    Error = "Error"
}
export interface DownloadInfo {
    browser?: string;
    os?: string;
    icon: IconType;
    link: string;
}
export interface Downloads {
    default: string;
    desktop?: DownloadInfo[];
    tablet?: DownloadInfo[];
    mobile?: DownloadInfo[];
}
export declare type WalletMode = 'extension' | 'wallet-connect';
export interface Wallet {
    name: WalletName;
    prettyName: string;
    mode: WalletMode;
    mobileDisabled: boolean;
    rejectMessage?: {
        source: string;
        target?: string;
    };
    connectEventNames?: string[];
    downloads?: Downloads;
    logo?: string;
}
export interface WalletAccount {
    name?: string;
    address: string;
}
export interface WalletClient {
    getAccount: (chainId: string) => Promise<WalletAccount>;
    getOfflineSigner: (chainId: string) => Promise<OfflineSigner> | OfflineSigner;
    enable?: (chainIds: string | string[]) => Promise<void>;
    addChain?: (chainInfo: ChainRecord) => Promise<void>;
    getOfflineSignerOnlyAmino?: (chainId: string) => OfflineSigner;
    getOfflineSignerAuto?: (chainId: string) => Promise<OfflineSigner | OfflineDirectSigner>;
    signAmino?: (chainId: string, signer: string, signDoc: StdSignDoc) => Promise<AminoSignResponse>;
    signDirect?: (chainId: string, signer: string, signDoc: {
        /** SignDoc bodyBytes */
        bodyBytes?: Uint8Array | null;
        /** SignDoc authInfoBytes */
        authInfoBytes?: Uint8Array | null;
        /** SignDoc chainId */
        chainId?: string | null;
        /** SignDoc accountNumber */
        accountNumber?: Long | null;
    }) => Promise<DirectSignResponse>;
    getEnigmaPubKey?: (chainId: string) => Promise<Uint8Array>;
    getEnigmaTxEncryptionKey?: (chainId: string, nonce: Uint8Array) => Promise<Uint8Array>;
    enigmaEncrypt?: (chainId: string, contractCodeHash: string, msg: object) => Promise<Uint8Array>;
    enigmaDecrypt?: (chainId: string, ciphertext: Uint8Array, nonce: Uint8Array) => Promise<Uint8Array>;
}
export interface ChainWalletData extends Data {
    username?: string;
    address?: string;
    offlineSigner?: OfflineSigner;
}
export interface MainWalletData extends Data {
    username?: string;
}
export declare type WalletData = ChainWalletData & MainWalletData;
export declare type WalletAdapter = ChainWalletBase | MainWalletBase;
export interface IChainWallet {
    new (walletInfo: Wallet, chainInfo: ChainRecord): ChainWalletBase;
}