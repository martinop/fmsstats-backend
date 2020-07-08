export default `


	type Participant {
		id: Int!
		name: String!
		type: String
		imageUrl: String
	}

	type Competition {
		id: Int
		name: String
	}

	type Position {
		id: Int!
		points: Int
		wins: Int
		loses: Int
		winsReplica: Int
		losesReplica: Int
		ptb: Int
		participant: Participant
		competition: Competition
	}

	type PositionsResponse {
		data: [Position]
	}

	type Query {
    positions(competition: Int): PositionsResponse
  }

`
