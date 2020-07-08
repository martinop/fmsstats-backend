import faker from 'faker';
import { getRepository } from "typeorm";
import moment from 'moment';
import { ParticipantType, WinType } from "../types";
import { Competition } from "../entities/Competition";
import { Participant } from "../entities/Participant";
import { Position } from "../entities/Position";
import buildMatches from "./buildMatches";
import { Round } from "../entities/Round";
import { Match } from "../entities/Match";
import { Vote } from "../entities/Vote";

const startDate = moment().subtract(2, 'weeks');

export default async function fillCompetitionData(name: string, participants: Participant[]) {
	const competition = new Competition();
	competition.name = "FMS España";
	competition.participants = participants;

	const freestylers = participants.filter(e => e.type === ParticipantType.FREESTYLER);

	// Save Competition
	await getRepository(Competition).save(competition);

	// Save Freestylers position;
	await getRepository(Position).save(freestylers.map(freestyler => {
		const position = new Position();
		position.participant = freestyler;
		position.competition = competition;
		return position;
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
		match.home = homeId as unknown as Participant
		match.away = awayId as unknown as Participant
		match.round = round;
		if(finished) {
			const judges = participants.filter(e => e.type === ParticipantType.JUDGE);
			const matchWinner = new Participant();
			matchWinner.id = Math.random() > 0.5 ? homeId : awayId;
			const matchLoser = new Participant();
			matchLoser.id = matchWinner.id === homeId ? awayId : homeId;
			match.winner = matchWinner;
			match.loser = matchLoser;
			match.winType = Math.random() > 0.5 ? WinType.DIRECT : WinType.REPLICA;
			match.votes = handleVotes(judges, match);
		}
		await getRepository(Match).save(match);
	}
};

function handleVotes(judges: Participant[], match: Match): Vote[] {
	const votes = judges.map(judge => {
		const vote = new Vote();
		vote.judge = judge;
		const winnerPoints = faker.random.number({ min: 60, max: 105 });
		const loserPoints = faker.random.number({ min: 40, max: 75 });
		const loser = match.winner.id === match.home.id ? match.away : match.home;
		vote.homePoints = match.winner.id === match.home.id ? winnerPoints : loserPoints;
		vote.awayPoints = match.winner.id === match.away.id ? winnerPoints : loserPoints;
		vote.winner = Math.random() > 0.2 ? match.winner : loser;
		vote.loser = vote.winner.id === match.winner.id ? loser : match.winner;
		return vote;
	})
	return votes;
}