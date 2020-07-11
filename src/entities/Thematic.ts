import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
	BaseEntity,
  ManyToMany,
} from "typeorm";
import { Match } from "./Match";

@Entity()
export class Thematic extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
	value: string;
	
	@ManyToMany(type => Match, match => match.thematics)
	matches: Match;
}
