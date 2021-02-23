import React from 'react'
import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core'
import { ModalProvider } from '@pancakeswap-libs/uikit'
import store from 'state'
import bsc, { UseWalletProvider } from '@binance-chain/bsc-use-wallet'
import { Provider } from 'react-redux'
import getRpcUrl from 'utils/getRpcUrl'
import { LanguageContextProvider } from 'contexts/Localisation/languageContext'
import { ThemeContextProvider } from 'contexts/ThemeContext'
import { BlockContextProvider } from 'contexts/BlockContext'
import { RefreshContextProvider } from 'contexts/RefreshContext'
import getLibrary from './utils/getLibrary'
import { NetworkContextName } from './constants'

const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName)

const Providers: React.FC = ({ children }) => {
  const rpcUrl = getRpcUrl()

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3ProviderNetwork getLibrary={getLibrary}>
        <Provider store={store}>
          <ThemeContextProvider>
            <LanguageContextProvider>
              <UseWalletProvider
                chainId={parseInt(process.env.REACT_APP_CHAIN_ID)}
                connectors={{
                  walletconnect: { rpcUrl },
                  bsc,
                }}
              >
                <BlockContextProvider>
                  <RefreshContextProvider>
                    <ModalProvider>{children}</ModalProvider>
                  </RefreshContextProvider>
                </BlockContextProvider>
              </UseWalletProvider>
            </LanguageContextProvider>
          </ThemeContextProvider>
        </Provider>
      </Web3ProviderNetwork>
    </Web3ReactProvider>
  )
}

export default Providers
