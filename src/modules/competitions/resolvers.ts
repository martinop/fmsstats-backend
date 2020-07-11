import CompetitionsController from "../../controllers/CompetitionsController";
import MatchesController from "../../controllers/MatchesController";
import WordsController from "../../controllers/WordsController";
import JudgesController from "../../controllers/JudgesController";
import { WinType } from "../../types";

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
    mostEffectiveJudges: JudgesController.byEffectiveness,
    played: MatchesController.getTotalPlayed,
    replicas: MatchesController.getTotalByType(WinType.REPLICA),
    directWins: MatchesController.getTotalByType(WinType.DIRECT)
  },
  GlobalStats: {
    mostPointsMatch: MatchesController.byMostPoints,
    mostEvenMatch: MatchesController.byDifference('ASC'),
    mostUnevenMatch: MatchesController.byDifference('DESC'),
    mostUsedWords: WordsController.getMostUsed,
    mostEffectiveJudges: JudgesController.byEffectiveness,
    played: MatchesController.getTotalPlayed,
    replicas: MatchesController.getTotalByType(WinType.REPLICA),
    directWins: MatchesController.getTotalByType(WinType.DIRECT)
  }
}