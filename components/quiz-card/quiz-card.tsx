import { Card } from 'antd';
import { FC } from 'react';
import { IQuiz } from '../../types/IQuiz';
import { getRandomEmoji } from '../../utils';
require('./quiz-card.less');

const QuizCard: FC<IQuiz> = ({ title, id, questions_count }) => {
  const handleOnClick = () => {
    console.log('was clicked: ', id);
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
