import { useState} from 'react';
import PropTypes from "prop-types";
import './App.css';

import Section from './components/Section/Section';
import FeedbackOptions from './components/FeedbackOptions/FeedbackOptions';
import Statistics from './components/Statistics/Statistics';
import Notification from './components/Notification/Notification';

export default function App() {

  const [ good, setGood ] = useState(0);
  const [ bad, setBad ] = useState(0);
  const [ neutral, setNeutral ] = useState(0);

  const  onLeaveFeedback = evt => {
    switch (evt) {
      case 'good':
        setGood(good + 1);
        break;
      case 'bad':
        setBad(bad + 1);
        break;
      case 'neutral':
        setNeutral(neutral + 1);
        break;
      default:
        return;
    }
  };

  const countTotalFeedback = () => {
    return good + neutral + bad;
  };
  
  const  countPositiveFeedbackPercentage = () => {
    return Math.round((good  / countTotalFeedback()) * 100);
  };
  
  return (
    <>
        <Section title= "Please leave feedback">
          <FeedbackOptions
            options={['good', 'neutral', 'bad']}
            onLeaveFeedback={onLeaveFeedback}
          />
        </Section>

        <Section title="Statistics">
          {countTotalFeedback() === 0 ? (
            <Notification message={'No feedback given'} />
          ) : (
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={countTotalFeedback()}
              positivePercentage={countPositiveFeedbackPercentage()}
            />
          )}
        </Section>
      </>
  )
}

App.propTypes = {
    good: PropTypes.number,
    neutral: PropTypes.number,
    bad: PropTypes.number,
  }
