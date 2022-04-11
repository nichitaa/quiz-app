import { Button, Card, Col, Form, Input, message, Row, Typography } from 'antd';
import {
  adjectives,
  animals,
  uniqueNamesGenerator,
} from 'unique-names-generator';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createPlayer } from '../store/quizzes/actions';
import { QuizzesState } from '../store/quizzes/reducer';
import { FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

interface MainProps {
  quizzes: QuizzesState;

  createPlayer(args: { name: string; surname: string }): void;
}

const CreatePlayer: FC<MainProps> = (props) => {
  const { createPlayer, quizzes } = props;
  const [form] = Form.useForm();
  const router = useRouter();

  /** on-mount (notify user) */
  useEffect(() => {
    if (quizzes.userId) {
      message.info(`Looks like you have created your user (${quizzes.name} - ${quizzes.surname})`);
    }
  }, []);

  const onSubmit = async (values) => {
    await createPlayer(values);
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
    <>
      <Head>
        <title>create a new player</title>
        <meta property='og:title' content='create a new player' key='title' />
      </Head>
      <Row justify={'center'} align={'middle'} style={{ height: '100%' }}>
        <Col>
          <Col>
            <Typography.Title
              level={2}
              style={{ textAlign: 'center' }}
              className={'controls-text'}
            >
              <Typography.Text code={true}>
                {quizzes.userId
                  ? `Welcome ${quizzes.name} - ${quizzes.surname}`
                  : 'Create a new player'
                }
                😄🐱‍👤
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
                      {!!quizzes.userId
                        ? <Button
                          block={true}
                          onClick={() => router.push('/')}
                        >
                          Go to home page
                        </Button>
                        : <Button
                          block={true}
                          onClick={onGenerateName}
                          disabled={!!quizzes.userId}
                        >
                          Generate Random
                        </Button>}
                    </Col>
                    <Col span={12}>
                      {!!quizzes.userId
                        ? <Button
                          block={true}
                          type={'primary'}
                          onClick={() => router.push(`/quizzes`)}
                        >
                          See all quizzes
                        </Button>
                        : <Button
                          block={true}
                          type={'primary'}
                          htmlType={'submit'}
                          disabled={!!quizzes.userId}
                        >
                          Create
                        </Button>}
                    </Col>
                  </Row>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Col>
      </Row>
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  createPlayer: bindActionCreators(createPlayer, dispatch),
});

const mapStateToProps = (state) => ({
  quizzes: state.quizzesReducer,
});

export default connect(mapStateToProps, mapDispatchToProps)(CreatePlayer);
