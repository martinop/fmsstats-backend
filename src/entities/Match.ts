import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
	BaseEntity,
	OneToMany,
  AfterInsert,
  getConnection,
  ManyToMany,
  JoinTable,
} from "typeorm";

import { IsNotEmpty } from "class-validator";
import { Participant } from "./Participant";
import { WinType } from "../types";
import { Round } from "./Round";
import { Vote } from "./Vote";
import { Word } from "./Word";
import { Thematic } from "./Thematic";
import { Position } from "./Position";
import { JudgeStats } from "./JudgeStats";

@Entity()
export class Match extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  
  @ManyToOne(type => Participant)
  @JoinColumn()
  home: Participant;

  @ManyToOne(type => Participant)
  @JoinColumn()
  away: Participant;

  @ManyToOne(type => Participant)
  @JoinColumn()
  winner: Participant;

  @ManyToOne(type => Participant)
  @JoinColumn()
  loser: Participant;

  @Column({
    type: "enum",
    enum: WinType,
    nullable: true,
  })
  winType: WinType

  @Column({ default: true })
  @IsNotEmpty()
  active: boolean;

  @ManyToOne(type => Round, round => round.matches)
	round: Round;
	
	@OneToMany(type => Vote, vote => vote.match, {cascade: true})
	votes: Vote[];

  @ManyToMany(type => Word, word => word.matches, {cascade: true })
  @JoinTable()
	words: Word[];

  @ManyToMany(type => Thematic, thematic => thematic.matches, {cascade: true })
  @JoinTable()
  thematics: Thematic[];
  
  getPTBAverage(participant: Participant) {
    const pointsProp = participant.id === this.home.id ? 'homePoints' : 'awayPoints';
    const sortedVotes = this.votes.sort((a,b) => a[pointsProp] - b[pointsProp]).map(e => e[pointsProp]);
    sortedVotes.shift()
    sortedVotes.pop()
    const ptb = sortedVotes.reduce((prev, current) => prev + Number(current), 0);
    return ptb;
  }

  updateJudgeStats() {
    for(const vote of this.votes) {
      const correct = vote.winner ? vote.winner.id === this.winner.id : null;
      getConnection()
        .createQueryBuilder()
        .update(JudgeStats)
        .set({
          ...correct && { corrects: () => 'corrects + 1', effectiveness: () => 'ROUND((corrects + 1) / CAST((corrects + fails + ties + 1) as NUMERIC), 2)' },
          ...!correct && { fails: () => 'fails + 1', effectiveness: () => 'ROUND(corrects / CAST((corrects + fails + ties + 1) as NUMERIC), 2)' },
          ...correct === null && { ties: () => 'ties + 1', effectiveness: () => 'ROUND(corrects / CAST((corrects + fails + ties + 1) as NUMERIC), 2)' }
        })
        .where('"judgeId" = :judge', { judge: vote.judge.id })
        .andWhere('"competitionId" = :competition', { competition: this.round.competition.id })
        .execute();
    };
  }

  @AfterInsert()
  async updatePositions() {
    if(this.winner) {
      const directWin = this.winType === WinType.DIRECT;
      const ptb = this.getPTBAverage(this.winner);
      this.updateJudgeStats();
      getConnection()
        .createQueryBuilder()
        .update(Position)
        .set({
          points: () => `points + ${directWin ? 3 : 2}`,
          ...directWin && { wins: () => 'wins + 1'},
          ...!directWin && { winsReplica: () => '"winsReplica" + 1'},
          ...this.votes.length && {
            ptb: () => `ptb + ${ptb}`,
          }
        })
        .where("participant.id = :id", { id: this.winner.id })
        .execute()
    }
    if(this.loser) {
      const directLose = this.winType === WinType.DIRECT;
      const ptb = this.getPTBAverage(this.loser);
      getConnection()
        .createQueryBuilder()
        .update(Position)
        .set({
          points: () => `points + ${directLose ? 0 : 1}`,
          ...directLose && { loses: () => 'loses + 1'},
          ...!directLose && { losesReplica: () => '"losesReplica" + 1'},
          ...this.votes.length && {
            ptb: () => `ptb + ${ptb}`,
          }
        })
        .where("participant.id = :id", { id: this.loser.id })
        .execute()
    }
  }
}
