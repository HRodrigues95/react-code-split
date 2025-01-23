import { useNavigate } from "react-router-dom"
import { Button, Flex, Typography } from "antd"

const NotFound = () => {
  const navigate = useNavigate()


  return (
    <Flex vertical align="center" justify="center" gap={8} style={{ height: "100%" }}>
      <Typography.Title>PAGE NOT FOUND</Typography.Title>

      <Button type="primary" onClick={() => navigate(-1)}>Go Back</Button>
      <Button type="primary" onClick={() => navigate('/')}>Go Home</Button>
    </Flex>
  )
}

export default NotFound
