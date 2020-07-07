import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
	BaseEntity,
	ManyToOne,
} from "typeorm";
import { ModeWordType } from '../types';
import { Match } from "./Match";

@Entity()
export class Word extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: number;
  
  @Column({
    type: "enum",
    enum: ModeWordType,
  })
	mode: ModeWordType;
	
	@ManyToOne(type => Match, match => match.votes)
	match: Match;
}
