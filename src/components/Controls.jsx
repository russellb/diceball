import React from 'react'
import './Controls.css'

function Controls({ 
  gameState, 
  onCoinToss, 
  onPunt, 
  onFieldGoal, 
  onGoFor2,
  waitingForExtraPoint,
  waitingFor2Point,
  hideQuickActions = false
}) {
  const canPunt = gameState.isGameStarted && !waitingForExtraPoint && !waitingFor2Point && !hideQuickActions
  const canKickFieldGoal = gameState.isGameStarted && !waitingForExtraPoint && !waitingFor2Point && gameState.ballPosition >= 50 && !hideQuickActions
  
  return (
    <div className="controls">
      {!gameState.isGameStarted && (
        <button className="control-button coin-toss" onClick={onCoinToss}>
          Start Game - Roll for First Possession
        </button>
      )}
      
      {canPunt && (
        <button className="control-button punt" onClick={onPunt}>
          Punt
        </button>
      )}
      
      {canKickFieldGoal && (
        <button className="control-button field-goal" onClick={onFieldGoal}>
          Attempt Field Goal ({100 - gameState.ballPosition + 10} yards)
        </button>
      )}
      
    </div>
  )
}

export default Controls