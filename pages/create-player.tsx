import { Button, Card, Col, Form, Input, message, Row, Typography } from 'antd';
import {
  adjectives,
  animals,
  uniqueNamesGenerator,
} from 'unique-names-generator';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { wrapper } from '../store/store';
import { createPlayer } from '../store/quizzes/actions';
import QuizApiService from '../services/quizApi';
import { QuizzesState } from '../store/quizzes/reducer';
import { FC } from 'react';

interface MainProps {
  quizzes: QuizzesState;

  createPlayer(args: { name: string; surname: string }): void;
}

const CreatePlayer: FC<MainProps> = (props) => {
  const { createPlayer, quizzes } = props;
  const [form] = Form.useForm();

  console.log({ quizzes });
  const onSubmit = async (values) => {
    console.log({ values });
    createPlayer(values);
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
            <Form
              form={form}
              onFinish={onSubmit}
              labelAlign={'left'}
              initialValues={
                quizzes.userId
                  ? {
                      name: quizzes.name,
                      surname: quizzes.surname,
                    }
                  : undefined
              }
            >
              <Form.Item name={'name'} rules={[{ required: true }]}>
                <Input
                  placeholder={'Player name, e.g.: John'}
                  disabled={!!quizzes.userId}
                />
              </Form.Item>
              <Form.Item name={'surname'} rules={[{ required: true }]}>
                <Input
                  placeholder={'Player surname, e.g.: Doe'}
                  disabled={!!quizzes.userId}
                />
              </Form.Item>
              <Form.Item>
                <Row gutter={8}>
                  <Col span={12}>
                    <Button
                      block={true}
                      onClick={onGenerateName}
                      disabled={!!quizzes.userId}
                    >
                      Generate Random
                    </Button>
                  </Col>
                  <Col span={12}>
                    <Button
                      block={true}
                      type={'primary'}
                      htmlType={'submit'}
                      disabled={!!quizzes.userId}
                    >
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

const mapDispatchToProps = (dispatch) => ({
  createPlayer: bindActionCreators(createPlayer, dispatch),
});

const mapStateToProps = (state) => ({
  quizzes: state.quizzesReducer,
});

export default connect(mapStateToProps, mapDispatchToProps)(CreatePlayer);
