export default `
  type Vote {
    id: ID!
    judge: Participant
    homePoints: Int
    awayPoints: Int
    winner: Participant
    loser: Participant
  }
`