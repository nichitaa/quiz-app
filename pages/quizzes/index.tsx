import { FC } from 'react';
import QuizCard from '../../components/quiz-card/quiz-card';
import { Col, Row, Typography } from 'antd';
import QuizApiService from '../../services/quizApi';
import { Index } from '../../types';

interface MainProps {
  quizzes: Index[];
}

const Quizzes: FC<MainProps> = ({ quizzes }) => (
  <Row gutter={[8, 8]} style={{ width: '100%', padding: '2rem' }}>
    <Col span={24}>
      <Typography.Title
        level={2}
        style={{ textAlign: 'center' }}
        className={'controls-text'}
      >
        <Typography.Text code={true}>
          {quizzes.length} available quizzes! 💡⚡
        </Typography.Text>
      </Typography.Title>
    </Col>

    {quizzes.map((q) => (
      <Col xs={24} sm={12} md={8} lg={6} xl={4} key={q.id}>
        <QuizCard {...q} />
      </Col>
    ))}
  </Row>
);

export const getStaticProps = async (context) => {
  const quizzes = await QuizApiService.getInstance().getAllQuizzes();
  return { props: { quizzes } };
};

export default Quizzes;
