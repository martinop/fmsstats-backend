export default `

  type Competition {
    name: String!
    id: Int!
  }

  type Word {
    id: ID!
    value: String!
    mode: ModeWordType!
  }

  enum ModeWordType {
    EASY
    HARD
  }

  type CompetitionWordsResponse {
    competition: Competition
    words: [Word]!
  }

  extend type Word {
    count: Int
    competition: Int
  }

  type Query {
    words: [Word]!
    wordsByCompetition(competition: Int): [Word]!
  }
`