import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
	BaseEntity,
	ManyToOne,
} from "typeorm";
import { Match } from "./Match";

@Entity()
export class Thematic extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
	value: string;
	
	@ManyToOne(type => Match, match => match.votes)
	match: Match;
}
