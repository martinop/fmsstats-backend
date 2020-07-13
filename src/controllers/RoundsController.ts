import { getRepository } from "typeorm";
import { Match } from "../entities/Match";
import { Round } from "../entities/Round";
import { ROUND_MATCHES, CACHE_TIME } from "../utils/cacheKeys";

class RoundsController {
  static getMatches = async (parent: Round) => {
    try {
      const matches = getRepository(Match)
        .find({ where: { round: parent.id }, cache: { id: ROUND_MATCHES, milliseconds: CACHE_TIME } })
      return matches;
    } catch(e) {
      throw new Error(e);
    }
  };
}

export default RoundsController;