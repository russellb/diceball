import React, { useState } from 'react'
import './DiceRoller.css'

function DiceRoller({ diceRoll, onRoll, disabled }) {
  const [isRolling, setIsRolling] = useState(false)

  const handleRoll = () => {
    setIsRolling(true)
    setTimeout(() => {
      onRoll()
      setIsRolling(false)
    }, 800)
  }

  const getDiceFace = (value) => {
    const faces = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅']
    return faces[value - 1] || '?'
  }

  return (
    <div className="dice-roller">
      <div className="dice-container">
        <div className={`die ${isRolling ? 'rolling' : ''}`}>
          {diceRoll.die1 ? getDiceFace(diceRoll.die1) : '?'}
        </div>
        <div className={`die ${isRolling ? 'rolling' : ''}`}>
          {diceRoll.die2 ? getDiceFace(diceRoll.die2) : '?'}
        </div>
      </div>
      
      <button 
        className="roll-button"
        onClick={handleRoll}
        disabled={disabled || isRolling}
      >
        {isRolling ? 'Rolling...' : 'Roll Dice'}
      </button>
      
      {diceRoll.die1 && diceRoll.die2 && !isRolling && (
        <div className="roll-result">
          Total: {diceRoll.die1 + diceRoll.die2}
        </div>
      )}
    </div>
  )
}

export default DiceRoller