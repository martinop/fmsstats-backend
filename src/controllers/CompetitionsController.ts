import { getRepository } from "typeorm";
import { Competition } from "../entities/Competition";
import { Round } from "../entities/Round";

class CompetitionsController {

  static getAll = async () => {
    try {
      const competitions = await getRepository(Competition)
        .find()
      return competitions;
    } catch(e) {
      throw new Error(e);
    }
  };

  static getById = async (parent: any, args: { id: number }) => {
    const { id } = args;
    try {
      const competition = await getRepository(Competition)
        .findOne({ where: { id: +id } });
      return competition;
    } catch(e) {
      throw new Error(e);
    }
  };

  static getRounds = async (parent: Competition) => {
    try {
      const rounds = await getRepository(Round)
        .find({ where: { competition: parent.id } });
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