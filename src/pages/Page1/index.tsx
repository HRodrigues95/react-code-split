import { FunctionComponent, lazy, Suspense } from "react";
import { Flex, Typography } from "antd";
// Static imports
import SuspenseFallback from "../../components/SuspenseFallback";
// Styles

// Dynamic imports
const Form1 = lazy(() => import("../../components/Form1"))

const Page1: FunctionComponent = () => {
  return (
    <Flex vertical justify='center' align='center' style={{ height: '100%' }}>
      <Typography.Title>Page 1</Typography.Title>

      <Suspense fallback={<SuspenseFallback />}>
        <Form1 type='normal' />
      </Suspense>
    </Flex>
  )
}

export default Page1
