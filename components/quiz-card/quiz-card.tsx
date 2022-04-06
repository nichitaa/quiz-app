import { Card, message } from 'antd';
import { FC } from 'react';
import { IQuiz } from '../../types';
import { getRandomEmoji } from '../../utils';
import { useRouter } from 'next/router';
import { QuizzesState } from '../../store/quizzes/reducer';
import { connect } from 'react-redux';

require('./quiz-card.less');

interface MainProps extends IQuiz {
  quizzes: QuizzesState;
}

const QuizCard: FC<MainProps> = ({ title, id, questions_count, quizzes }) => {
  const router = useRouter();

  const handleOnClick = () => {
    if (!quizzes.userId) {
      return message.error('Please create a player first!');
    }
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

const mapDispatchToProps = (dispatch) => ({});

const mapStateToProps = (state) => ({
  quizzes: state.quizzesReducer,
});

export default connect(mapStateToProps, mapDispatchToProps)(QuizCard);
