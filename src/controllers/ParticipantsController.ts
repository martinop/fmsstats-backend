import { getRepository } from "typeorm";
import { Participant } from "../entities/Participant";
import { ALL_PARTICIPANTS, CACHE_TIME, PARTICIPANT_BY_ID } from "../utils/cacheKeys";

class ParticipantsController {
  static getAll = async () => {
    try {
      const participants = await getRepository(Participant)
        .find({ /* cache: { id: ALL_PARTICIPANTS, milliseconds: CACHE_TIME }*/ });
      return participants;
    } catch(e) {
      throw new Error(e);
    }
  };

  static getById = async (parent: any, args: { id: number }) => {
    const { id } = args;
    try {
      const participant = await getRepository(Participant)
        .findOne({ where: { id: +id }, /* cache: { id: PARTICIPANT_BY_ID, milliseconds: CACHE_TIME }*/ });
      return participant;
    } catch(e) {
      throw new Error(e);
    }
  };
}

export default ParticipantsController;