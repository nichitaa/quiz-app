import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Button, Divider } from 'antd';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>quiz-app</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Link href={'/quizzes'}>
        <Button size={'large'}>Quizzes</Button>
      </Link>
      <Divider/>

      <Link href={'/create-player'}>
        <Button size={'large'}>Create - player</Button>
      </Link>
    </>
  );
};

export default Home;
