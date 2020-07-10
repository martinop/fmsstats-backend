import { ViewEntity, ViewColumn } from "typeorm";
import { ModeWordType } from "../types";

@ViewEntity({
  expression: `SELECT w.*, r."competitionId" as competition, COUNT(*) as count FROM match_words_word mw RIGHT JOIN match m ON m.id = mw."matchId" 
    RIGHT JOIN round r ON r.id = m."roundId" INNER JOIN word w ON w.id = mw."wordId" WHERE value IS NOT NULL GROUP BY (w.id, competition) 
    ORDER BY count DESC;`
})
class WordCompetition {

  @ViewColumn()
  id: number

  @ViewColumn()
  value: string

  @ViewColumn()
  mode: ModeWordType

  @ViewColumn()
  count: number

  @ViewColumn()
  competition: number
  
}

export default WordCompetition;