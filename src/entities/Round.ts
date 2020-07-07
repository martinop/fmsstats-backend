import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
	BaseEntity,
} from "typeorm";
import { Match } from "./Match";
import { Competition } from "./Competition";

@Entity()
export class Round extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
	title: string;

  @Column({
    type: "timestamptz"
  })
  startAt: Date;

  @Column({ default: false })
  calculated: boolean;

  @OneToMany(type => Match, match => match.round, {cascade: true })
  matches: Match[];
  
  @ManyToOne(type => Competition, competition => competition.rounds)
  competition: Competition;
}
