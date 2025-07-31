import React from 'react'
import './PlayLog.css'

function PlayLog({ plays }) {
  return (
    <div className="play-log">
      <h3>Play Log</h3>
      <div className="plays-container">
        {plays.length === 0 ? (
          <p className="no-plays">No plays yet. Start the game!</p>
        ) : (
          plays.slice(0, 10).map((play, index) => (
            <div key={index} className="play-entry">
              {play}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default PlayLog