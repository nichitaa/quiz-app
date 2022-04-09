import { FC } from 'react';
import QuizCard from '../../components/quiz-card/quiz-card';
import { Button, Col, Row, Tooltip, Typography } from 'antd';
import QuizApiService from '../../services/quizApi';
import { IQuiz } from '../../types';
import Head from 'next/head';
import { UndoOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';

interface MainProps {
  quizzes: IQuiz[];
}

const Quizzes: FC<MainProps> = ({ quizzes }) => {
  const router = useRouter();

  const handleReloadQuizzes = () => router.reload();

  return (
    <>
      <Head>
        <title>quizzes</title>
        <meta property='og:title' content='quizzes' key='title' />
      </Head>
      <Row gutter={[8, 8]} style={{ width: '100%', padding: '2rem' }}>
        <Col span={24}>
          <Typography.Title
            level={2}
            style={{ textAlign: 'center' }}
            className={'controls-text'}
          >
            <Typography.Text code={true}>
              <Row justify={'space-between'} style={{ width: '100%' }}>
                <Col>
                  {quizzes.length} available quizzes for you! 💡⚡
                </Col>
                <Col>
                  <Tooltip title={'reload the quizes'}>
                    <Button
                      icon={<UndoOutlined style={{ fontSize: '24px' }} />}
                      onClick={handleReloadQuizzes}
                      type={'primary'}
                      shape={'circle'}
                    />
                  </Tooltip>
                </Col>
              </Row>
            </Typography.Text>

          </Typography.Title>
        </Col>

        {quizzes.map((q) => (
          <Col xs={24} sm={12} md={8} lg={6} xl={4} key={q.id}>
            <QuizCard {...q} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export const getStaticProps = async (context) => {
  const quizzes = await QuizApiService.getInstance().getAllQuizzes();
  return {
    props: { quizzes },
    revalidate: 10,
  };
};

export default Quizzes;
