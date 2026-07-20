import { useState } from "react";
import "./App.css";

import discoveries from "./data/discoveries";
import { chooseDiscovery } from "./engine/intelligence";
import { updateMemory, getMemory } from "./engine/memory";

function App() {
  const [discovery, setDiscovery] = useState(null);

  const memory = getMemory();

  const showDiscovery = () => {
    const selected = chooseDiscovery(discoveries);

    setDiscovery(selected);
    updateMemory(selected);
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
          {discovery.displayText || discovery.content.en}
        </p>
      )}

      <div className="developer-panel">
        <h3>NEXTA MEMORY</h3>

        <p>
          Total Clicks: {memory.totalClicks}
        </p>

        <p>
          Last Discovery: {memory.lastDiscovery || "None"}
        </p>

        <p>
          Seen: {memory.seenDiscoveries.length}
        </p>

        <p>
          Rare Counter: {memory.rareCounter}
        </p>
<p>
  Favorite Category:
  {memory.profile.favoriteCategory || "None"}
</p>

<p>
  Curiosity Level:
  {memory.profile.curiosityLevel}
</p>
        <p>
          Categories: {JSON.stringify(memory.categoryScores)}
        </p>
      </div>

    </div>
  );
}

export default App;
