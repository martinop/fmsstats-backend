import PositionsController from '../../controllers/PositionsController';

export default { 
	Query: {
		positions: PositionsController.get,
		avgByCompetition: PositionsController.avgByCompetition,
	}
}