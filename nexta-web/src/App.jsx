import { useState } from 'react'
import './App.css'
import discoveries from "./data/discoveries";
function App() {
  const [discovery, setDiscovery] = useState('')

  const showDiscovery = () => {
  const randomIndex = Math.floor(Math.random() * discoveries.length);
  setDiscovery(discoveries[randomIndex].text);
};

  return (
    <div className="nexta-container">
      <h1>NEXTA</h1>

      <p className="tagline">
        Never know what's next.
      </p>

      <button 
        className="next-button"
        onClick={showDiscovery}
      >
        NEXT
      </button>

      <p>{discovery}</p>
    </div>
  )
}

export default App;