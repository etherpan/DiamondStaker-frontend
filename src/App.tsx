import React, { lazy } from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { ResetCSS } from '@pancakeswap/uikit'
import { QueryParamProvider } from 'use-query-params';
import BigNumber from 'bignumber.js'
import { usePollFarmsData } from 'state/farms/hooks'
import useEagerConnect from 'hooks/useEagerConnect'
import { DatePickerPortal } from 'components/DatePicker'
import GlobalStyle from './style/Global'
import Menu from './components/Menu'
import SuspenseWithChunkError from './components/SuspenseWithChunkError'
import { ToastListener } from './contexts/ToastsContext'
import PageLoader from './components/Loader/PageLoader'
import EasterEgg from './components/EasterEgg'
import history from './routerHistory'

// Route-based code splitting
// Only pool is included in the main bundle because of it's the most visited page
const Home = lazy(() => import('./views/Home'))
const Dashbaord = lazy(() => import('./views/Farms'))
const NotFound = lazy(() => import('./views/NotFound'))
const Dice = lazy(() => import('./views/Dice'))

// This config is required for number formatting
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const App: React.FC = () => {
  useEagerConnect()
  return (
    <Router>
      <QueryParamProvider ReactRouterRoute={Route}>
      <ResetCSS />
      <GlobalStyle />
      <Menu>
        <SuspenseWithChunkError fallback={<PageLoader />}>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/invest">
              <Dashbaord />
            </Route>
            <Route path="/dice">
              <Dice />
            </Route>

            {/* 404 */}
            <Route component={NotFound} />
          </Switch>
        </SuspenseWithChunkError>
      </Menu>
      <EasterEgg iterations={2} />
      <ToastListener />
      <DatePickerPortal />
      </QueryParamProvider>
    </Router>
  )
}

export default React.memo(App)
