import React, { useEffect, Suspense, lazy } from 'react'
import HomePage from 'pages/home/HomePage'
import MelonMarketPage from 'pages/melon-market/MelonMarketPage'
import SeedStorePage from 'pages/seed-store/SeedStorePage'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import BigNumber from 'bignumber.js'
import { useFetchProfile, useFetchPublicData } from 'state/hooks'
import GlobalStyle from './style/Global'
import ToastListener from './components/ToastListener'
import PageLoader from './components/PageLoader'

// Route-based code splitting
// Only pool is included in the main bundle because of it's the most visited page'
const Farms = lazy(() => import('./views/Farms'))
const NotFound = lazy(() => import('./views/NotFound'))

// This config is required for number formating
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const App: React.FC = () => {
  const { account, connect } = useWallet()

  // Monkey patch warn() because of web3 flood
  // To be removed when web3 1.3.5 is released
  useEffect(() => {
    console.warn = () => null
  }, [])

  useEffect(() => {
    if (!account && window.localStorage.getItem('accountStatus')) {
      connect('injected')
    }
  }, [account, connect])

  useFetchPublicData()
  useFetchProfile()

  return (
    <Router>
      <GlobalStyle />
      <Suspense fallback={<PageLoader />}>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/melon-market">
            <MelonMarketPage />
          </Route>
          <Route path="/seed-store">
            <SeedStorePage />
          </Route>
          <Route path="/farms">
            <HomePage />
          </Route>
          <Route path="/about">
            <HomePage />
          </Route>
          <Route component={NotFound} />
        </Switch>
      </Suspense>
      <ToastListener />
    </Router>
  )
}

export default React.memo(App)
