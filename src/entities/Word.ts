import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
	BaseEntity,
	ManyToOne,
} from "typeorm";
import { ModeWordType } from '../types';

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
}
