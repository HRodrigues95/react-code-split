import { Button, Flex, Typography } from "antd"

const Component1 = () => {
  return (
    <Flex vertical>
      <Typography.Title>Component 1</Typography.Title>

      <Flex vertical>
        <Button>
          Button 1
        </Button>

        <Button>
          Button 2
        </Button>
      </Flex>
    </Flex>
  )
}

export default Component1
