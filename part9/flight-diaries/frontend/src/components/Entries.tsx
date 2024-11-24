import { DiaryEntry } from '../../../backend/src/types';

const Entries = ({ entries }: { entries: DiaryEntry[] }) => (
  <div>
    {entries.map((entry) => (
      <div key={entry.id}>
        <h3>{entry.date}</h3>
        <p>
          Visibility: <span>{entry.visibility}</span>
        </p>
        <p>
          Weather: <span>{entry.weather}</span>
        </p>
      </div>
    ))}
  </div>
);

export default Entries;
