import logo from './logo.svg';
import './App.css';
import ConcertList from './ConcertList';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </header> */}
      <div className="Maggie">
          <h2>Maggie Rogers Upcoming Concerts</h2>
          <p>Check out one of the Evergreens' favorite artists to cover!</p>
          <ConcertList/>
      </div>
</div>
  );

  
}

export default App;





