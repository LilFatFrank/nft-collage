import { isMobile, isTablet } from 'react-device-detect'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { WagmiConfig, createClient, configureChains, chain } from 'wagmi'
import { ConnectKitProvider } from 'connectkit'
import { infuraProvider } from 'wagmi/providers/infura'
import page from './page/page'

const infuraId = process.env.REACT_APP_INFURA_ID

const supportedChains = [chain.mainnet]

function App() {
  const { provider } = configureChains(supportedChains, [
    infuraProvider({ apiKey: infuraId }),
  ])
  const client = createClient({
    autoConnect: false,
    provider,
  })

  return isMobile || isTablet ? (
    <div className={`mobile`}>
      <img
        src={`assets/images/rainbow-cat.gif`}
        alt={'rainbow-cat'}
        style={{ width: '180px' }}
      />
      <div style={{ fontSize: isTablet ? '40px' : '32px' }}>
        Please use a desktop/laptop to view the NFTs. 💻
      </div>
    </div>
  ) : (
    <WagmiConfig client={client}>
      <ConnectKitProvider>
        <Router>
          <Switch>
            <Route exact path={'/'} component={page} />
            <Route exact path={'/:address'} component={page} />
          </Switch>
        </Router>
      </ConnectKitProvider>
    </WagmiConfig>
  )
}

export default App
