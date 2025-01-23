import { FunctionComponent, lazy, Suspense } from "react"
import { Flex, Typography } from "antd"
// Components
import SuspenseFallback from "../../components/SuspenseFallback"

// Components
import Component1 from "./components/Component1"
// Dynamic imports
// const Component1 = lazy(() => import("./components/Component1"))

const Home: FunctionComponent = () => {
  return (
    <Flex vertical align="center" justify="center" style={{ height: "100%" }}>
      <Typography.Title>Home Page</Typography.Title>

      <Suspense fallback={<SuspenseFallback />}>
        <Component1 />
      </Suspense>


      {/* <Component1 /> */}
    </Flex>
  )
}

export default Home
