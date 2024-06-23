

import { useState, useEffect} from 'react';
import Desription from '../Description/Description';
import Options from '../Options/Options';
import Feedback from '../Feedback/Feedback';
import Notification from '../Notification/Notification';

export default function App(){

    const [feedback, setFeeddack] = useState(() => {
        const savedFeedback = localStorage.getItem('feedback')
        console.log('Loaded feedback from localStorage:', savedFeedback);
        return savedFeedback ? JSON.parse(savedFeedback) :  {
            good: 0,
            neutral: 0,
            bad: 0
        };  
    }     
    ) 

    useEffect(( )=> {
        console.log('Saving feedback to localStorage:', feedback);
        localStorage.setItem('feedback', JSON.stringify(feedback));
    }, [feedback])

    const updateFeedback = feedbackType => {
        // Тут використовуй сеттер, щоб оновити стан
        setFeeddack((prevFeedback) => ({
            ...prevFeedback,
            [feedbackType]: prevFeedback[feedbackType]+1,
        }))
        };  

        const totalFeedback = feedback.good + feedback.neutral + feedback.bad;

        const resetFeedback = ()=> {
            setFeeddack({
                good: 0,
                neutral: 0,
                bad:0
            });
        }

        const positive = totalFeedback?Math.round((feedback.good / totalFeedback) * 100):0;


    return(
        <>
        <Desription/>
        <Options 
        onLeaveFeedback ={updateFeedback} 
        onResetFeedback = {resetFeedback}
        totalFeedback={totalFeedback}
        />
        {totalFeedback > 0 ? (<Feedback
          feedback={feedback}
          totalFeedback={totalFeedback}
          positive={positive}
        />) : 
         (<Notification message="No feedback given" />)}
        </>
    )
      
    
  }
