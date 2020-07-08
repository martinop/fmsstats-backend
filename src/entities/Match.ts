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
} from "typeorm";

import { IsNotEmpty } from "class-validator";
import { Participant } from "./Participant";
import { WinType } from "../types";
import { Round } from "./Round";
import { Vote } from "./Vote";
import { Word } from "./Word";
import { Thematic } from "./Thematic";
import { Position } from "./Position";

function getParticipantPTB() {

}
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

	@OneToMany(type => Word, word => word.match, {cascade: true })
	words: Word[];

	@OneToMany(type => Thematic, thematic => thematic.match, {cascade: true })
  thematics: Thematic[];
  
  getPTBAverage() {
    const ptb = this.votes.reduce((prev, current) => {
      return prev + (current.winner.id === this.home.id ? current.homePoints : current.awayPoints)
    }, 0);
    return ptb / this.votes.length;
  }

  @AfterInsert()
  async updatePositions() {
    if(this.winner) {
      const directWin = this.winType === WinType.DIRECT;
      const ptb = this.getPTBAverage();
      getConnection()
        .createQueryBuilder()
        .update(Position)
        .set({
          points: () => `points + ${directWin ? 3 : 2}`,
          ...directWin && { wins: () => 'wins + 1'},
          ...this.votes.length && {
            ptb: () => `ptb + ${ptb}`,
          }
          // ...!directWin && { winsReplica: () => 'winsReplica + 1'},
        })
        .where("participant.id = :id", { id: this.winner.id })
        .execute()
    }
    if(this.loser) {
      const directLose = this.winType === WinType.DIRECT;
      const ptb = this.getPTBAverage();
      getConnection()
        .createQueryBuilder()
        .update(Position)
        .set({
          points: () => `points + ${directLose ? 0 : 1}`,
          ...directLose && { loses: () => 'loses + 1'},
          ...this.votes.length && {
            ptb: () => `ptb + ${ptb}`,
          }
          // ...!directWin && { winsReplica: () => 'winsReplica + 1'},
        })
        .where("participant.id = :id", { id: this.loser.id })
        .execute()
    }
  }
}
