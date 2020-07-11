export default `
  enum WinType {
    DIRECT
    REPLICA
  }

  type Match {
    id: ID!
    winType: WinType
    active: Boolean
    home: Participant
    away: Participant
    winner: Participant
    loser: Participant
    words: [Word]
    thematics: [Thematic]
    votes: [Vote]
  }
`