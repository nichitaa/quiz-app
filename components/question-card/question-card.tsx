import { Button, Card, Col, Form, Row, Radio } from 'antd';
import { FC } from 'react';
import { IQuestion } from '../../types';

require('./question-card.less');

const QuestionCard: FC<IQuestion> = ({
  id,
  question,
  answered_correctly,
  answers,
  submitted_answer,
}) => {

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    console.log({ values });
  };
  const handleOnClick = () => {
    console.log('was clicked: ', id);
  };

  return (
    <Form form={form} onFinish={onFinish}>
      <Card
        className={'question-card'}
        title={
          <Row gutter={[8, 8]} justify={'space-between'}>
            <Col>* {question}</Col>
            <Col>
              <Button htmlType={'submit'}>Submit</Button>
            </Col>
          </Row>
        }
        style={{ width: '100%' }}
        onClick={handleOnClick}
        bordered={false}
      >
        <Form.Item name={'answer'} rules={[{ required: true }]}>
          <Radio.Group>
            {answers.map((a) => (
              <Radio value={a} key={a}>
                {a}
              </Radio>
            ))}
          </Radio.Group>
        </Form.Item>
      </Card>
    </Form>
  );
};

export default QuestionCard;
