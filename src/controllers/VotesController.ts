import { getRepository } from "typeorm";
import { Vote } from "../entities/Vote";
import { Participant } from "../entities/Participant";

class VotesController {

  static getJudge = async (parent: Vote) => {
		try {
      const participant = await getRepository(Vote)
				.findOne({ relations: ['judge'], where: { id: parent.id } });
      return participant?.judge;
    } catch(e) {
      throw new Error(e);
    }
  } 

  static getWinner = async (parent: Vote) => {
		try {
      const participant = await getRepository(Vote)
				.findOne({ relations: ['winner'], where: { id: parent.id } });
      return participant?.winner;
    } catch(e) {
      throw new Error(e);
    }
  }

  static getLoser = async (parent: Vote) => {
		try {
      const participant = await getRepository(Vote)
				.findOne({ relations: ['loser'], where: { id: parent.id } });
      return participant?.loser;
    } catch(e) {
      throw new Error(e);
    }
  }

}

export default VotesController;