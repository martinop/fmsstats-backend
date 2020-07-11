import { getRepository } from "typeorm";
import { JudgeStats } from "../entities/JudgeStats";
import { Competition } from "../entities/Competition";
import { Participant } from "../entities/Participant";
import { Vote } from "../entities/Vote";

class JudgesController {

  static byEffectiveness = async function(parent: { id: number }) {
		const competition = parent.id;
		const judges = await getRepository(JudgeStats)
			.find({
				relations: ['judge', 'competition'],
				...competition && { where: { competition } },
				order: { effectiveness: 'DESC'},
				take: 10
			});
		return judges;
	};

	static getMostVotingJudge = (order: 'ASC' | 'DESC') => async (parent: Competition) => {
		const competition = parent.id;
		try {
			const judge = competition ?
			 await getRepository(Vote)
				.createQueryBuilder('vote')
				.select('judge.*, ROUND((SUM(vote."homePoints") + SUM(vote."awayPoints")) / COUNT(vote.*), 2) as average')
				.innerJoin('vote.judge', 'judge')
				.innerJoin('vote.match', 'match')
				.innerJoin('match.round', 'round')
				.where('round."competitionId" = :competition', { competition })
				.groupBy('judge.id')
				.orderBy('average', order)
				.limit(1)
				.getRawOne() :
			await getRepository(Vote)
				.createQueryBuilder('vote')
				.select('judge.*, ROUND((SUM(vote."homePoints") + SUM(vote."awayPoints")) / COUNT(vote.*), 2) as average')
				.innerJoin('vote.judge', 'judge')
				.groupBy('judge.id')
				.orderBy('average', order)
				.limit(1)
				.getRawOne();
			return { judge, average: judge?.average };
		} catch(e) {
			throw new Error(e);
		}
	};
	
}
export default JudgesController;
