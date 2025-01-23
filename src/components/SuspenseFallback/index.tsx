import { Flex, Spin } from 'antd'

const SuspenseFallback = () => {
  return (
    <Flex vertical justify='center' align='center' style={{ height: '100%' }}>
      <Spin tip='Loading' size="large" />
    </Flex>
  )

}

export default SuspenseFallback
