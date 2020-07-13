import { getRepository, IsNull, Not } from "typeorm";
import { Match } from "../entities/Match";
import { WinType } from "../types";
import { Word } from "../entities/Word";
import { Thematic } from "../entities/Thematic";
import { Vote } from "../entities/Vote";
import {
  CACHE_TIME,
  MATCHES_BY_DIFFERENCE_COMPETITION,
  MATCHES_BY_DIFFERENCE_GLOBAL,
  MATCHES_BY_POINTS_COMPETITION,
  MATCHES_BY_POINTS_GLOBAL,
  MATCH_HOME_PARTICIPANT,
	MATCH_AWAY_PARTICIPANT,
	MATCH_WINNER_PARTICIPANT,
	MATCH_LOSER_PARTICIPANT,
	MATCH_THEMATICS,
	MATCH_WORDS,
	MATCH_VOTES,
	MATCH_PLAYED_COMPETITION,
	MATCH_PLAYED_GLOBAL,
	MATCH_BY_TYPE_COMPETITION,
	MATCH_BY_TYPE_GLOBAL,
	MATCH_HOME_POINTS,
	MATCH_AWAY_POINTS,
} from "../utils/cacheKeys";

class MatchesController {
	
	static byDifference = (order: 'DESC' | 'ASC') => async (parent: { id: number }) => {
		const competition = parent.id;
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
					.cache({ id: MATCHES_BY_DIFFERENCE_COMPETITION, milliseconds: CACHE_TIME })
					.getRawOne() :
				await getRepository(Match)
					.createQueryBuilder('match')
					.select('match.*')
					.innerJoin('match.votes', 'votes')
					.groupBy('match.id')
					.orderBy('ABS(SUM("homePoints") - SUM("awayPoints"))', order)
					.limit(1)
					.cache({ id: MATCHES_BY_DIFFERENCE_GLOBAL, milliseconds: CACHE_TIME })
					.getRawOne();
			return match;
		} catch(e) {
			throw new Error(e);
		}
	}

	static byMostPoints = async (parent: { id: number }) => {
		const competition = parent.id;
		try {
			const match = competition ?
				await getRepository(Match)
					.createQueryBuilder('match')
					.select('match.*')
					.innerJoin('match.votes', 'votes')
					.innerJoin('match.round', 'round')
					.where('round."competitionId" = :competition', { competition })
					.groupBy('match.id')
					.orderBy('SUM("homePoints") + SUM("awayPoints")', 'DESC')
					.limit(1)
					.cache({ id: MATCHES_BY_POINTS_COMPETITION, milliseconds: CACHE_TIME })
					.getRawOne() :
				await getRepository(Match)
					.createQueryBuilder('match')
					.select('match.*')
					.innerJoin('match.votes', 'votes')
					.groupBy('match.id')
					.orderBy('SUM("homePoints") + SUM("awayPoints")', 'DESC')
					.limit(1)
					.cache({ id: MATCHES_BY_POINTS_GLOBAL, milliseconds: CACHE_TIME })
					.getRawOne();
			return match;
		} catch(e) {
			throw new Error(e);
		}
	};

	static getHomeParticipant = async (parent: Match) => {
    try {
      const homeParticipant = await getRepository(Match)
				.findOne({ relations: ['home'], where: { id: parent.id }, cache: { id: MATCH_HOME_PARTICIPANT, milliseconds: CACHE_TIME } });
      return homeParticipant?.home;
    } catch(e) {
      throw new Error(e);
    }
  }

  static getAwayParticipant = async (parent: Match) => {
		try {
      const awayParticipant = await getRepository(Match)
				.findOne({ relations: ['away'], where: { id: parent.id }, cache: { id: MATCH_AWAY_PARTICIPANT, milliseconds: CACHE_TIME } });
      return awayParticipant?.away;
    } catch(e) {
      throw new Error(e);
    }
  }

  static getMatchWinner = async (parent: Match) => {
		try {
      const winner = await getRepository(Match)
				.findOne({ relations: ['winner'], where: { id: parent.id }, cache: { id: MATCH_WINNER_PARTICIPANT, milliseconds: CACHE_TIME } });
      return winner?.winner;
    } catch(e) {
      throw new Error(e);
    }
  }

  static getMatchLoser = async (parent: Match) => {
		try {
      const loser = await getRepository(Match)
				.findOne({ relations: ['loser'], where: { id: parent.id }, cache: { id: MATCH_LOSER_PARTICIPANT, milliseconds: CACHE_TIME } });
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
				.cache({ id: MATCH_THEMATICS, milliseconds: CACHE_TIME })
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
				.cache({ id: MATCH_WORDS, milliseconds: CACHE_TIME })
				.getRawMany();
			return words;
		} catch(e) {
			throw new Error(e);
		}
	};

	static getVotes = async (parent: Match) => {
		try {
			const votes = await getRepository(Vote)
				.find({ where: { match: parent.id }, cache: { id: MATCH_VOTES, milliseconds: CACHE_TIME } });
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
					.cache({ id: MATCH_PLAYED_COMPETITION, milliseconds: CACHE_TIME })
					.getCount() :
				await getRepository(Match)
					.count({ where: { winType: Not(IsNull()) }, cache: { id: MATCH_PLAYED_GLOBAL, milliseconds: CACHE_TIME } })
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
					.cache({ id: MATCH_BY_TYPE_COMPETITION, milliseconds: CACHE_TIME })
					.getCount() :
				await getRepository(Match)
					.count({ where: { winType: type }, cache: { id: MATCH_BY_TYPE_GLOBAL, milliseconds: CACHE_TIME } });
			return totalReplicas;
		} catch(e) {
			throw Error(e);
		}
	};

	static getHomePoints = async (parent: Match) => {
		try {
			const homePoints = await getRepository(Match)
				.createQueryBuilder('match')
				.select('SUM("homePoints")')
				.innerJoin('match.votes', 'votes')
				.where('match.id = :id', { id: parent.id })
				.groupBy('"matchId"')
				.cache({ id: MATCH_HOME_POINTS, milliseconds: CACHE_TIME })
				.getRawOne();
			return homePoints?.sum;
		} catch(e) {
			throw new Error(e);
		}
	};

	static getAwayPoints = async (parent: Match) => {
		try {
			const awayPoints = await getRepository(Match)
				.createQueryBuilder('match')
				.select('SUM("awayPoints")')
				.innerJoin('match.votes', 'votes')
				.where('match.id = :id', { id: parent.id })
				.groupBy('"matchId"')
				.cache({ id: MATCH_AWAY_POINTS, milliseconds: CACHE_TIME })
				.getRawOne();
			return awayPoints?.sum;
		} catch(e) {
			throw new Error(e);
		}
	};
}

export default MatchesController;
