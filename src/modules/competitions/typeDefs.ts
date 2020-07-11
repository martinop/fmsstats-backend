export default `

  extend type Match {
    difference: Int
  }

  type CompetitionStats {
    id: ID!
    mostPointsMatch: Match
    mostEvenMatch: Match
    mostUnevenMatch: Match
    mostUsedWords: [Word]
    mostEffectiveJudges: [Judge]
  }

  type GlobalStats {
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