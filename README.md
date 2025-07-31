# Dice Football Game

A digital version of the classic dice football board game, built with React and Vite.

## Features

- **Complete game mechanics**: downs, possessions, scoring, field goals
- **Interactive dice rolling**: animated dice with realistic outcomes
- **Real-time game state**: track position, score, quarter, and downs
- **Play log**: see history of all plays
- **Responsive design**: works on desktop and iPad
- **Special plays**: touchdowns, interceptions, fumbles, penalties

## How to Play

1. Start the game by rolling for first possession
2. Roll the dice to determine play outcomes
3. Advance down the field to score touchdowns
4. Manage 4 downs to gain 10 yards
5. Score points via:
   - Touchdown: 6 points
   - Extra point: 1 point (roll ≥3)
   - 2-point conversion: 2 points (roll = 12)
   - Field goal: 3 points (distance-based)
   - Safety: 2 points

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

The game is ready to deploy to Vercel:

1. Push to GitHub
2. Import project in Vercel
3. Deploy with default settings

## Tech Stack

- React 19
- Vite 7
- CSS Grid for responsive layout
- CSS animations for dice rolling