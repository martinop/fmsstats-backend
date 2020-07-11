import { getRepository } from "typeorm";
import { Competition } from "../entities/Competition";
import { Round } from "../entities/Round";
import { CACHE_TIME, ALL_COMPETITIONS, COMPETITION_BY_ID, COMPETITION_ROUNDS } from "../utils/cacheKeys";

class CompetitionsController {

  static getAll = async () => {
    try {
      const competitions = await getRepository(Competition)
        .find({ cache: { id: ALL_COMPETITIONS, milliseconds: CACHE_TIME } })
      return competitions;
    } catch(e) {
      throw new Error(e);
    }
  };

  static getById = async (parent: any, args: { id: number }) => {
    const { id } = args;
    try {
      const competition = await getRepository(Competition)
        .findOne({ where: { id: +id }, cache: { id: COMPETITION_BY_ID, milliseconds: CACHE_TIME } });
      return competition;
    } catch(e) {
      throw new Error(e);
    }
  };

  static getRounds = async (parent: Competition) => {
    try {
      const rounds = await getRepository(Round)
        .find({ where: { competition: parent.id }, cache: { id: COMPETITION_ROUNDS, milliseconds: CACHE_TIME } });
      return rounds;
    } catch(e) {
      throw new Error(e);
    }
  };

  static getStats = async (parent: Competition) => {
    return { id: parent.id };
  }
};

export default CompetitionsController;