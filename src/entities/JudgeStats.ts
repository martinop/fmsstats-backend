import {
  Entity,
  Column,
	BaseEntity,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  AfterUpdate,
} from "typeorm";
import { Participant } from "./Participant";
import { Competition } from "./Competition";

@Entity()
export class JudgeStats extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Participant)
  @JoinColumn()
  judge: Participant;

  @ManyToOne(type => Competition)
  @JoinColumn()
  competition: Competition;

	@Column({ default: 0 })
	fails: number;

	@Column({ default: 0 })
	corrects: number;

  @Column({ default: 0, type: 'numeric' })
  effectiveness: number
}
