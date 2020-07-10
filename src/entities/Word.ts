import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
	BaseEntity,
  ManyToMany,
} from "typeorm";
import { ModeWordType } from '../types';
import { Match } from "./Match";

@Entity()
export class Word extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: string;
  
  @Column({
    type: "enum",
    enum: ModeWordType,
  })
  mode: ModeWordType;

  @ManyToMany(type => Match, match => match.words)
  matches: Match
}
