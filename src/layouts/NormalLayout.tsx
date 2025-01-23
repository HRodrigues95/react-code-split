import { FunctionComponent, Suspense, useEffect, useState } from "react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { Layout, Menu, MenuProps } from "antd"
// Components
import SuspenseFallback from "../components/SuspenseFallback"
// Styles
import './style.scss'

const { Header, Content, Footer } = Layout

const Options = [
  { key: 'Home', label: 'home', path: '/' },
  { key: 'Page1', label: 'page1', path: '/page1' },
  { key: 'Page2', label: 'page2', path: '/page2' },
]

const getMenuNavigate = (key: string) => {
  const item = Options.find((item) => item.key === key)
  if (item) return item.path
  return '/'
}

const NormalLayout: FunctionComponent = () => {
  // Router
  const navigate = useNavigate()
  const location = useLocation()
  // State
  const [current, setCurrent] = useState('home')

  useEffect(() => {
    console.log('location.pathname', location.pathname)
    const item = Options.find((item) => item.path === location.pathname)
    setCurrent(item?.key || 'home')
  }, [location.pathname])

  const handleTopMenuClick: MenuProps['onSelect'] = (e) => {
    setCurrent(e.key)
    navigate(getMenuNavigate(e.key))
  };

  return (
    <Layout>
      <Header className='layout-header'>
        <Menu
          theme='dark'
          mode='horizontal'
          defaultSelectedKeys={['home']}
          selectedKeys={[current]}
          items={Options}
          onSelect={handleTopMenuClick}
        />
      </Header>
      <Content>
        <Suspense fallback={<SuspenseFallback />}>
          <Outlet />
        </Suspense>
      </Content>
      <Footer>This is the Footer</Footer>
    </Layout>
  )
}

export default NormalLayout
