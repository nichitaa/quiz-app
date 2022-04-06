import { FC } from 'react';
import { message, Typography } from 'antd';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { QuizzesState } from '../../store/quizzes/reducer';

require('./home-action-card.less');

interface MainProps {
  number: string;
  name: string;
  text?: string;
  path: string;
  quizzes: QuizzesState;
  requireUser?: boolean;
}

const HomeActionCard: FC<MainProps> = (props) => {
  const { path, number, name, text, quizzes, requireUser } = props;

  const router = useRouter();

  const handleCardClick = () => {
    if (requireUser && !quizzes.userId) {
      return message.error(`Please create a player first!`, 3);
    }
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

const mapDispatchToProps = (dispatch) => ({});

const mapStateToProps = (state) => ({
  quizzes: state.quizzesReducer,
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeActionCard);