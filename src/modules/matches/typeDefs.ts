export default `

	type Participant {
		id: Int!
		name: String!
		type: String
		imageUrl: String
	}

	type Vote {
		id: Int
		homePoints: Int
		awayPoints: Int
		judge: Participant
		winner: Participant
		loser: Participant
	}

	type Match {
		id: Int!
		winType: String
		active: Boolean
		home: Participant
		away: Participant
		winner: Participant
		votes: [Vote]
	}

	type AllMatchesResponse {
		data: [Match]
	}

	type Query {
    matches: AllMatchesResponse
  }

`
