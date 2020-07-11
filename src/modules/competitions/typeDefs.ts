export default `

  extend type Match {
    difference: Int
  }

  type CompetitionStats {
    id: ID!
    played: Int
    replicas: Int
    directWins: Int
    mostPointsMatch: Match
    mostEvenMatch: Match
    mostUnevenMatch: Match
    mostUsedWords: [Word]
    mostEffectiveJudges: [Judge]
  }

  type GlobalStats {
    played: Int
    replicas: Int
    directWins: Int
    mostPointsMatch: Match
    mostEvenMatch: Match
    mostUnevenMatch: Match
    mostUsedWords: [Word]
    mostEffectiveJudges: [Judge]
  }

  type Competition {
    name: String!
    id: Int!
    stats: CompetitionStats
    rounds: [Round]
  }

  type Query {
    competition(id: ID!): Competition
    competitions: [Competition]
    globalStats: GlobalStats
  }
`