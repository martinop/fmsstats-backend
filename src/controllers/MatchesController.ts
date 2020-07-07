import { getRepository } from "typeorm";
import isEmpty from 'lodash/isEmpty';
import graphqlFields from 'graphql-fields';
import { Match } from "../entities/Match";
import { GraphQLResolveInfo } from "graphql/type/definition";

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
				.innerJoinAndSelect('match.home', 'home')
				.innerJoinAndSelect('match.away', 'away')
				.innerJoinAndSelect('match.votes', 'votes')
				.innerJoinAndSelect('votes.judge', 'judge')
				.innerJoinAndSelect('votes.winner', 'winner')
				.innerJoinAndSelect('votes.loser', 'loser')

        .getMany();
		return { data }
  };
}
export default MatchesController;
