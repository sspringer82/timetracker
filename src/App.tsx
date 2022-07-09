import { Route, Routes, Link, Outlet } from 'react-router-dom';
import './App.css';
import { BookingsProvider } from './bookings/BookingsContext';
import BookingsInfo from './bookings/info/BookingsInfo';
import BookingsList from './bookings/list/BookingsList';
import useBookingsList from './bookings/list/useBookingsList';
import Form from './bookings/form/Form';
import { Dialog } from '@mui/material';
import { Provider } from 'react-redux';
import { store } from './store';
import LanguageSwitch from './LanguageSwitch';

function App() {
  const { handleSave } = useBookingsList();

  return (
    <Provider store={store}>
      <BookingsProvider>
        <LanguageSwitch />
        <h1>Timetracker</h1>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <BookingsList />
                <BookingsInfo />
                <Outlet />
              </>
            }
          >
            <Route
              path=":id"
              element={
                <Dialog open={true} data-testid="edit-dialog">
                  <Form onSave={handleSave} />
                  <Link to="/">close</Link>
                </Dialog>
              }
            />
          </Route>

          <Route path="/create" element={<Form onSave={handleSave} />} />
          <Route path="/edit/:id" element={<Form onSave={handleSave} />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
        <Link to="/create">Neu</Link>
      </BookingsProvider>
    </Provider>
  );
}

export default App;
