import { FC } from 'react';

require('./home-action-card.less');
import Link from 'next/link';
import { Typography, Button } from 'antd';


interface MainProps {
  number: string;
  name: string;
  text: string;
  path: string;
}

const HomeActionCard: FC<MainProps> = (props) => {
  const { path, number, name, text } = props;
  return <div className='card'>
    <div className='box'>
      <div className='content'>

        <h2><code>{number}</code></h2>

        <Typography.Title
          level={3}
          style={{ textAlign: 'center' }}
          className={'controls-text'}
        >
          <Typography.Text code={true}>
            {name}
          </Typography.Text>
        </Typography.Title>
        <p>{text}</p>


        <Button size={'large'} type={'primary'}>
          <Link href={path}>
            🎉
          </Link>
        </Button>

      </div>
    </div>
  </div>;
};

export default HomeActionCard;