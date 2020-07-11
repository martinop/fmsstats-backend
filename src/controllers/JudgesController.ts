import { getRepository } from "typeorm";
import { JudgeStats } from "../entities/JudgeStats";

class JudgesController {
  static byEffectiveness = async function(parent: { id: number }) {
		const competition = parent.id;
		const judges = competition ? 
			await getRepository(JudgeStats)
				.find({
					relations: ['judge', 'competition'],
					where: { competition },
					order: { effectiveness: 'DESC'},
					take: 10
				}) :
			await getRepository(JudgeStats)
				.find({
					relations: ['judge', 'competition'],
					order: { effectiveness: 'DESC'},
					take: 10
				});
		return judges;
  };
}
export default JudgesController;
