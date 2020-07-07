import {MigrationInterface, QueryRunner, getRepository} from "typeorm";
import moment from 'moment';
import faker from 'faker';
import { Competition } from "../entities/Competition";
import { getSpainParticipants, getChileParticipants, getMatches } from "../utils";
import { Round } from "../entities/Round";
import { Match } from "../entities/Match";
import { ParticipantType, WinType } from "../types";
import { Participant } from "../entities/Participant";
import { Vote } from "../entities/Vote";

export class main1594063630166 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const competitionRepo = getRepository(Competition)
    const fmsSpain = new Competition();
    fmsSpain.name = "FMS España";
    fmsSpain.participants = getSpainParticipants();
     
    const fmsChile = new Competition();
    fmsChile.name = "FMS Chile";
    fmsChile.participants = getChileParticipants();

    await competitionRepo.save([fmsSpain, fmsChile]);

    const startDate = moment().subtract(2, 'weeks');
    const freestylers = fmsSpain.participants.filter(e => e.type === ParticipantType.FREESTYLER);
    fmsSpain.rounds = getMatches(freestylers.length - 1, freestylers.map(e => e.id)).map((matches, index) => {
      const round = new Round();
      round.title = `Jornada ${index + 1}`;
      const startAt = startDate.clone().add(index, 'weeks');
      const finished = startAt.clone().isBefore(moment());
      round.startAt = new Date(startAt.format());
      round.calculated = finished;
      round.matches = matches.map(e => {
        const [homeId, awayId] = e;
        const match = new Match();
        match.home = homeId as unknown as Participant
        match.away = awayId as unknown as Participant
        if(finished) {
          const matchWinner = new Participant();
          matchWinner.id = Math.random() > 0.5 ? homeId : awayId;
          match.winner = matchWinner;
          match.winType = Math.random() > 0.5 ? WinType.DIRECT : WinType.REPLICA;
          const judges = fmsSpain.participants.filter(e => e.type === ParticipantType.JUDGE);
          match.votes = judges.map(judge => {
            const vote = new Vote();
            vote.judge = judge;
            const winnerPoints = faker.random.number({ min: 60, max: 105 });
            const loserPoints = faker.random.number({ min: 40, max: 75 });
            const loser = match.winner.id === homeId ? awayId : homeId;
            vote.homePoints = match.winner.id === homeId ? winnerPoints : loserPoints;
            vote.awayPoints = match.winner.id === awayId ? winnerPoints : loserPoints;
            vote.winner = Math.random() > 0.2 ? match.winner : loser as unknown as Participant;
            vote.loser = (vote.winner.id === homeId ? awayId : homeId) as unknown as Participant;
            return vote;
          })
        }
        return match;
      })
      return round;
    })

    await competitionRepo.save([fmsSpain]);

  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }

}
