import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
	BaseEntity,
} from "typeorm";
import { Length } from "class-validator";
import { ParticipantType } from "../types";

@Entity()
export class Participant extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(3, 30)
	name: string;

  @Column()
  @Length(15, 100)
  imageUrl: string;

  @Column({
    type: "enum",
    enum: ParticipantType,
    default: ParticipantType.FREESTYLER
  })
	type: ParticipantType;
}
