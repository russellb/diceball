
# Dice Football Game - Digital Version Plan

This document contains a full description of the **Dice Football** board game rules based on a Clemson-themed wooden board game, followed by a technical implementation plan for recreating it as a browser-based digital game.

---

## 🎯 Game Objective

Simulate an American football game using dice rolls. Players attempt to move down the field, score touchdowns, and manage possessions while tracking yards, downs, and scores.

---

## 🧱 Components

- **Game Board**: 100-yard football field with yard markers and peg holes
- **Dice**: 2 standard six-sided dice
- **Tokens**: 
  - Football (to track position on the field)
  - First down marker
  - 4 pegs to track score, quarter, possession, and down

---

## 🎲 Basic Gameplay Rules

### Starting the Game

- Roll to determine who starts. Winner gets first possession.
- First possession begins at the 20-yard line.

### Turn Structure

1. Roll 2 six-sided dice.
2. Use dice outcome to look up play result from the chart.
3. Apply result (yards gained/lost, turnover, penalty).
4. Update:
   - Ball position
   - Down number
   - First down status
   - Score if touchdown or field goal

### First Downs

- Players have **4 downs** to gain **10 yards**.
- If unsuccessful, possession changes.

### Scoring

- **Touchdown**: 6 points
- **Extra point**: Roll ≥3 = 1 point
- **2-point conversion**: Roll = 6 = 2 points
- **Field Goals**:
  - 30 yards: roll ≥3
  - 40 yards: roll ≥4
  - 50 yards: roll ≥5

### Special Plays

- **Punt**: Move opponent to your 40-yard line.
- **Turnover**: Change possession.
- **Game Ends** after 4 quarters; high score wins.
- **Overtime**: Roll-off style tiebreak.

---

## ⚙️ Dice Result Mapping

Each dice combo (1-1 to 6-6) maps to a football play, including:

- Touchdowns
- Trick plays
- Sacks
- Incompletions
- Interceptions
- Penalties
- Runs or passes for specific yardage

Dice rolls mapped to outcomes:

| Roll (Die 1 – Die 2) | Outcome Description               |
| -------------------- | --------------------------------- |
| 1 – 1                | Touchdown Pass                    |
| 1 – 2                | Interception – 30 yards downfield |
| 1 – 3                | Reverse Play – +20 yards          |
| 1 – 4                | Quarterback Sack – -15 yards      |
| 1 – 5                | Incomplete Pass                   |
| 1 – 6                | Offside Defense – +5 yards        |
| 2 – 1                | Trick Play – +45 yards            |
| 2 – 2                | FUMBLE – Turnover                 |
| 2 – 3                | Interception – 40 yards downfield |
| 2 – 4                | Tackle in Backfield – -10 yards   |
| 2 – 5                | Pass Interference – +15 yards     |
| 2 – 6                | HB Run – +5 yards                 |
| 3 – 1                | Touchdown Run                     |
| 3 – 2                | Fumble – Opposite 40 yard line    |
| 3 – 3                | Holding – -10 yards               |
| 3 – 4                | Incomplete Pass                   |
| 3 – 5                | Offside Defense – +5 yards        |
| 3 – 6                | Touchdown Pass                    |
| 4 – 1                | Quarterback Sack – -15 yards      |
| 4 – 2                | Holding – -10 yards               |
| 4 – 3                | Incomplete Pass                   |
| 4 – 4                | Touchdown Run                     |
| 4 – 5                | HB Run – +10 yards                |
| 4 – 6                | Offside Defense – +5 yards        |
| 5 – 1                | Reverse Play – +20 yards          |
| 5 – 2                | Incomplete Pass                   |
| 5 – 3                | Incomplete Pass                   |
| 5 – 4                | Pass Interference – +15 yards     |
| 5 – 5                | QB Draw – +5 yards                |
| 5 – 6                | Trick Play – +40 yards            |
| 6 – 1                | Interception – 10 yards downfield |
| 6 – 2                | Fumble – Opposite 10 yard line    |
| 6 – 3                | HB Run – +5 yards                 |
| 6 – 4                | Incomplete Pass                   |
| 6 – 5                | Pass Interference – +15 yards     |
| 6 – 6                | Touchdown Run                     |
| -------------------- | --------------------------------- |

---

## 🧠 Optional Advanced Rules

### Comeback Advantages

If the losing player is down by:

- **3+ points**: Can go for it on 4th down anytime.
- **9+ points**: Double yardage on positive plays.
- **16+ points**: Double scoring value.
- **23+ points**: Opponent’s negative results are doubled.
- **29+ points**: Turnovers by opponent can be returned for TD on roll of 6 (doubled).

### Extra Fun Rules

- **Challenges**: Each player gets one; succeed on roll ≥4.
- **Blocked punts**: If opponent rolls < kick roll, punt is blocked.
- **Field goal blocks**: If opponent rolls doubles ≥4, kick is blocked.
- **End zone interception**: Defense may run back for TD with roll = 6.
- **Safety**: Ball goes past your own endzone.

---

# 💻 Digital Implementation Plan

## Goal

Build a **web-based version** of the dice football game that works on iPad and desktop (macOS) and can be hosted on a static web server.

---

## 🧰 Recommended Tech Stack

| Component         | Choice                        | Reason                                           |
|------------------|-------------------------------|--------------------------------------------------|
| Framework        | React + Vite                  | Fast dev, static deploy, rich UI capabilities    |
| State Mgmt       | React Hooks or Zustand        | Lightweight, simple state logic                  |
| Dice UI          | HTML + CSS animations         | Simple, performant                               |
| Graphics         | CSS Grid or Konva.js (Canvas) | Field, football marker, scoreboard               |
| Hosting          | Vercel or Netlify             | Static hosting, free tier, easy setup            |

---

## 📐 App Architecture

### Pages / Components

- **GameField**: Football field with yard lines
- **Football**: Token showing ball position
- **FirstDownMarker**: 10-yard marker
- **Scoreboard**: Quarter, down, possession, score
- **DiceRoller**: Roll 2 dice, show animation & result
- **PlayLog**: Log of recent plays
- **Controls**: Buttons for roll, punt, kick, etc.

### Game Logic

- Dice result table: map roll (e.g. "3-4") → outcome
- State tracked:
  - Ball position (0–100)
  - Down (1–4)
  - Yards to go
  - Quarter (1–4)
  - Possession (player 1 or 2)
  - Score (both players)
  - Optional rule toggles

---

## 🛠️ Development Plan

### Phase 1: Core Features
- Field UI and token positioning
- Dice roll input and result mapping
- Game state transitions (downs, possession)
- Touchdown and field goal logic

### Phase 2: Visual & UX Polish
- Dice animation
- Sound effects
- Responsive design

### Phase 3: Advanced Rules
- Comeback mechanics
- Challenges
- Field goal and punt interception logic
- Endgame scenarios

---

## ☁️ Deployment

- Host via:
  - [ ] GitHub Pages
  - [ ] Netlify
  - [x] Vercel (preferred)

---

## ✅ Next Steps for Developer Agent

1. **Scaffold project**: `npm create vite@latest football-game --template react`
2. **Create component tree** per architecture above
3. **Implement state logic**: football position, down tracking, etc.
4. **Build dice roll → outcome mapper**
5. **Add ability to configure advanced rule toggles**
6. **Deploy to Vercel**

---

