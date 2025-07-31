import React, { useState } from 'react'
import GameField from './GameField'
import Scoreboard from './Scoreboard'
import DiceRoller from './DiceRoller'
import PlayLog from './PlayLog'
import Controls from './Controls'
import { playOutcomes } from '../utils/playOutcomes'
import './Game.css'

function Game() {
  // Game state
  const [gameState, setGameState] = useState({
    ballPosition: 20, // Starting position
    down: 1,
    yardsToGo: 10,
    quarter: 1,
    possession: 1, // 1 for player 1, 2 for player 2
    score: { player1: 0, player2: 0 },
    firstDownMarker: 30, // 20 + 10 yards
    isGameStarted: false,
    isGameOver: false,
  })

  const [playLog, setPlayLog] = useState([])
  const [diceRoll, setDiceRoll] = useState({ die1: null, die2: null })
  const [waitingForExtraPoint, setWaitingForExtraPoint] = useState(false)
  const [waitingFor2Point, setWaitingFor2Point] = useState(false)

  // Handle initial coin toss
  const handleCoinToss = () => {
    const die1 = Math.floor(Math.random() * 6) + 1
    const die2 = Math.floor(Math.random() * 6) + 1
    const player1Total = die1
    const player2Total = die2
    
    const winner = player1Total > player2Total ? 1 : player1Total < player2Total ? 2 : 0
    
    if (winner !== 0) {
      setGameState(prev => ({
        ...prev,
        possession: winner,
        isGameStarted: true,
        ballPosition: 20,
        firstDownMarker: 30,
      }))
      
      setPlayLog([`Player ${winner} wins the coin toss and receives first possession!`])
    } else {
      setPlayLog(['Tie! Roll again.'])
    }
  }

  // Handle dice roll
  const handleDiceRoll = () => {
    const die1 = Math.floor(Math.random() * 6) + 1
    const die2 = Math.floor(Math.random() * 6) + 1
    setDiceRoll({ die1, die2 })
    
    if (waitingForExtraPoint) {
      handleExtraPoint(die1 + die2)
    } else if (waitingFor2Point) {
      handle2PointConversion(die1 + die2)
    } else {
      processPlay(die1, die2)
    }
  }

  // Process regular play
  const processPlay = (die1, die2) => {
    const outcome = playOutcomes[`${die1}-${die2}`]
    let newBallPosition = gameState.ballPosition
    let newPossession = gameState.possession
    let newDown = gameState.down
    let newYardsToGo = gameState.yardsToGo
    let logEntry = `Player ${gameState.possession} rolls ${die1}-${die2}: ${outcome.description}`
    
    // Handle different play outcomes
    if (outcome.type === 'touchdown') {
      handleTouchdown()
      return
    } else if (outcome.type === 'turnover') {
      newPossession = gameState.possession === 1 ? 2 : 1
      if (outcome.yards) {
        // Interception or fumble with specific field position
        newBallPosition = outcome.yards
      }
      newDown = 1
      newYardsToGo = 10
      logEntry += ` Possession changes to Player ${newPossession}`
    } else {
      // Regular play with yards
      newBallPosition += outcome.yards
      
      // Check for safety
      if (newBallPosition <= 0) {
        handleSafety()
        return
      }
      
      // Check for touchdown
      if (newBallPosition >= 100) {
        handleTouchdown()
        return
      }
      
      // Update yards to go
      newYardsToGo -= outcome.yards
      
      // Check for first down
      if (newYardsToGo <= 0) {
        newDown = 1
        newYardsToGo = 10
        logEntry += ' - First Down!'
      } else if (outcome.type === 'incomplete') {
        // Incomplete pass, advance down
        newDown += 1
      } else {
        // Normal play, advance down
        newDown += 1
      }
      
      // Check for turnover on downs
      if (newDown > 4) {
        newPossession = gameState.possession === 1 ? 2 : 1
        newDown = 1
        newYardsToGo = 10
        logEntry += ` - Turnover on downs! Possession to Player ${newPossession}`
      }
    }
    
    // Update first down marker
    const newFirstDownMarker = Math.min(newBallPosition + newYardsToGo, 100)
    
    setGameState(prev => ({
      ...prev,
      ballPosition: newBallPosition,
      possession: newPossession,
      down: newDown,
      yardsToGo: newYardsToGo,
      firstDownMarker: newFirstDownMarker,
    }))
    
    setPlayLog(prev => [logEntry, ...prev])
  }

  // Handle touchdown
  const handleTouchdown = () => {
    const scorer = gameState.possession
    setGameState(prev => ({
      ...prev,
      score: {
        ...prev.score,
        [`player${scorer}`]: prev.score[`player${scorer}`] + 6,
      },
    }))
    
    setPlayLog(prev => [`Player ${scorer} scores a TOUCHDOWN!`, ...prev])
    setWaitingForExtraPoint(true)
  }

  // Handle extra point attempt
  const handleExtraPoint = (rollTotal) => {
    const scorer = gameState.possession
    if (rollTotal >= 3) {
      setGameState(prev => ({
        ...prev,
        score: {
          ...prev.score,
          [`player${scorer}`]: prev.score[`player${scorer}`] + 1,
        },
      }))
      setPlayLog(prev => [`Extra point is GOOD!`, ...prev])
    } else {
      setPlayLog(prev => [`Extra point is NO GOOD!`, ...prev])
    }
    
    setWaitingForExtraPoint(false)
    kickoff()
  }

  // Handle 2-point conversion
  const handle2PointConversion = (rollTotal) => {
    const scorer = gameState.possession
    if (rollTotal === 12) {
      setGameState(prev => ({
        ...prev,
        score: {
          ...prev.score,
          [`player${scorer}`]: prev.score[`player${scorer}`] + 2,
        },
      }))
      setPlayLog(prev => [`2-point conversion is GOOD!`, ...prev])
    } else {
      setPlayLog(prev => [`2-point conversion FAILS!`, ...prev])
    }
    
    setWaitingFor2Point(false)
    kickoff()
  }

  // Handle safety
  const handleSafety = () => {
    const defender = gameState.possession === 1 ? 2 : 1
    setGameState(prev => ({
      ...prev,
      score: {
        ...prev.score,
        [`player${defender}`]: prev.score[`player${defender}`] + 2,
      },
      ballPosition: 20,
      possession: defender,
      down: 1,
      yardsToGo: 10,
      firstDownMarker: 30,
    }))
    
    setPlayLog(prev => [`SAFETY! Player ${defender} scores 2 points!`, ...prev])
  }

  // Handle kickoff after scoring
  const kickoff = () => {
    const receivingTeam = gameState.possession === 1 ? 2 : 1
    setGameState(prev => ({
      ...prev,
      ballPosition: 20,
      possession: receivingTeam,
      down: 1,
      yardsToGo: 10,
      firstDownMarker: 30,
    }))
  }

  // Handle punt
  const handlePunt = () => {
    const puntingTeam = gameState.possession
    const receivingTeam = puntingTeam === 1 ? 2 : 1
    
    setGameState(prev => ({
      ...prev,
      ballPosition: 40,
      possession: receivingTeam,
      down: 1,
      yardsToGo: 10,
      firstDownMarker: 50,
    }))
    
    setPlayLog(prev => [`Player ${puntingTeam} punts. Player ${receivingTeam} takes over at the 40.`, ...prev])
  }

  // Handle field goal attempt
  const handleFieldGoal = () => {
    const distance = 100 - gameState.ballPosition + 10 // Add 10 for endzone
    const die = Math.floor(Math.random() * 6) + 1
    let success = false
    
    if (distance <= 30 && die >= 3) success = true
    else if (distance <= 40 && die >= 4) success = true
    else if (distance <= 50 && die >= 5) success = true
    
    if (success) {
      const scorer = gameState.possession
      setGameState(prev => ({
        ...prev,
        score: {
          ...prev.score,
          [`player${scorer}`]: prev.score[`player${scorer}`] + 3,
        },
      }))
      setPlayLog(prev => [`${distance}-yard field goal is GOOD!`, ...prev])
      kickoff()
    } else {
      const newPossession = gameState.possession === 1 ? 2 : 1
      setGameState(prev => ({
        ...prev,
        possession: newPossession,
        ballPosition: prev.ballPosition,
        down: 1,
        yardsToGo: 10,
        firstDownMarker: Math.min(prev.ballPosition + 10, 100),
      }))
      setPlayLog(prev => [`${distance}-yard field goal is NO GOOD! Player ${newPossession} takes over.`, ...prev])
    }
  }

  // Handle go for 2
  const handleGoFor2 = () => {
    setWaitingForExtraPoint(false)
    setWaitingFor2Point(true)
    setPlayLog(prev => [`Player ${gameState.possession} is going for 2!`, ...prev])
  }

  // Check for end of quarter/game
  const checkQuarter = () => {
    // This would be called after a certain number of plays
    // For now, manual quarter advancement would be needed
  }

  return (
    <div className="game">
      <Scoreboard gameState={gameState} />
      <GameField 
        ballPosition={gameState.ballPosition}
        firstDownMarker={gameState.firstDownMarker}
        possession={gameState.possession}
      />
      <div className="game-controls-section">
        <div className="dice-and-actions">
          <DiceRoller 
            diceRoll={diceRoll}
            onRoll={handleDiceRoll}
            disabled={!gameState.isGameStarted || gameState.isGameOver}
          />
          
          {waitingForExtraPoint && (
            <div className="extra-point-instructions">
              <p>Touchdown! Choose your extra point attempt:</p>
              <div className="extra-point-buttons">
                <span className="extra-point-option">Roll dice for Extra Point (≥3 for 1 point)</span>
                <button className="quick-action-button two-point" onClick={handleGoFor2}>
                  Go for 2 (need 12)
                </button>
              </div>
            </div>
          )}
          
          {waitingFor2Point && (
            <div className="conversion-message">
              <p>Roll dice for 2-point conversion (need 12)!</p>
            </div>
          )}
          
          <div className="quick-actions">
            {gameState.isGameStarted && !waitingForExtraPoint && !waitingFor2Point && (
              <button className="quick-action-button punt" onClick={handlePunt}>
                Punt
              </button>
            )}
            {gameState.isGameStarted && !waitingForExtraPoint && !waitingFor2Point && gameState.ballPosition >= 50 && (
              <button className="quick-action-button field-goal" onClick={handleFieldGoal}>
                FG ({100 - gameState.ballPosition + 10}yd)
              </button>
            )}
          </div>
        </div>
        <PlayLog plays={playLog} />
      </div>
      <Controls 
        gameState={gameState}
        onCoinToss={handleCoinToss}
        onPunt={handlePunt}
        onFieldGoal={handleFieldGoal}
        onGoFor2={handleGoFor2}
        waitingForExtraPoint={waitingForExtraPoint}
        waitingFor2Point={waitingFor2Point}
        hideQuickActions={true}
      />
    </div>
  )
}

export default Game