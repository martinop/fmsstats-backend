export default `

	type Competition {
		name: String!
		id: Int!
	}

	type Judge {
		id: Int!
		effectiveness: Float!
		fails: Int!
		corrects: Int!
		competition: Competition!
	}

	type ByEffectivenessResponse {
		judges: [Judge]
	}

	type Query {
    byEffectiveness: ByEffectivenessResponse
  }

`
