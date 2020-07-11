import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
	BaseEntity,
	ManyToOne,
	JoinColumn,
} from "typeorm";
import { Match } from "./Match";
import { Participant } from "./Participant";

@Entity()
export class Vote extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Participant)
  @JoinColumn()
	judge: Participant;
	
	@Column({ default: 0, type: 'numeric' })
	homePoints: number;

	@Column({ default: 0, type: 'numeric' })
	awayPoints: number;
	
  @ManyToOne(type => Participant)
  @JoinColumn()
	winner: Participant;
	
	@ManyToOne(type => Participant)
  @JoinColumn()
	loser: Participant;

	@ManyToOne(type => Match, match => match.votes)
	match: Match;
}
