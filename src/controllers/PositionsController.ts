import { getRepository } from "typeorm";
import { Position } from "../entities/Position";
import { Competition } from "../entities/Competition";

class PositionsController {
  static get = async function(parent: any, args: {[competition: string]: number}) {
		const { competition } = args;
		try {
			const data = await getRepository(Position)
				.find({
					relations: ['competition', 'participant'],
					order: { points: 'DESC', ptb: 'DESC' },
					...competition && { where: { competition }}
				});
			return data;
		} catch(e) {
			throw new Error(e);
		}
	};
	
	static avgByCompetition = async function() {
		try {
			const avgQuery = getRepository(Position)
				.createQueryBuilder('position')
				.select("AVG(position.ptb)", "avg")
				.where('position.competition = competition.id') // Possible because we are using it as subquery
				.getQuery();

			const competitionsAvg = await getRepository(Competition)
				.createQueryBuilder('competition')
				.addSelect(`(${avgQuery})`, 'avg')
				.orderBy('avg', 'DESC')
				.execute();

			const competitions = competitionsAvg.map((e: any) => ({
				id: e.competition_id,
				name: e.competition_name,
				avg: Number(e.avg),
			}))
			return { competitions }
		} catch(e) {
			throw new Error(e);
		}
  };
}
export default PositionsController;
