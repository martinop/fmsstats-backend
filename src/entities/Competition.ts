import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Length } from "class-validator";
import { Participant } from './Participant';
import { Round } from './Round';

@Entity()
export class Competition extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(3, 50)
  name: string;

  @Column()
  imageUrl: string

  @ManyToMany(type => Participant, {cascade: true })
  @JoinTable()
  participants: Participant[];  

  @OneToMany(type => Round, round => round.competition, {cascade: true })
  rounds: Round[];
}