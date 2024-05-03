import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// new mem:
document.getElementById("add-new-mem").addEventListener("submit", function(event) {
  event.preventDefault();
  var newName = document.getElementById("new-member-name").value;
  addMember(newName);
  document.getElementById("new-member-name").value = "";
});

function addMember(name) {
  var newMemberDiv = document.createElement("div");
  newMemberDiv.classList.add("member");

  var nameParagraph = document.createElement("p");
  nameParagraph.textContent = name;
  var yearParagraph = document.createElement("p");
  yearParagraph.textContent = "2028";

  newMemberDiv.appendChild(nameParagraph);
  newMemberDiv.appendChild(yearParagraph);

  var imageElement = document.createElement("img");
  imageElement.src = "/photos/egreen.jpg";
  newMemberDiv.appendChild(imageElement);

  document.getElementById("members-page").appendChild(newMemberDiv);
}




//API STUFF:
 //ticketmaster discover API key
 const apiKey = 'aWS1b9fyEVt0aYh5VQgvXOhpdLMkGpAi';

// fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&keyword=music&classificationName=music&sort=date,asc`)
//  fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&postalCode=63130&classificationName=music&sort=date,asc`)
fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&keyword=Maggie+Rogers&classificationName=music&sort=date,asc`)

     .then(response => response.json())
     .then(data => {

         const events = data._embedded.events;

         const concertsList = document.getElementById('concerts-list');
         events.forEach(event => {

          const eventName = event.name.split(': ')[1] || event.name;

          const concertItem = document.createElement('li');
          concertItem.textContent = `${eventName} - ${event.dates.start.localDate}, ${event.dates.start.localTime} @ ${event._embedded.venues[0].name}`;
          concertsList.appendChild(concertItem);

            //  const concertItem = document.createElement('li');
            //  concertItem.textContent = `${event.name} - ${event.dates.start.localDate}, ${event.dates.start.localTime} @ ${event._embedded.venues[0].name}`;
            //  concertsList.appendChild(concertItem);
         });
         
     })
     .catch(error => {
         console.error('Error fetching concert data:', error);
     });



     