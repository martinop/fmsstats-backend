import JudgesController from '../../controllers/JudgesController';

export default { 
	Query: {
		byEffectiveness: JudgesController.byEffectiveness,
	},
}