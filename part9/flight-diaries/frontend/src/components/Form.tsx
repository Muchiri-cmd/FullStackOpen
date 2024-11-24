import React ,{useState} from 'react'
import { Visibility,Weather,NewDiaryEntry } from '../../../backend/src/types';

const Form = ({ addEntry }: {addEntry:(entry:NewDiaryEntry) => void }) => {
    const [date,setDate] = useState('');
    const [visibility,setVisibility] = useState<Visibility>('' as Visibility);
    const [weather,setWeather] = useState<Weather>('' as Weather);
    const [comment,setComment] = useState('');

    const clearInputs = () => {
      setDate('');
      setVisibility('' as Visibility);
      setWeather('' as Weather);
      setComment('');
    }

    const handleSubmit = (event: React.SyntheticEvent) => {
      event.preventDefault();
      addEntry({ date, visibility, weather, comment });
      clearInputs();
    };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="date">
          Date:
          <input
            value={date}
            type="date"
            id="date"
            placeholder="yyyy-mm-dd"
            onChange={(event) => setDate(event.target.value)}
          />
        </label>
      </div>

      <div>
        <fieldset>
          <legend>Visibility</legend>
          {['great', 'good', 'ok', 'poor'].map((option) => (
            <label key={option} style={{ marginRight: '1rem' }}>
              <input
                type="radio"
                name="visibility"
                value={option}
                checked={visibility === option}
                onChange={() => setVisibility(option as Visibility)}
              />
              {option}
            </label>
          ))}
        </fieldset>
      </div>

      <div>
        <fieldset>
          <legend>Weather</legend>
          {['sunny', 'rainy', 'cloudy', 'stormy', 'windy'].map((option) => (
            <label key={option} style={{ marginRight: '1rem' }}>
              <input
                type="radio"
                name="weather"
                value={option}
                checked={weather === option}
                onChange={() => setWeather(option as Weather)}
              />
              {option}
            </label>
          ))}
        </fieldset>
      </div>

      <div>
        <label htmlFor="comment">
          Comment:
          <input
            value={comment}
            id="comment"
            placeholder="comment ..."
            onChange={(event) => setComment(event.target.value)}
          />
        </label>
      </div>

      <button type="submit">add</button>
    </form>
  );

}

export default Form
