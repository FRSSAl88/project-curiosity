import { useState } from 'react'
import './App.css'

function App() {
  const [discovery, setDiscovery] = useState('')

  const showDiscovery = () => {
    setDiscovery(
      "Octopuses have three hearts... and somehow still avoid drama."
    )
  }

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