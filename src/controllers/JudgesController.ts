import { getRepository } from "typeorm";
import { JudgeStats } from "../entities/JudgeStats";
import { Competition } from "../entities/Competition";
import { Participant } from "../entities/Participant";
import { Vote } from "../entities/Vote";
import { MOST_VOTING_JUDGE_COMPETITION, CACHE_TIME, MOST_VOTING_JUDGE_GLOBAL } from "../utils/cacheKeys";

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
				.select('judge.*, ROUND((SUM(vote."homePoints") + SUM(vote."awayPoints")) / COUNT(vote.*), 2) as avg')
				.innerJoin('vote.judge', 'judge')
				.innerJoin('vote.match', 'match')
				.innerJoin('match.round', 'round')
				.where('round."competitionId" = :competition', { competition })
				.groupBy('judge.id')
				.orderBy('avg', order)
				.limit(1)
				// .cache({ id: MOST_VOTING_JUDGE_COMPETITION, milliseconds: CACHE_TIME })
				.getRawOne() :
			await getRepository(Vote)
				.createQueryBuilder('vote')
				.select('judge.*, ROUND((SUM(vote."homePoints") + SUM(vote."awayPoints")) / COUNT(vote.*), 2) as avg')
				.innerJoin('vote.judge', 'judge')
				.groupBy('judge.id')
				.orderBy('avg', order)
				.limit(1)
				// .cache({ id: MOST_VOTING_JUDGE_GLOBAL, milliseconds: CACHE_TIME })
				.getRawOne();
			return { judge, avg: judge?.avg };
		} catch(e) {
			throw new Error(e);
		}
	};
	
}
export default JudgesController;
