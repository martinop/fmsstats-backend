import {MigrationInterface, QueryRunner} from "typeorm";
import spainParticipants from '../mocks/spainParticipants';
import chileParticipants from "../mocks/chileParticipants";

import fillCompetitionData from "../utils/fillCompetitionData";

export class main1594063630166 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await fillCompetitionData("FMS España", spainParticipants)
    await fillCompetitionData("FMS Chile", chileParticipants);
  }

  public async down(queryRunner: QueryRunner): Promise<void> { }

}
