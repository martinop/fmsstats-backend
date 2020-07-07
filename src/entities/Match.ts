import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
	BaseEntity,
	OneToMany,
} from "typeorm";
import { IsNotEmpty } from "class-validator";
import { Participant } from "./Participant";
import { WinType } from "../types";
import { Round } from "./Round";
import { Vote } from "./Vote";
import { Word } from "./Word";
import { Thematic } from "./Thematic";

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
	
	@OneToMany(type => Vote, vote => vote.match, {cascade: true })
	votes: Vote[];

	@OneToMany(type => Word, word => word.match, {cascade: true })
	words: Word[];

	@OneToMany(type => Thematic, thematic => thematic.match, {cascade: true })
	thematics: Thematic[];
}
