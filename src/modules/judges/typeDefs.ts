export default `

	type Participant {
		id: Int!
		name: String!
		type: String
		imageUrl: String
	}

	type Competition {
		name: String!
		id: Int!
	}

	type Judge {
		id: Int!
		effectiveness: Float!
		fails: Int!
		corrects: Int!
		judge: Participant!
		competition: Competition!
	}

	type ByEffectivenessResponse {
		judges: [Judge]
	}

	type Query {
    byEffectiveness: ByEffectivenessResponse
  }

`
