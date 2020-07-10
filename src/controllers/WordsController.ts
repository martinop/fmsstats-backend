import { getManager, EntitySchema, getRepository } from "typeorm";
import WordCompetition from "../entities/WordCompetition";
import { Word } from "../entities/Word";
import { Match } from "../entities/Match";

class WordsController {
  static get = async (source: any, args: { competition: number }) => {
    const { competition } = args; 
    try {
      if(competition) {
        const words = await getManager().find(WordCompetition as any, { competition, take: 15 });
        return words;
      } else {
        const words = await getRepository(Word)
          .createQueryBuilder('word')
          .select('word.*')
          .addSelect('COUNT(*)')
          .leftJoin('word.matches', 'matches')
          .groupBy('word.id')
          .orderBy('count', 'DESC')
          .limit(15)
          .getRawMany();
        return words;
      }

    } catch (e) {
      throw new Error(e);
    }
  }
}

export default WordsController;