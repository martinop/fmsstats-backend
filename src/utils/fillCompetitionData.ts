import faker from 'faker';
import { getRepository } from "typeorm";
import moment from 'moment';
import { ParticipantType, WinType, ModeWordType } from "../types";
import { Competition } from "../entities/Competition";
import { Participant } from "../entities/Participant";
import { Position } from "../entities/Position";
import buildMatches from "./buildMatches";
import { Round } from "../entities/Round";
import { Match } from "../entities/Match";
import { Vote } from "../entities/Vote";
import { JudgeStats } from '../entities/JudgeStats';
import { shuffle } from 'lodash';
import { Word } from '../entities/Word';
import { Thematic } from '../entities/Thematic';

const startDate = moment().subtract(2, 'weeks');
const words = Array.from({ length: 200 }).map(e => {
	const w = new Word();
	w.mode = Math.random() > 0.5 ? ModeWordType.EASY : ModeWordType.HARD;
	w.value = faker.lorem.word();
	return w;
})

const thematics = Array.from({ length: 100 }).map(e => {
	const w = new Thematic();
	w.value = faker.lorem.word();
	return w;
})

export default async function fillCompetitionData(name: string, participants: Participant[]) {
	const competition = new Competition();
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

	const roundsWithMatches = buildMatches(freestylers.length - 1, freestylers.map(e => e.id))

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
	}

}

async function saveMatches(matches: number[][], round: Round, finished: boolean, participants: Participant[]) {
	for await(let matchParticipants of matches) {
		const [homeId, awayId] = matchParticipants;
		const match = new Match();
		match.home = { id: homeId } as unknown as Participant
		match.away = { id: awayId } as unknown as Participant
		match.round = round;
		if(finished) {
			const judges = participants.filter(e => e.type === ParticipantType.JUDGE);
			const { votes, winner, loser } = handleVotes(judges, match);
			const _words = shuffle(words);
			const _thematics = shuffle(thematics);
			match.votes = votes;
			match.winner = winner;
			match.loser = loser;
			match.words = _words.slice(0, 50);
			match.thematics = _thematics.slice(0, 2);
			match.winType = Math.random() > 0.5 ? WinType.DIRECT : WinType.REPLICA;
		}
		await getRepository(Match).save(match);
	}
};

function handleVotes(judges: Participant[], match: Match): { votes: Vote[], winner: Participant, loser: Participant } {
	const votes = judges.map(judge => {
		const vote = new Vote();
		vote.judge = judge;
		const winnerPoints = faker.random.number({ min: 70, max: 105 });
		const loserPoints = faker.random.number({ min: 40, max: 69 });
		vote.homePoints = Math.random() > 0.5 ? winnerPoints : loserPoints;
		vote.awayPoints = vote.homePoints === winnerPoints ? loserPoints : winnerPoints;
		vote.winner = vote.homePoints > vote.awayPoints ? match.home : match.away;
		vote.loser = vote.homePoints < vote.awayPoints ? match.home : match.away;
		return vote;
	})
	const totalAwayPoints = votes.reduce((prev, current) => prev + current.awayPoints, 0);
	const totalHomePoints = votes.reduce((prev, current) => prev + current.homePoints, 0);
	const winner = totalAwayPoints >= totalHomePoints ? match.away : match.home;
	const loser = winner.id === match.away.id ? match.home : match.away;
	return { votes, loser, winner };
}