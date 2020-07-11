import VotesController from "../../controllers/VotesController";

export default {
  Vote: {
    judge: VotesController.getJudge,
    winner: VotesController.getWinner,
    loser: VotesController.getLoser
  }
}