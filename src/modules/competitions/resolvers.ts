import CompetitionsController from "../../controllers/CompetitionsController";

export default {
  Query: {
    competitions: CompetitionsController.getAll,
    competition: CompetitionsController.getById
  },
  Competition: {
    rounds: CompetitionsController.getRounds
  }
}