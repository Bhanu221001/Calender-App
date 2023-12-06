// App.js
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const App = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [jsonData, setJsonData] = useState([]); // Load JSON data here

  // Function to handle date selection
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // Function to filter JSON data based on selected date
  const getEventsForSelectedDate = () => {
    const selectedDateString = selectedDate.toISOString().split('T')[0];
    return jsonData.filter((event) => event.Date === selectedDateString);
  };
  

  return (
    <div>
      <h1>Calendar App</h1>
      <div>
        <Calendar onChange={handleDateChange} value={selectedDate} />
      </div>
      <div>
        <h2>Date : {selectedDate.toDateString()}:</h2>
        <ul>
          {getEventsForSelectedDate().map((event) => (
            <li key={event.Id}>
              <input type="checkbox" /> {event.Name} - {event.Time}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
