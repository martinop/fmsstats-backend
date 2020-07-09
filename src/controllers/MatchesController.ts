import { getRepository } from "typeorm";
import isEmpty from 'lodash/isEmpty';
import graphqlFields from 'graphql-fields';
import { Match } from "../entities/Match";
import { GraphQLResolveInfo } from "graphql/type/definition";
import { WinType } from "../types";

function getQBBasedOnWinType(winType: string, competitionId?: number) {
	const matchQB = getRepository(Match).createQueryBuilder('match')
	const baseQB =  matchQB.where('"winType" = :winType', { winType })

	const qb = competitionId ? 
		baseQB
			.innerJoin("match.round", "round")
			.andWhere("round.competition = :competitionId", { competitionId })
		: baseQB

	return qb.getCount();
}

class MatchesController {
	static get = async function(source: any, args: {[argName: string]: any}, context: any, info: GraphQLResolveInfo) {
		const { data: fields } = graphqlFields(info);

		const relations: string[] = Object.keys(fields).reduce((prev: string[], current: string) => {
			if(!isEmpty(fields[current])) {
				return [...prev, current];
			} return prev;
		}, []);

		console.log(relations);
		const matchesRepository = getRepository(Match);
		const data = await matchesRepository
				.createQueryBuilder('match')
				.getMany();
		return { data }
	};

	

	static getGeneralStats = async function(source: any, args: {[competition: string]: number}) {
		const { competition } = args;
		try {		
			const directWinsCount = await getQBBasedOnWinType(WinType.DIRECT, competition)
			const replicaCount = await getQBBasedOnWinType(WinType.REPLICA, competition)
			const played = replicaCount + directWinsCount;

			return { played, directWins: directWinsCount, replica: replicaCount }
		} catch(e) {
			throw new Error(e);
		}
	};
}
export default MatchesController;
