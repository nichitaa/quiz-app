import QuizApiService from '../../services/quizApi';
import { IQuestion, IQuiz } from '../../types';
import QuestionCard from '../../components/question-card/question-card';
import { Alert, Col, message, Row, Spin, Typography } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { QuizzesState } from '../../store/quizzes/reducer';
import { nextServerAPI } from '../../config/constants';
import Head from 'next/head';

interface MainProps {
  quizzes: QuizzesState;
  quizId: string;
  quiz: IQuiz;
}

const Quiz: FC<MainProps> = ({ quizId, quiz, quizzes }) => {

  const router = useRouter();
  const [quizDetailsByUser, setQuizDetailsByUser] = useState<undefined | IQuestion[]>(undefined);

  if (router.isFallback) {
    return <Spin spinning={true} />;
  }

  /** on-mount (get quiz details by userId)*/
  useEffect(() => {
    if (!quizzes?.userId) {
      message.error('Please create a player first!', 3);
      router.push('/quizzes');
    } else {
      (async () => {
        const response = await fetch(`${nextServerAPI}/get-quiz-details?quizId=${quizId}&userId=${quizzes.userId}`)
          .then((res) => res.json());
        if (response.error) {
          message.error('Error getting quiz details for current user: ', response.error);
        } else {
          setQuizDetailsByUser(response.questions);
        }
      })();
    }
  }, []);

  return (
    <>
      <Head>
        <title>quiz - {quizId}</title>
        <meta property='og:title' content='quiz' key='title' />
      </Head>
      <Row gutter={[8, 8]} style={{ width: '100%', padding: '2rem' }}>
        <Col span={24}>
          <Typography.Title
            level={2}
            style={{ textAlign: 'center' }}
            className={'controls-text'}
          >
            <Typography.Text code={true}>{quiz.title} &nbsp;
              {!!quizzes.answers[quizId] && `[score: ${quizzes.answers[quizId]?.filter(el => el.correct).length}]`}
            </Typography.Text>
          </Typography.Title>
        </Col>

        <Alert
          style={{ width: '100%' }}
          message={<span style={{ fontStyle: 'italic', fontWeight: 'bold', fontSize: 14 }}>Note!</span>}
          description={
            <div style={{ fontSize: 13 }}>
              <span>* Each question has only a <strong>single</strong> correct answer</span>
              <br />
              <span>* You <strong>can not edit</strong> the submitted answer</span>
            </div>
          }
          type={'info'}
          showIcon={true}
        />

        {quizDetailsByUser?.map((q) => {
          return (
            <Col span={24} key={q.id}>
              <QuestionCard {...q} />
            </Col>
          );
        })}
      </Row>
    </>
  );
};

/**
 * Generate on build time the pages for quizzes
 * */
export const getStaticPaths = async () => {
  const quizzes = await QuizApiService.getInstance().getAllQuizzes();

  const paths = quizzes.map((q) => ({
    params: { quizId: q.id.toString(), quiz: q },
  }));
  return {
    paths: paths,
    fallback: 'blocking',
  };
};

/**
 * On build get the props for each quiz
 */
export const getStaticProps = async ({
                                       params,
                                     }: {
  params: { quizId: string };
}) => {
  const { quizId } = params;
  const quiz = await QuizApiService.getInstance().getQuizById(quizId);
  return {
    props: {
      quizId,
      quiz,
    },
  };
};


const mapDispatchToProps = (dispatch) => ({});

const mapStateToProps = (state) => ({
  quizzes: state.quizzesReducer,
});

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
