import { Match } from "../entities/Match";
import { getRepository } from "typeorm";
import { Participant } from "../entities/Participant";

class ParticipantsController {
  static getAll = async () => {
    try {
      const participants = await getRepository(Participant)
        .find();
      return participants;
    } catch(e) {
      throw new Error(e);
    }
  };

  static getById = async (parent: any, args: { id: number }) => {
    const { id } = args;
    try {
      const participant = await getRepository(Participant)
        .findOne({ where: { id: +id } });
      return participant;
    } catch(e) {
      throw new Error(e);
    }
  };
}

export default ParticipantsController;