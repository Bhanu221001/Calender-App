import React, { useState, useEffect } from 'react';

import SecondTask from './SecondTask'

const WeeklyScheduler = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [timezone, setTimezone] = useState('UTC');
  const [weeklyDays, setWeeklyDays] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);

  useEffect(() => {
    // Function to load weekly working days and times
    const loadWeeklySchedule = () => {
      const daysInWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

      const startOfWeek = new Date(currentDate);
      startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

      const schedule = [];

      for (let i = 0; i < 7; i++) {
        const day = new Date(startOfWeek);
        day.setDate(startOfWeek.getDate() + i);

        const dayData = {
          date: day,
          dayName: daysInWeek[i],
          times: Array.from({ length: 16 }, (_, index) => index + 8),
        };

        schedule.push(dayData);
      }

      setWeeklyDays(schedule);
    };

    loadWeeklySchedule();
  }, [currentDate]);

  useEffect(() => {
    // Function to handle timezone change
    const handleTimezoneChange = () => {
      // Perform any necessary timezone-related adjustments
      // In a real application, you would convert the times to the target timezone
      // For simplicity, this example only updates the timezone state.
      console.log(`Timezone changed to ${timezone}`);
    };

    handleTimezoneChange();
  }, [timezone]);

  // Function to handle checkbox change
  const handleCheckboxChange = (day, time) => {
    const updatedDays = [...selectedDays];
    const selectedDay = updatedDays.find((d) => d.day === day);

    if (selectedDay) {
      if (selectedDay.times.includes(time)) {
        selectedDay.times = selectedDay.times.filter((t) => t !== time);
      } else {
        selectedDay.times.push(time);
      }
    } else {
      updatedDays.push({
        day,
        times: [time],
      });
    }

    setSelectedDays(updatedDays);
  };

  return (
    <div>
      <div>
        {/* Date Display */}
        <p>Selected Date: {currentDate.toDateString()}</p>
        {/* Swipe Buttons */}
        <button onClick={() => setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() - 7)))}>
          Previous Week
        </button>
        <button onClick={() => setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + 7)))}>
          Next Week
        </button>
      </div>

      <div>
        {/* Timezone Select */}
        <label>
          Select Timezone:
          <select value={timezone} onChange={(e) => setTimezone(e.target.value)}>
            <option value="UTC">UTC</option>
            <option value="UTC+1">UTC+1</option>
          </select>
        </label>
        <p>Displaying times in {timezone} timezone</p>
      </div>

      <div>
        {/*  Weekly Schedule */}
        {weeklyDays.map((day) => (
          <div key={day.date.toString()}>
            <p>{day.dayName}</p>
            {day.times.map((time) => (
              <label key={`${day.date.toString()}-${time}`}>
                <input
                  type="checkbox"
                  checked={selectedDays.some((d) => d.day === day.dayName && d.times.includes(time))}
                  onChange={() => handleCheckboxChange(day.dayName, time)}
                />
                {` ${time}:00`}
              </label>
            ))}
          </div>
        ))}
      </div>
      <SecondTask></SecondTask>
    </div>
  );
};

export default WeeklyScheduler;
