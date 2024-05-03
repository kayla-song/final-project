
 //ticketmaster discover API key
 const apiKey = 'aWS1b9fyEVt0aYh5VQgvXOhpdLMkGpAi';

 // Make an API request to fetch upcoming concerts
 // fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&keyword=music&classificationName=music&sort=date,asc`)
//  fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&postalCode=63130&classificationName=music&sort=date,asc`)
fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&keyword=Maggie+Rogers&classificationName=music&sort=date,asc`)

     .then(response => response.json())
     .then(data => {
         // Extract event data
         const events = data._embedded.events;

         // Display each concert on the webpage
         const concertsList = document.getElementById('concerts-list');
         events.forEach(event => {
             const concertItem = document.createElement('li');
             concertItem.textContent = `${event.name} - ${event.dates.start.localDate}, ${event.dates.start.localTime} @ ${event._embedded.venues[0].name}`;
             concertsList.appendChild(concertItem);
         });
     })
     .catch(error => {
         console.error('Error fetching concert data:', error);
     });