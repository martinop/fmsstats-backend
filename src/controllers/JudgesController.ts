import { getRepository } from "typeorm";
import { JudgeStats } from "../entities/JudgeStats";

class JudgesController {
  static byEffectiveness = async function() {
		const judges = await getRepository(JudgeStats).find({
			relations: ['judge', 'competition'],
			order: { effectiveness: 'DESC'},
			take: 10
		});
		return { judges }
  };
}
export default JudgesController;
