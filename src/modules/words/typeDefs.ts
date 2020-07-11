export default `

  enum ModeWordType {
    EASY
    HARD
  }

  type Word {
    id: ID!
    value: String!
    mode: ModeWordType!
  }

  type CompetitionWordsResponse {
    words: [Word]!
  }

  extend type Word {
    count: Int
    competition: Int
  }

  type Query {
    words(competition: Int): [Word]!
  }
`