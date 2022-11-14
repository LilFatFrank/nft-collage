import { useEffect, useState } from 'react'
import { withRouter } from 'react-router'
import {
  chain as allChains,
  useAccount,
  useConnect,
  useDisconnect,
  useNetwork,
} from 'wagmi'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import '../App.scss'
import { Style } from '../components'
import ColumnOne from './ColumnOne/ColumnOne'
import ColumnTwo from './ColumnTwo/ColumnTwo'

const Page = (props) => {
  const { isConnected: active, address: account } = useAccount()
  const { connect: activate } = useConnect({
    connector: new MetaMaskConnector({
      chains: [allChains.mainnet],
    }),
  })
  const { disconnect: deactivate } = useDisconnect()
  const { chain } = useNetwork()

  const [userNFTs, setUserNFTs] = useState([])
  const [allReceived, setAllReceived] = useState(false)
  const [pagination, setPagination] = useState({
    offset: 0,
    limit: 50,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [address, setAddress] = useState(undefined)

  useEffect(() => {
    if (props.match.params.address) setAddress(props.match.params.address)
  }, [props])

  useEffect(() => {
    if (address) {
      getNFTs(pagination)
      window.history.replaceState(null, '', `/${address}`)
    }
  }, [address])

  useEffect(() => {
    if (active) {
      getNFTs(pagination)
      window.history.replaceState(null, '', `/${account}`)
    } else {
      window.history.replaceState(null, '', `/`)
    }
  }, [active])

  useEffect(() => {
    if (
      userNFTs &&
      userNFTs?.length &&
      !allReceived &&
      userNFTs?.length < 250
    ) {
      updatePagination()
    }
  }, [userNFTs])

  useEffect(() => {
    if (active || address) getNFTs(pagination)
  }, [pagination])

  useEffect(() => {
    if (chain && chain.id) {
      if (chain?.id !== 1) setUserNFTs([])
    }
  }, [chain])

  const getNFTs = async (params) => {
    try {
      setLoading(true)
      const response = await fetch(
        `https://api.opensea.io/api/v1/assets?owner=${
          account || address
        }&offset=${params['offset']}&limit=${params['limit']}`,
        {
          headers: {
            Accept: 'application/json',
            'X-API-KEY': process.env.REACT_APP_API_KEY,
          },
        },
      )
      const data = await response.json()
      if (data) {
        if (data?.assets?.length === 0 || data?.assets?.length < 50)
          setAllReceived(true)
        setUserNFTs([...userNFTs, ...data?.assets])
        setLoading(false)
        setError(false)
      }
    } catch (e) {
      console.log(e)
      setLoading(false)
      setUserNFTs([])
      setError(true)
    }
  }

  const updatePagination = () => {
    setPagination({
      ...pagination,
      offset: pagination['offset'] + pagination['limit'],
    })
  }

  async function connect() {
    try {
      if (!active) {
        setUserNFTs([])
        setAddress('')
        setPagination({
          offset: 0,
          limit: 50,
        })
      }
      await activate()
    } catch (e) {
      console.log(e)
    }
  }

  async function disconnect() {
    try {
      deactivate()
      setUserNFTs([])
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <div className={`app`}>
        <img
          src={'assets/images/app-background.png'}
          alt={'app-background'}
          style={{
            position: 'fixed',
            height: '100%',
            width: '100%',
            top: 0,
            left: 0,
            zIndex: -2,
          }}
        />
        <Style />
        <ColumnOne
          active={active ? true : false}
          connect={connect}
          disconnect={disconnect}
        />
        <ColumnTwo
          active={active || address ? true : false}
          account={account || address}
          userNFTs={userNFTs}
          allReceived={allReceived}
          updatePagination={updatePagination}
          loading={loading}
          error={error}
        />
      </div>
    </>
  )
}

export default withRouter(Page)
