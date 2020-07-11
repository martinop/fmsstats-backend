export default `
  type Round {
    id: ID!
    title: String!
    startAt: String
    calculated: Boolean!
    matches: [Match]
  }
`