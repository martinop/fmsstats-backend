export default `

  type CompetitionStats {
    stats: String
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
  }
`