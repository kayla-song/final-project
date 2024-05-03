import React, { useState, useEffect } from 'react';

function ConcertList() {
  const [concerts, setConcerts] = useState([]);
  const [sortBy, setSortBy] = useState('date');

  useEffect(() => {
    const apiKey = 'aWS1b9fyEVt0aYh5VQgvXOhpdLMkGpAi'; // my ticketmaster discover api key, no oauth2 necessary for discover
    fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&keyword=Maggie+Rogers&classificationName=music&sort=date,asc`)
      .then(response => response.json())
      .then(data => {
        const events = data._embedded.events;
        setConcerts(events);
      })
      .catch(error => {
        console.error('Error fetching concert data:', error);
      });
  }, []);

  const handleSortByDate = () => {
    const sortedConcerts = [...concerts].sort((a, b) => new Date(a.dates.start.localDate) - new Date(b.dates.start.localDate));
    setConcerts(sortedConcerts);
    setSortBy('date');
  }; // sorts by date from most recent to far away

  const handleSortByVenue = () => {
    const sortedConcerts = [...concerts].sort((a, b) => {
      const venueA = a._embedded.venues[0]?.name || '';
      const venueB = b._embedded.venues[0]?.name || '';

      return venueA.localeCompare(venueB);
    });
    setConcerts(sortedConcerts);
    setSortBy('venue');
  }; // sorts by venue alphabetically
  
  return (
    <div>
      {/* <h2>Concerts</h2> */}
      <div>
        Sort by:
        <button id="date" onClick={handleSortByDate}>Date</button>
        <button id="venue" onClick={handleSortByVenue}>Venue</button>
      </div>
      <ul>
        {concerts.map((concert, index) => (
          <li key={index}>
            <div>{concert.name}</div>
            <div className={sortBy === 'date' ? 'changeText' : ''} id="date-div">Date: {concert.dates.start.localDate}</div>
            <div id="time-div">Time: {concert.dates.start.localTime || 'TBD'}</div> {/* unknown start times will be tbd*/}
            <div className={sortBy === 'venue' ? 'changeText' : ''}div id="venue-div">Venue: {concert._embedded.venues[0].name || 'TBD'}</div>
        {/* unknown venues will also be tbd*/}
        <br></br>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ConcertList;
