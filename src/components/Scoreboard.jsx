import React from 'react'
import './Scoreboard.css'

function Scoreboard({ gameState }) {
  const { score, quarter, down, yardsToGo, ballPosition, possession } = gameState

  const getFieldPosition = () => {
    // Calculate field position relative to the team with possession
    let relativePosition = ballPosition
    
    // If Player 2 has possession, flip the field position
    if (possession === 2) {
      relativePosition = 100 - ballPosition
    }
    
    if (relativePosition === 50) return '50'
    if (relativePosition < 50) return `Own ${relativePosition}`
    return `Opp ${100 - relativePosition}`
  }

  const getDownString = () => {
    if (down > 4) return '1st & 10'
    const suffix = down === 1 ? 'st' : down === 2 ? 'nd' : down === 3 ? 'rd' : 'th'
    return `${down}${suffix} & ${yardsToGo}`
  }

  return (
    <div className="scoreboard">
      <div className="score-section">
        <div className={`team-score ${possession === 1 ? 'has-possession' : ''}`}>
          <h3>Player 1</h3>
          <div className="score">{score.player1}</div>
          {possession === 1 && <div className="possession-indicator">🏈 BALL</div>}
        </div>
        
        <div className="game-info">
          <div className="quarter">Quarter {quarter}</div>
          <div className="down-distance">{getDownString()}</div>
          <div className="field-position">{getFieldPosition()}</div>
        </div>
        
        <div className={`team-score ${possession === 2 ? 'has-possession' : ''}`}>
          <h3>Player 2</h3>
          <div className="score">{score.player2}</div>
          {possession === 2 && <div className="possession-indicator">🏈 BALL</div>}
        </div>
      </div>
    </div>
  )
}

export default Scoreboard