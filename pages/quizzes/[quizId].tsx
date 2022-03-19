import QuizApiService from '../../services/quizApi';
import { Index } from '../../types';
import QuestionCard from '../../components/question-card/question-card';
import { Col, Row, Typography } from 'antd';

const Quiz = ({ quizId, quiz }: { quizId: string; quiz: Index }) => {
  return (
    <Row gutter={[8, 8]} style={{ width: '100%', padding: '2rem' }}>
      <Col span={24}>
        <Typography.Title
          level={2}
          style={{ textAlign: 'center' }}
          className={'controls-text'}
        >
          <Typography.Text code={true}>{quiz.title}</Typography.Text>
        </Typography.Title>
      </Col>

      {quiz.questions?.map((q) => {
        return (
          <Col span={24} key={q.id}>
            <QuestionCard {...q} />
          </Col>
        );
      })}
    </Row>
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
    fallback: false,
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

export default Quiz;
