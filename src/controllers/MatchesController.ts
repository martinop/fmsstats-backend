import { getRepository, IsNull, Not } from "typeorm";
import isEmpty from 'lodash/isEmpty';
import graphqlFields from 'graphql-fields';
import { Match } from "../entities/Match";
import { GraphQLResolveInfo } from "graphql/type/definition";
import { WinType } from "../types";
import { Participant } from "../entities/Participant";
import { Word } from "../entities/Word";
import { Thematic } from "../entities/Thematic";
import { Vote } from "../entities/Vote";

// TO DO: put inside class

class MatchesController {
	static get = async function(source: any, args: {[argName: string]: any}, context: any, info: GraphQLResolveInfo) {
		const { data: fields } = graphqlFields(info);
		
		const relations: string[] = Object.keys(fields).reduce((prev: string[], current: string) => {
			if(!isEmpty(fields[current])) {
				return [...prev, current];
			} return prev;
		}, []);
		
		const matchesRepository = getRepository(Match);
		const data = await matchesRepository
		.createQueryBuilder('match')
		.getMany();
		return { data }
	};
	
	static getGeneralStats = async (source: any, args: {[competition: string]: number}) => {
		const { competition } = args;
		try {		
			const directWinsCount = await MatchesController.getQBBasedOnWinType(WinType.DIRECT, competition)
			const replicaCount = await MatchesController.getQBBasedOnWinType(WinType.REPLICA, competition)
			const played = replicaCount + directWinsCount;
			
			return { played, directWins: directWinsCount, replica: replicaCount }
		} catch(e) {
			throw new Error(e);
		}
	};
	
	static byDifference = (order: 'DESC' | 'ASC', competition?: number) => async (source: any, args: { competition: number }, parent: any, context: any) => {
		try {
			const match = competition ? 
				await getRepository(Match)
					.createQueryBuilder('match')
					.select('match.*')
					.innerJoin('match.votes', 'votes')
					.innerJoin('match.round', 'round')
					.where('round."competitionId" = :competition', { competition })
					.groupBy('match.id')
					.orderBy('ABS(SUM("homePoints") - SUM("awayPoints"))', order)
					.limit(1)
					.getRawOne() :
				await getRepository(Match)
					.createQueryBuilder('match')
					.select('match.*')
					.innerJoin('match.votes', 'votes')
					.groupBy('match.id')
					.orderBy('ABS(SUM("homePoints") - SUM("awayPoints"))', order)
					.limit(1)
					.getRawOne();
			return match;
		} catch(e) {
			throw new Error(e);
		}
	}

	static byMostPoints = async (source: any, args: { competition: number }) => {
		const { competition } = args;
		try {
			const match = competition ?
				await getRepository(Match)
					.createQueryBuilder('match')
					.select('match.*')
					.innerJoin('match.votes', 'votes')
					.innerJoin('match.round', 'round')
					.where('round."competitionId" = :competition', { competition })
					.groupBy('match.id')
					.orderBy('SUM("homePoints") - SUM("awayPoints")', 'DESC')
					.limit(1)
					.getRawOne() :
				await getRepository(Match)
					.createQueryBuilder('match')
					.select('match.*')
					.innerJoin('match.votes', 'votes')
					.groupBy('match.id')
					.orderBy('SUM("homePoints") - SUM("awayPoints")', 'DESC')
					.limit(1)
					.getRawOne();
			return match;
		} catch(e) {
			throw new Error(e);
		}
	};

	static getHomeParticipant = async (parent: Match) => {
    try {
      const homeParticipant = await getRepository(Match)
				.findOne({ relations: ['home'], where: { id: parent.id } });
      return homeParticipant?.home;
    } catch(e) {
      throw new Error(e);
    }
  }

  static getAwayParticipant = async (parent: Match) => {
		try {
      const awayParticipant = await getRepository(Match)
				.findOne({ relations: ['away'], where: { id: parent.id } });
      return awayParticipant?.away;
    } catch(e) {
      throw new Error(e);
    }
  }

  static getMatchWinner = async (parent: Match) => {
		try {
      const winner = await getRepository(Match)
				.findOne({ relations: ['winner'], where: { id: parent.id } });
      return winner?.winner;
    } catch(e) {
      throw new Error(e);
    }
  }

  static getMatchLoser = async (parent: Match) => {
		try {
      const loser = await getRepository(Match)
				.findOne({ relations: ['loser'], where: { id: parent.id } });
      return loser?.loser;
    } catch(e) {
      throw new Error(e);
    }
	}

	static getThematics = async (parent: Match) => {
		try {
			const thematics = await getRepository(Thematic)
				.createQueryBuilder('thematic')
				.select('thematic.*')
				.leftJoin('thematic.matches', 'matches')
				.where('matches.id = :id', { id: +parent.id })
				.getRawMany();
			return thematics;
		} catch(e) {
			throw new Error(e);
		}
	};
	
	static getWords = async (parent: Match) => {
		try {
			const words = await getRepository(Word)
				.createQueryBuilder('word')
				.select('word.*')
				.leftJoin('word.matches', 'matches')
				.where('matches.id = :id', { id: parent.id })
				.getRawMany();
			return words;
		} catch(e) {
			throw new Error(e);
		}
	};

	static getVotes = async (parent: Match) => {
		try {
			const votes = await getRepository(Vote)
				.find({ where: { match: parent.id } });
			return votes;
		} catch(e) {
			throw new Error(e);
		}
	};

	static getTotalPlayed = async (parent: { id: number }) => {
		const { id } = parent;
		try {
			const totalPlayed = parent.id ?
				await getRepository(Match)
					.createQueryBuilder('match')
					.innerJoin('match.round', 'round')
					.where('round."competitionId" = :id', { id })
					.andWhere('match."winType" IS NOT NULL')
					.getCount() :
				await getRepository(Match)
					.count({ where: { winType: Not(IsNull()) } })
			return totalPlayed;
		} catch (e) {
			throw Error(e);
		}
	};

	static getTotalByType = (type: WinType) => async (parent: { id: number }) => {
		const { id } = parent;
		try {
			const totalReplicas = parent.id ?
				await getRepository(Match)
					.createQueryBuilder('match')
					.innerJoin('match.round', 'round')
					.where('round."competitionId" = :id', { id })
					.andWhere('match."winType" = :type', { type })
					.getCount() :
				await getRepository(Match)
					.count({ where: { winType: type } });
			return totalReplicas;
		} catch(e) {
			throw Error(e);
		}
	};

	private static getQBBasedOnWinType = (winType: string, competitionId?: number) => {
		const matchQB = getRepository(Match).createQueryBuilder('match')
		const baseQB =  matchQB.where('"winType" = :winType', { winType })

		const qb = competitionId ? 
			baseQB
				.innerJoin("match.round", "round")
				.andWhere("round.competition = :competitionId", { competitionId })
			: baseQB
	
		return qb.getCount();
	}
}

export default MatchesController;
