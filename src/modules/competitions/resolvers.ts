import CompetitionsController from "../../controllers/CompetitionsController";
import MatchesController from "../../controllers/MatchesController";
import WordsController from "../../controllers/WordsController";
import JudgesController from "../../controllers/JudgesController";

export default {
  Query: {
    competitions: CompetitionsController.getAll,
    competition: CompetitionsController.getById,
    globalStats: () => ({})
  },
  Competition: {
    rounds: CompetitionsController.getRounds,
    stats: CompetitionsController.getStats
  },
  CompetitionStats: {
    mostPointsMatch: MatchesController.byMostPoints,
    mostEvenMatch: MatchesController.byDifference('ASC'),
    mostUnevenMatch: MatchesController.byDifference('DESC'),
    mostUsedWords: WordsController.getMostUsed,
    mostEffectiveJudges: JudgesController.byEffectiveness
  },
  GlobalStats: {
    mostPointsMatch: MatchesController.byMostPoints,
    mostEvenMatch: MatchesController.byDifference('ASC'),
    mostUnevenMatch: MatchesController.byDifference('DESC'),
    mostUsedWords: WordsController.getMostUsed,
    mostEffectiveJudges: JudgesController.byEffectiveness
  }
}