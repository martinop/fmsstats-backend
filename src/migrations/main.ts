import {MigrationInterface, QueryRunner} from "typeorm";
import spainParticipants from '../mocks/spainParticipants';
import chileParticipants from "../mocks/chileParticipants";

import fillCompetitionData from "../utils/fillCompetitionData";

export class main1594063630166 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await fillCompetitionData("FMS España", "https://vignette.wikia.nocookie.net/rap/images/6/67/FMSESP.jpg/revision/latest/scale-to-width-down/340?cb=20190408030840&path-prefix=es", spainParticipants)
    // await fillCompetitionData("FMS Chile", "https://vignette.wikia.nocookie.net/rap/images/7/7f/FMSCHI.png/revision/latest/window-crop/width/200/x-offset/0/y-offset/0/window-width/513/window-height/512?cb=20190408031504&path-prefix=es", chileParticipants);
  }

  public async down(queryRunner: QueryRunner): Promise<void> { }

}
