import { Button, Card, Col, Form, Input, message, Row, Typography } from 'antd';
import {
  adjectives,
  animals,
  uniqueNamesGenerator,
} from 'unique-names-generator';

const CreatePlayer = () => {
  const [form] = Form.useForm();

  const onSubmit = async (values) => {
    console.log({ values });
  };

  const onGenerateName = async () => {
    const [name, surname] = uniqueNamesGenerator({
      dictionaries: [adjectives, animals],
      length: 2,
      separator: '-',
      style: 'capital',
    }).split('-');
    message.success(`Hello 👋, ${name} ${surname}`);
    form.setFieldsValue({
      name,
      surname,
    });
  };

  return (
    <Row justify={'center'} align={'middle'} style={{ height: '100%' }}>
      <Col>
        <Col>
          <Typography.Title
            level={2}
            style={{ textAlign: 'center' }}
            className={'controls-text'}
          >
            <Typography.Text code={true}>
              Create a new player 😄🐱‍👤
            </Typography.Text>
          </Typography.Title>
        </Col>
        <Col>
          <Card style={{ width: '100%' }}>
            <Form form={form} onFinish={onSubmit} labelAlign={'left'}>
              <Form.Item name={'name'} rules={[{ required: true }]}>
                <Input placeholder={'Player name, e.g.: John'} />
              </Form.Item>
              <Form.Item name={'surname'} rules={[{ required: true }]}>
                <Input placeholder={'Player surname, e.g.: Doe'} />
              </Form.Item>
              <Form.Item>
                <Row gutter={8}>
                  <Col span={12}>
                    <Button block={true} onClick={onGenerateName}>
                      Generate Random
                    </Button>
                  </Col>
                  <Col span={12}>
                    <Button block={true} type={'primary'} htmlType={'submit'}>
                      Create
                    </Button>
                  </Col>
                </Row>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Col>
    </Row>
  );
};

export default CreatePlayer;
