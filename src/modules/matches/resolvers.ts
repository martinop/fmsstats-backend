import MatchesController from '../../controllers/MatchesController';

export default { 
	Query: {
		matches: MatchesController.get,
		generalStats: MatchesController.getGeneralStats,
	},
}