import { Button, Card, Col, Form, Row, Radio, message, Alert, Space } from 'antd';
import { FC, useState } from 'react';
import { IQuestion, ISubmitQuestionBody } from '../../types';
import { connect } from 'react-redux';
import { QuizzesState } from '../../store/quizzes/reducer';
import { nextServerAPI } from '../../config/constants';
import { useRouter } from 'next/router';
import { bindActionCreators } from 'redux';
import { addQuizQuestionAnswerAction, IAddQuizQuestionAnswerActionPayload } from '../../store/quizzes/actions';

require('./question-card.less');

interface MainProps extends IQuestion {
  quizzes: QuizzesState;

  addQuizQuestionAnswer(payload: IAddQuizQuestionAnswerActionPayload): void;
}

interface ISubmittedDetailsState {
  sent: boolean;
  correct?: boolean;
  correct_answer?: string;
  id?: number;
  submitted_answer?: string;
}

const QuestionCard: FC<MainProps> = (props) => {
  const {
    id,
    question,
    answered_correctly,
    answers,
    submitted_answer,
    quizzes,
    addQuizQuestionAnswer,
  } = props;

  const router = useRouter();
  const { quizId } = router.query;

  const [form] = Form.useForm();
  const [submittedDetails, setSubmittedDetails] = useState<ISubmittedDetailsState>({
    sent: !!submitted_answer,
    submitted_answer,
  });

  const onFinish = async (values) => {
    const payload: ISubmitQuestionBody = {
      data: {
        user_id: quizzes.userId!,
        question_id: id,
        answer: values.answer,
      },
    };
    try {
      const response = await fetch(`${nextServerAPI}/submit-quiz-question`, {
        method: 'POST',
        body: JSON.stringify({ quizId, ...payload }),
      }).then((res) => res.json());
      if (response.error) {
        message.error('You already answered this question!');
      } else {
        addQuizQuestionAnswer({
          quizId: parseInt(quizId as string),
          answer: response,
        });
        setSubmittedDetails(prev => ({
          submitted_answer: values.answer,
          correct: response.correct,
          correct_answer: response.correct_answer,
          id: response.id,
          sent: true,
        }));
      }
    } catch (err) {
      // @ts-ignore
      message.error('Error on submit: ', err.message);
    }
  };

  return (
    <Form form={form} onFinish={onFinish} initialValues={{
      answer: submittedDetails.submitted_answer,
    }}>
      <Card
        className={'question-card'}
        title={
          <Row gutter={[8, 8]} justify={'space-between'}>
            <Col>* {question}</Col>
            <Col>
              {submittedDetails.sent
                && <>
                  {(submittedDetails.correct || answered_correctly)
                    ? <Alert message={'Correct ✅'} type={'success'} />
                    : <Alert
                      message={`Wrong ${submittedDetails.correct_answer ? `(correct answer: ${submittedDetails.correct_answer})` : ''} ❌`}
                      type={'error'} />}
                </>}
            </Col>
            <Col>
              <Button
                htmlType={'submit'}
                disabled={submittedDetails.sent}
              >
                Submit
              </Button>
            </Col>
          </Row>
        }
        style={{ width: '100%' }}
        bordered={false}
      >
        <Form.Item name={'answer'} rules={[{ required: true }]}>
          <Radio.Group disabled={submittedDetails.sent}>
            <Space direction={'vertical'}>
              {answers.map((a) => (
                <Radio value={a} key={a}>
                  {a}
                </Radio>
              ))}
            </Space>
          </Radio.Group>
        </Form.Item>
      </Card>
    </Form>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addQuizQuestionAnswer: bindActionCreators(addQuizQuestionAnswerAction, dispatch),
});

const mapStateToProps = (state) => ({
  quizzes: state.quizzesReducer,
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionCard);
