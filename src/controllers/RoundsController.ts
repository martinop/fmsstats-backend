import { getRepository } from "typeorm";
import { Match } from "../entities/Match";
import { Round } from "../entities/Round";

class RoundsController {
  static getMatches = async (parent: Round) => {
    try {
      const matches = getRepository(Match)
        .find({ where: { round: parent.id } })
      return matches;
    } catch(e) {
      throw new Error(e);
    }
  };
}

export default RoundsController;