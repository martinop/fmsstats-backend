export default `

	type Position {
		id: Int!
		points: Int
		wins: Int
		loses: Int
		winsReplica: Int
		losesReplica: Int
		ptb: Float
		competition: Competition
		participant: Participant
	}

	type CompetitionAvg {
		id: Int!
		name: String!
		avg: Float!
	}

	type AvgByCompetitionResponse {
		competitions: [CompetitionAvg]
	}

	type Query {
		positions(competition: Int): [Position]
		avgByCompetition: AvgByCompetitionResponse
  }

`
