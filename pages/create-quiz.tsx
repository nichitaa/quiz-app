import React, { Fragment, useState } from 'react';
import Head from 'next/head';
import { Alert, Button, Card, Col, Divider, Form, Input, Row, Select, Space, Typography } from 'antd';
import { DeleteOutlined, MinusCircleOutlined } from '@ant-design/icons';

const CreateQuiz = () => {
  const [form] = Form.useForm();
  const [questionsNo, setQuestionsNo] = useState(2);

  const onSubmit = (values) => {
    console.log('values: ', values);
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
                <Select placeholder={'no.'} value={questionsNo} onChange={handleQuestionNoChange}>
                  <Select.Option value={2}>2</Select.Option>
                  <Select.Option value={3}>3</Select.Option>
                  <Select.Option value={4}>4</Select.Option>
                  <Select.Option value={5}>5</Select.Option>
                </Select>
                &nbsp;questions
              </Typography.Text>
            </Typography.Title>
          </Col>
          <Col>
            <Card style={{ width: '100%', maxWidth: '600px' }}>
              <Form
                form={form}
                onFinish={onSubmit}
                labelAlign={'left'}
                initialValues={{ questions: [{}] }}
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
                    </div>
                  }
                  type={'info'}
                  showIcon={true}
                />

                <Divider />
                <Form.List name='questions'>
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, ...restField }) => (
                        <Fragment key={key}>
                          <Row gutter={[8, 8]}>
                            <Col span={22}>
                              <Form.Item
                                {...restField}
                                name={[name, 'question']}
                                rules={[{ required: true, message: 'Missing question ' }]}
                                wrapperCol={{ span: 24 }}
                                style={{ marginBottom: 0 }}
                              >
                                <Input.TextArea rows={1} placeholder={'Question text'} />
                              </Form.Item>
                            </Col>
                            <Col span={2}>
                              {fields.length > 1 ?
                                <Button block={true} icon={<DeleteOutlined />} onClick={() => remove(name)}
                                        danger={true} /> : null}

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
                          <Divider />
                        </Fragment>
                      ))}
                      {questionsNo && questionsNo > fields.length
                        && <Form.Item wrapperCol={{ span: 24 }}>
                          <Button type='dashed' onClick={() => add()} block={true}>
                            Add question
                          </Button>
                        </Form.Item>}

                      {questionsNo === fields.length &&
                        <Alert
                          style={{ marginBottom: 24 }}
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
                  <Row gutter={8} justify={'end'}>
                    <Col span={6}>
                      <Button
                        block={true}
                        type={'primary'}
                        danger={true}
                        onClick={() => form.resetFields()}
                      >
                        Discard
                      </Button>
                    </Col>
                    <Col span={6}>
                      <Button
                        block={true}
                        type={'primary'}
                        htmlType={'submit'}
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
    </>
  );
};

export default CreateQuiz;