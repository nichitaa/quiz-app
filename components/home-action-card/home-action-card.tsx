import { FC } from 'react';
import { Typography } from 'antd';
import { useRouter } from 'next/router';

require('./home-action-card.less');

interface MainProps {
  number: string;
  name: string;
  text?: string;
  path: string;
}

const HomeActionCard: FC<MainProps> = (props) => {
  const { path, number, name, text } = props;

  const router = useRouter();

  const handleCardClick = () => {
    router.push(path);
  };

  return <div className='card' onClick={handleCardClick}>
    <div className='box'>
      <div className='content'>

        <h2><code>{number}</code></h2>

        <Typography.Title
          level={3}
          style={{ textAlign: 'center' }}
          className={'controls-text'}
        >
          <Typography.Text code={true}>
            {name} 🎉
          </Typography.Text>
        </Typography.Title>
        {text && <p>{text}</p>}

      </div>
    </div>
  </div>;
};

export default HomeActionCard;