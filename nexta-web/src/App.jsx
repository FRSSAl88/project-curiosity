import { useState } from "react";
import "./App.css";

import discoveries from "./data/discoveries";
import { chooseDiscovery } from "./engine/intelligence";
import {
  updateMemory,
  getMemory,
  updateFeedback
} from "./engine/memory";


function App() {

  const [discovery, setDiscovery] = useState(null);
  const [memory, setMemory] = useState(getMemory());


  const showDiscovery = () => {

    const selected = chooseDiscovery(discoveries);

    setDiscovery(selected);

    updateMemory(selected);

    setMemory({ ...getMemory() });
  };



  const sendFeedback = (type) => {

    updateFeedback(discovery, type);

    setMemory({ ...getMemory() });
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

        <>

          <p>
            {discovery.displayText ||
            discovery.content.en}
          </p>


          <div className="feedback-buttons">

            <button
              onClick={() => sendFeedback("like")}
            >
              👍 Interesting
            </button>


            <button
              onClick={() => sendFeedback("dislike")}
            >
              👎 Not for me
            </button>

          </div>

        </>

      )}





      <div className="developer-panel">


        <h3>NEXTA MEMORY</h3>


        <p>
          Total Clicks: {memory.totalClicks}
        </p>


        <p>
          Last Discovery:
          {memory.lastDiscovery || " None"}
        </p>


        <p>
          Seen: {memory.seenDiscoveries.length}
        </p>


        <p>
          Rare Counter: {memory.rareCounter}
        </p>


        <p>
          Favorite Category:
          {
            memory.profile.favoriteCategory ||
            " None"
          }
        </p>


        <p>
          Curiosity Level:
          {
            memory.profile.curiosityLevel
          }
        </p>


        <p>
          Average Click Speed:
          {
            memory.behavior.averageClickSpeed || 0
          } ms
        </p>

<h4>NEXTA PERSONALITY</h4>

<p>
  Current:
  {
    memory.profile?.personality ||
    "Explorer"
  }
  </p>
 <p>Reasons:</p>

<ul>
    {
    memory.profile?.personalityReasons?.map(
      (reason, index) => (
      <li key={index}>
        {reason}
    </li>
    )
  )
}
  </ul>

<h4>NEXTA DECISION</h4>

<p>
  Selected:
  {
   memory.decisionLog.selected 
||
   "None"
  }
 </p>

 <p>
     Score:
        {
           memory.decisionLog.score || 0
        }
     </p>

{memory.decisionLog.reasons &&
memory.decisionLog.reasons.length > 0 && (
  <>
    <p>Reasons:</p>

    {memory.decisionLog.reasons.map((reason, index) => (
      <p key={index}>
        • {reason}
      </p>
    ))}
  </>
)}

 <h4>Feedback</h4>

        <p>
          👍 Likes:
          {
            memory.feedback.likes
          }
        </p>

        <p>
          👎 Dislikes:
          {
            memory.feedback.dislikes
          }
</p>

</div>


</div>
 
  );

}

export default App;