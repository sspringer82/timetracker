import { Route, Routes, Link, Outlet } from 'react-router-dom';
import './App.css';
import { BookingsProvider } from './BookingsContext';
import BookingsInfo from './info/BookingsInfo';
import BookingsList from './list/BookingsList';
import useBookingsList from './list/useBookingsList';
import Form from './form/Form';
import { Dialog } from '@mui/material';

function App() {
  const { handleSave } = useBookingsList();

  return (
    <BookingsProvider>
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
  );
}

export default App;
