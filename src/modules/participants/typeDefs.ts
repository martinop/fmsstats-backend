export default `
  enum ParticipantType {
    FREESTYLER
    JUDGE
  }

  type Participant {
    id: ID!
    name: String
    imageUrl: String
    type: ParticipantType
  }

  type Query {
    participants: [Participant]
    participant(id: ID!): Participant
  }
`