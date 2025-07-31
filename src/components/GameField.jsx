import React from 'react'
import './GameField.css'

function GameField({ ballPosition, firstDownMarker, possession }) {
  // Create yard markers
  const yardMarkers = []
  for (let i = 0; i <= 10; i++) {
    yardMarkers.push(i * 10)
  }

  // Calculate visual positions based on possession direction
  const getVisualPosition = (position) => {
    // Player 1 attacks left to right (0 to 100)
    // Player 2 attacks right to left (100 to 0)
    return possession === 2 ? 100 - position : position
  }

  const visualBallPosition = getVisualPosition(ballPosition)
  const visualFirstDownMarker = getVisualPosition(firstDownMarker)

  return (
    <div className="game-field">
      <div className="field">
        <div className={`end-zone left-end-zone ${possession === 1 ? 'defending' : 'attacking'}`}>
          <span>{possession === 1 ? 'PLAYER 1' : 'PLAYER 2'}</span>
        </div>
        
        <div className="field-main">
          {/* Yard lines */}
          {yardMarkers.slice(1, -1).map(yard => (
            <div 
              key={yard} 
              className="yard-line"
              style={{ left: `${yard}%` }}
            >
              <div className="yard-number">{yard === 50 ? 50 : yard < 50 ? yard : 100 - yard}</div>
            </div>
          ))}
          
          {/* First down marker */}
          {visualFirstDownMarker < 100 && visualFirstDownMarker >= 0 && (
            <div 
              className="first-down-marker"
              style={{ left: `${visualFirstDownMarker}%` }}
            >
              <div className="first-down-line"></div>
              <div className="first-down-label">1st</div>
            </div>
          )}
          
          {/* Football */}
          <div 
            className={`football player-${possession}`}
            style={{ left: `${visualBallPosition}%` }}
          >
            🏈
          </div>
        </div>
        
        <div className={`end-zone right-end-zone ${possession === 2 ? 'defending' : 'attacking'}`}>
          <span>{possession === 2 ? 'PLAYER 2' : 'PLAYER 1'}</span>
        </div>
      </div>
      
      <div className="field-info">
        <div className="possession-indicator">
          Player {possession} attacking →
        </div>
      </div>
    </div>
  )
}

export default GameField