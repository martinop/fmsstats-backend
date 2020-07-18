import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
	BaseEntity,
} from "typeorm";
import { Participant } from "./Participant";
import { Competition } from "./Competition";

@Entity()
export class Position extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Participant)
  @JoinColumn()
  participant: Participant;

  @ManyToOne(type => Competition)
  @JoinColumn()
  competition: Competition;

	@Column({ default: 0 })
	points: number;

	@Column({ default: 0 })
	wins: number;

	@Column({ default: 0 })
	loses: number;

	@Column({ default: 0 })
	winsReplica: number;

	@Column({ default: 0 })
	losesReplica: number;

  @Column({ default: 0, type: 'numeric' })
	ptb: number;
}
