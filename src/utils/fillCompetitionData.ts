import faker from 'faker';
import { getRepository } from "typeorm";
import moment from 'moment';
import { ParticipantType, WinType, ModeWordType } from "../types";
import { Competition } from "../entities/Competition";
import { Participant } from "../entities/Participant";
import { Position } from "../entities/Position";
// import buildMatches from "./buildMatches";
// import { Round } from "../entities/Round";
// import { Match } from "../entities/Match";
// import { Vote } from "../entities/Vote";
import { JudgeStats } from '../entities/JudgeStats';
import { Word } from '../entities/Word';
import { Thematic } from '../entities/Thematic';

// const mockStartDate = moment().subtract(2, 'weeks');
// const mockWords = Array.from({ length: 200 }).map(e => {
// 	const w = new Word();
// 	w.mode = Math.random() > 0.5 ? ModeWordType.EASY : ModeWordType.HARD;
// 	w.value = faker.lorem.word();
// 	return w;
// })

// const mockThematics = Array.from({ length: 100 }).map(e => {
// 	const w = new Thematic();
// 	w.value = faker.lorem.word();
// 	return w;
// })

export default async function fillCompetitionData(name: string, image: string, participants: Participant[]): Promise<Competition> {
	const competition = new Competition();
	competition.imageUrl = image;
	competition.name = name;
	competition.participants = participants;

	const freestylers = participants.filter(e => e.type === ParticipantType.FREESTYLER);
	const judges = participants.filter(e => e.type === ParticipantType.JUDGE);

	// Save Competition
	await getRepository(Competition).save(competition);

	// Save Freestylers position;
	await getRepository(Position).save(freestylers.map(freestyler => {
		const position = new Position();
		position.participant = freestyler;
		position.competition = competition;
		return position;
	}))

	// Save initial judge stats
	await getRepository(JudgeStats).save(judges.map(judge => {
		const judgeStat = new JudgeStats();
		judgeStat.judge = judge;
		judgeStat.competition = competition;
		return judgeStat;
	}))

	return competition;

	/* const roundsWithMatches = buildMatches(freestylers.length - 1, freestylers.map(e => e.id))

	let roundAcc = 1;
	for await (let matches of roundsWithMatches) {
		const round = new Round();
		round.title = `Jornada ${roundAcc}`;
		const startAt = startDate.clone().add(roundAcc - 1, 'weeks');
		const finished = startAt.clone().isBefore(moment());
		round.startAt = new Date(startAt.format());
		round.calculated = finished;
		round.competition = competition;

		await getRepository(Round).save(round);
		await saveMatches(matches, round, finished, participants);
		roundAcc++;
	}*/

}