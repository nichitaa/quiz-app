import type { NextPage } from 'next';
import Head from 'next/head';
import { Col, Row, Typography } from 'antd';
import { HomeActionCard } from '../components';

require('../styles/home-page.less');

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>quiz-app</title>
        <meta property='og:title' content='quiz-app' key='title' />
      </Head>
      <Row justify={'center'} align={'middle'} style={{ height: '100%' }}>
        <Row gutter={[8, 8]}>
          <Col xs={24} lg={8}>
            <HomeActionCard name={'Create player 🚀'} number={'01'} path={'/create-player'} />
          </Col>
          <Col xs={24} lg={8}>
            <HomeActionCard name={'See all quizzes 👀'} number={'02'} path={'/quizzes'} />
          </Col>
          <Col xs={24} lg={8}>
            <HomeActionCard name={'Create new quiz 👽'} number={'03'} path={'/create-quiz'} requireUser={true} />
          </Col>
        </Row>
      </Row>
    </>
  );
};

export default Home;
