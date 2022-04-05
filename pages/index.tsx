import type { NextPage } from 'next';
import Head from 'next/head';
import { Button, Divider, Row, Col } from 'antd';
import { HomeActionCard } from '../components';

require('../styles/home-page.less');

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>quiz-app</title>
        <meta property="og:title" content="quiz-app" key="title" />
      </Head>
      <Row justify={'center'} align={'middle'} style={{ height: '100%' }}>
        <Row gutter={[8, 8]}>
          <Col>
            <HomeActionCard name={'Create player 🚀'} number={'01'} path={'/create-player'} />
          </Col>
          <Col>
            <HomeActionCard name={'See all quizzes 👀'} number={'02'} path={'/quizzes'} />
          </Col>
          <Col>
            <HomeActionCard name={'Create new quiz 👽'} number={'03'} path={'/create-quiz'} />
          </Col>
        </Row>
      </Row>
    </>
  );
};

export default Home;
