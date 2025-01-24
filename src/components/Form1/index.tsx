import { FunctionComponent } from "react"
import { Button, Flex, Input, Typography } from "antd"

interface Form1Props {
  type: string
  // Add props here
}

const Form1: FunctionComponent<Form1Props> = ({ type }) => {

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    console.log('Form submitted');

    // DOES SOMETHING
  }

  return (
    <form onSubmit={handleSubmit}>
      <Flex vertical>
        <Typography>Form 1</Typography>

        <Input placeholder="Input 1" />

        <Input placeholder="Input 2" />

        {type === 'something' && (
          <>
            <Input placeholder="Input optional 1" />

            <Input placeholder="Input optional 2" />
          </>
        )}

        <Flex vertical>
          <Button>
            Button 1
          </Button>

          <Button type='primary' htmlType='submit'>
            submit
          </Button>
        </Flex>
      </Flex>
    </form>
  )
}

export default Form1
