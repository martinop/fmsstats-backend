import ParticipantsController from "../../controllers/ParticipantsController";

export default {
  Query: {
    participants: ParticipantsController.getAll,
    participant: ParticipantsController.getById
  }
}