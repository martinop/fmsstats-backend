export default `

  extend type Match {
    difference: Int
  }

  type JudgeVotes {
    judge: Participant
    avg: Float
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
    mostVotingJudge: JudgeVotes
    lessVotingJudge: JudgeVotes
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
    mostVotingJudge: JudgeVotes
    lessVotingJudge: JudgeVotes
  }

  type Competition {
    name: String!
    id: Int!
    imageUrl: String
    stats: CompetitionStats
    rounds: [Round]
  }

  type Query {
    competition(id: ID!): Competition
    competitions: [Competition]
    globalStats: GlobalStats
  }
`