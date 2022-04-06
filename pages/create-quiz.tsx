import React, { FC, Fragment, useEffect, useState } from 'react';
import Head from 'next/head';
import { Alert, Button, Card, Col, Divider, Form, Input, message, Row, Select, Space, Typography } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { nextServerAPI } from '../config/constants';
import { connect } from 'react-redux';
import { QuizzesState } from '../store/quizzes/reducer';
import { useRouter } from 'next/router';
import { shuffleArray } from '../utils';


interface MainProps {
  quizzes: QuizzesState;
}

const CreateQuiz: FC<MainProps> = ({ quizzes }) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [questionsNo, setQuestionsNo] = useState(2);

  /** on-mount (check userId)*/
  useEffect(() => {
    if (!quizzes?.userId) {
      message.error('Please create a player first!', 3);
      router.push('/create-player');
    }
  }, []);

  const onSubmit = async (values) => {
    const questions = values.questions.map(el => {
      // 2 required, 2 optional, 1 correct
      let answers = [el.correct_answer, el.answer1, el.answer2, el.answer3, el.answer4]
        .filter(i => i);
      answers = shuffleArray(answers);
      return {
        answers,
        question: el.question,
        correct_answer: el.correct_answer,
      };
    });
    const payload = {
      data: {
        questions,
        title: values.title,
      },
    };
    const response = await fetch(`${nextServerAPI}/create-quiz`, {
      method: 'POST',
      body: JSON.stringify(payload),
    }).then(res => res.json());
    if ('error' in response) {
      return message.error(response.error, 3);
    }

    form.resetFields();
    return message.success(`Successfully create question with Id: ${response.id}`, 3);
  };

  const handleQuestionNoChange = (nr) => {
    setQuestionsNo(nr);
    const formValues = form.getFieldsValue();
    const questions = formValues.questions;

    if (formValues.questions?.length > nr) {
      form.setFieldsValue({
        questions: questions.slice(0, nr),
      });
    }
  };
  return (
    <>
      <Head>
        <title>create a new quiz</title>
        <meta property='og:title' content='create a new quiz' key='title' />
      </Head>
      <Row justify={'center'} style={{ height: '100%', paddingTop: '1rem' }}>
        <Col>
          <Col>
            <Typography.Title
              level={2}
              style={{ textAlign: 'center' }}
              className={'controls-text'}
            >
              <Typography.Text code={true}>
                Create a quiz of maximum&nbsp;
                <Select placeholder={'no.'} value={questionsNo} status={'warning'} onChange={handleQuestionNoChange}>
                  <Select.Option value={2}>2</Select.Option>
                  <Select.Option value={3}>3</Select.Option>
                  <Select.Option value={4}>4</Select.Option>
                  <Select.Option value={5}>5</Select.Option>
                </Select>
                &nbsp;questions 🤔
              </Typography.Text>
            </Typography.Title>
          </Col>
          <Col>
            <Card style={{ maxWidth: '650px' }}>
              <Form
                form={form}
                onFinish={onSubmit}
                labelAlign={'left'}
                initialValues={{ questions: [{}] }}
                colon={false}
              >
                <Form.Item label={'Title'} name={'title'} rules={[{ required: true }]}>
                  <Input
                    placeholder={'e.g.: My awesome quiz'}
                  />
                </Form.Item>
                <Alert
                  message={<span style={{ fontStyle: 'italic', fontWeight: 'bold', fontSize: 14 }}>Note!</span>}
                  description={
                    <div style={{ fontSize: 13 }}>
                      <span>* Correct answer will be automatically added to question options</span>
                      <br />
                      <span>* Two additional question answers are required (a, b - required and c,d - optional)</span>
                      <br />
                      <span>* Changing the question no from a greater to a smaller value will delete last questions</span>
                      <br />
                      <span>* The new quiz will appear in the quizzes list in a few seconds after creating it</span>
                    </div>
                  }
                  type={'info'}
                  showIcon={true}
                />
                <Form.List name='questions'>
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, ...restField }) => (
                        <Fragment key={key}>
                          <Divider orientation={'left'} plain={true}>
                            <span style={{
                              fontSize: '14px',
                              fontWeight: 'normal',
                              fontStyle: 'italic',
                              opacity: 0.7,
                            }}>
                              question {name + 1}
                            </span>
                          </Divider>
                          <Row gutter={[8, 8]}>
                            <Col span={22}>
                              <Form.Item
                                {...restField}
                                name={[name, 'question']}
                                rules={[{ required: true, message: 'Missing question ' }]}
                                wrapperCol={{ span: 24 }}
                                style={{ marginBottom: 0 }}
                              >
                                <Input.TextArea rows={1} placeholder={'Question text'} maxLength={300} />
                              </Form.Item>
                            </Col>
                            <Col span={2}>
                              <Button
                                block={true}
                                icon={<DeleteOutlined />}
                                onClick={() => remove(name)}
                                danger={true}
                                disabled={fields.length === 1}
                              />
                            </Col>
                            <Col span={24}>
                              <Form.Item
                                {...restField}
                                name={[name, 'correct_answer']}
                                rules={[{ required: true, message: 'Missing correct answer' }]}
                                wrapperCol={{ span: 24 }}
                                style={{ marginBottom: 0 }}
                              >
                                <Input placeholder={'Correct answer'} />
                              </Form.Item>
                            </Col>
                            <Col lg={12} xs={24}>
                              <Form.Item
                                {...restField}
                                name={[name, 'answer1']}
                                rules={[{ required: true, message: 'Missing option ( a )' }]}
                                wrapperCol={{ span: 24 }}
                                style={{ marginBottom: 0 }}
                              >
                                <Input placeholder={'Option ( a )'} />
                              </Form.Item>
                            </Col>
                            <Col lg={12} xs={24}>
                              <Form.Item
                                {...restField}
                                name={[name, 'answer2']}
                                rules={[{ required: true, message: 'Missing option ( b )' }]}
                                wrapperCol={{ span: 24 }}
                                style={{ marginBottom: 0 }}
                              >
                                <Input placeholder={'Option ( b )'} />
                              </Form.Item>
                            </Col>
                            <Col lg={12} xs={24}>
                              <Form.Item
                                {...restField}
                                name={[name, 'answer3']}
                                wrapperCol={{ span: 24 }}
                                style={{ marginBottom: 0 }}
                              >
                                <Input placeholder={'Option ( c )'} />
                              </Form.Item>
                            </Col>
                            <Col lg={12} xs={24}>
                              <Form.Item
                                {...restField}
                                name={[name, 'answer4']}
                                wrapperCol={{ span: 24 }}
                                style={{ marginBottom: 0 }}
                              >
                                <Input placeholder={'Option ( d )'} />
                              </Form.Item>
                            </Col>
                          </Row>
                        </Fragment>
                      ))}
                      {questionsNo && questionsNo > fields.length
                        && <Form.Item wrapperCol={{ span: 24 }} style={{ marginTop: 24 }}>
                          <Button type='dashed' onClick={() => add()} block={true}>
                            Add question
                          </Button>
                        </Form.Item>}

                      {questionsNo === fields.length &&
                        <Alert
                          style={{ margin: '24px 0' }}
                          message={<span style={{ fontStyle: 'italic', fontWeight: 'bold', fontSize: 14 }}>Reached questions limit!</span>}
                          type={'warning'}
                          description={
                            <div style={{ fontSize: 13 }}>
                              <span>{`You've defined the maximum number of questions as ${questionsNo}.`}</span>
                            </div>
                          }
                          showIcon={true}
                        />
                      }
                    </>
                  )}
                </Form.List>

                <Form.Item>
                  <Row gutter={8} justify={'space-between'}>
                    <Button onChange={() => router.push('/quizzes')}>
                      See all quizzes
                    </Button>
                    <Space direction={'horizontal'}>
                      <Button
                        block={true}
                        type={'primary'}
                        danger={true}
                        onClick={() => form.resetFields()}
                      >
                        Discard
                      </Button>
                      <Button
                        block={true}
                        type={'primary'}
                        htmlType={'submit'}
                      >
                        Create
                      </Button>
                    </Space>
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

const mapDispatchToProps = (dispatch) => ({});

const mapStateToProps = (state) => ({
  quizzes: state.quizzesReducer,
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateQuiz);