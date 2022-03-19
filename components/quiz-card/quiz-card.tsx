import { Card } from 'antd';
import { FC } from 'react';
import { Index } from '../../types';
import { getRandomEmoji } from '../../utils';
import { useRouter } from 'next/router';

require('./quiz-card.less');

const QuizCard: FC<Index> = ({ title, id, questions_count }) => {
  const router = useRouter();

  const handleOnClick = () => {
    console.log('was clicked: ', id);
    router.push(`/quizzes/${id}`);
  };

  return (
    <Card
      className={'quiz-card'}
      title={title}
      style={{ width: '100%' }}
      hoverable={true}
      onClick={handleOnClick}
      bordered={false}
    >
      <p>
        {getRandomEmoji()} questions no. {questions_count}
      </p>
    </Card>
  );
};

export default QuizCard;
