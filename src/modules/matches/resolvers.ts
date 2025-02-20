import MatchesController from "../../controllers/MatchesController";

export default {
  Match: {
    home: MatchesController.getHomeParticipant,
    away: MatchesController.getAwayParticipant,
    winner: MatchesController.getMatchWinner,
    loser: MatchesController.getMatchLoser,
    words: MatchesController.getWords,
    thematics: MatchesController.getThematics,
    votes: MatchesController.getVotes,
    homePoints: MatchesController.getHomePoints,
    awayPoints: MatchesController.getAwayPoints
  }
}