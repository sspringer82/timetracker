import './App.css';
import { BookingsProvider } from './BookingsContext';
import BookingsInfo from './info/BookingsInfo';
import BookingsList from './list/BookingsList';

function App() {
  return (
    <BookingsProvider>
      <h1>Timetracker</h1>
      <BookingsList />
      <BookingsInfo />
    </BookingsProvider>
  );
}

export default App;
