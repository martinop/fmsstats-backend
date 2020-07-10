import { getRepository } from "typeorm";
import { Word } from "../entities/Word";
import { Competition } from "../entities/Competition";

class WordsController {
  static getByCompetition = async (source: any, args: { competition: number }) => {
    const { competition } = args; 
    try {
    } catch (e) {
      throw new Error(e);
    }
    return [];
  }
}

export default WordsController;