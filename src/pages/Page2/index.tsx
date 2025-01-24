import { FunctionComponent, lazy, Suspense } from "react";
import { Flex, Typography } from "antd";
// Components
import SuspenseFallback from "../../components/SuspenseFallback";
// Styles

// Dynamic imports
const Form1 = lazy(() => import("../../components/Form1"))

const Page2: FunctionComponent = () => {
  return (
    <Flex vertical justify='center' align='center' style={{ height: '100%' }}>
      <Typography.Title>Page 2</Typography.Title>

      <Suspense fallback={<SuspenseFallback />}>
        <Form1 type='something' />
      </Suspense>
    </Flex>
  )
}

export default Page2
