import { useState } from "react";
import "./App.css";

import discoveries from "./data/discoveries";
import { chooseDiscovery } from "./engine/intelligence";

function App() {
  const [discovery, setDiscovery] = useState(null);

  const showDiscovery = () => {
    const selected = chooseDiscovery(
      discoveries,
      discovery
    );

    setDiscovery(selected);
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

      {discovery && (
        <p>
          {discovery.content.en}
        </p>
      )}

    </div>
  );
}

export default App;