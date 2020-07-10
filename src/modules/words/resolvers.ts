import WordsController from '../../controllers/WordsController';

export default {
  Query: {
    words: WordsController.getByCompetition,
    wordsByCompetition: WordsController.getByCompetition
  }
}