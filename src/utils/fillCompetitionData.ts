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

const mockStartDate = moment().subtract(2, 'weeks');
const mockWords = Array.from({ length: 200 }).map(e => {
	const w = new Word();
	w.mode = Math.random() > 0.5 ? ModeWordType.EASY : ModeWordType.HARD;
	w.value = faker.lorem.word();
	return w;
})

const mockThematics = Array.from({ length: 100 }).map(e => {
	const w = new Thematic();
	w.value = faker.lorem.word();
	return w;
})

export default async function fillCompetitionData(name: string, image: string, participants: Participant[]) {
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

	const round = new Round();
	round.title = 'Jornada 1';
	round.startAt = new Date();
	round.calculated = true;
	round.competition = competition;
	await getRepository(Round).save(round);
	const sweetPain = participants.find(e => e.name === 'Sweet Pain') as Participant;
	const blon = participants.find(e => e.name === 'Blon') as Participant;
	const zasko = participants.find(e => e.name === 'Zasko Master') as Participant;
	const gazir = participants.find(e => e.name === 'Gazir') as Participant;
	const ego = participants.find(e => e.name === 'Mr Ego') as Participant;
	const tirpa = participants.find(e => e.name === 'Tirpa') as Participant;
	const khan = participants.find(e => e.name === 'Khan') as Participant;
	const mnak = participants.find(e => e.name === 'Mnak') as Participant;
	const bnet = participants.find(e => e.name === 'Bnet') as Participant;
	const errece = participants.find(e => e.name === 'Errece') as Participant;
	const estrimo = participants.find(e => e.name === 'Estrimo') as Participant;
	const soen = participants.find(e => e.name === 'Soen') as Participant;
	const noult = participants.find(e => e.name === 'Noult') as Participant;
	const kapo = participants.find(e => e.name === 'Kapo') as Participant;
	const babi = participants.find(e => e.name === 'Babi') as Participant;

  // P1
	const p1 = new Match();
	p1.home = sweetPain
	p1.away = blon
	p1.loser = blon
	p1.round = round;
	p1.winner = sweetPain;
	p1.winType = WinType.DIRECT;
	p1.words = await getAllMatchWords(['estreno', 'sintomas', 'tinder', 'jardin', 'tarde', 'picasso','ladron', 'facebook', 'materia', 'alas', 'universo', 'matricula'], ['mallorca', 'bikini', 'colada', 'libro', 'inmenso', 'apellido', 'safari', 'paisaje', 'carne', 'hielo', 'nasa', 'redes', 'funda', 'pasta', 'ghetto', 'unanime', 'espejo', 'chispa', 'polemica', 'demonio', 'vuelo', 'estudio', 'sexo', 'charla']);
	p1.thematics = await getAllThematics(['Memes', 'Kun Aguero']);

	const v1 = new Vote();
	v1.judge = estrimo;
	v1.winner = sweetPain;
	v1.loser = blon;
	v1.match = p1;
	v1.homePoints = 97;
	v1.awayPoints = 89;
	
	const v2 = new Vote();
	v2.judge = noult;
	v2.winner = blon;
	v2.loser = sweetPain;
	v2.match = p1;
	v2.homePoints = 84;
	v2.awayPoints = 94.5;
	
	const v3 = new Vote();
	v3.judge = babi;
	v3.winner = blon;
	v3.loser = sweetPain;
	v3.match = p1;
	v3.homePoints = 99;
	v3.awayPoints = 105;

	const v4 = new Vote();
	v4.judge = soen;
	v4.winner = sweetPain;
	v4.loser = blon;
	v4.match = p1;
	v4.homePoints = 125;
	v4.awayPoints = 110.5

	const v5 = new Vote();
	v5.judge = kapo;
	v5.winner = sweetPain;
	v5.loser = blon;
	v5.match = p1;
	v5.homePoints = 123.5;
	v5.awayPoints = 102.5

	p1.votes = [v1, v2, v3, v4, v5]

	await getRepository(Match).save(p1);

	// P2
	const p2 = new Match();
	p2.home = zasko
	p2.away = gazir
	p2.loser = gazir
	p2.round = round;
	p2.winner = zasko;
	p2.winType = WinType.DIRECT;
	p2.words = await getAllMatchWords(['flores', 'tortuga', 'linkedin', 'confianza', 'magaluf', 'infinito', 'perdida', 'cancion', 'tumblr', 'fortuna', 'piedra', 'barco'], ['peces', 'chiste', 'gafe', 'ojos', 'moda', 'cristalino', 'globo', 'spoiler', 'jordan', 'enfoque', 'firma', 'medicacion', 'usa', 'gallo', 'aliens', 'nuevo', 'gritos', 'sabor', 'bar', 'margarita', 'brazo', 'maldad', 'sorteo']);
	p2.thematics = await getAllThematics(['Anonymous', 'Frutas']);

	const v11 = new Vote();
	v11.judge = estrimo;
	v11.match = p2;
	v11.homePoints = 93.5;
	v11.awayPoints = 92;
	
	const v22 = new Vote();
	v22.judge = noult;
	v22.winner = zasko;
	v22.loser = gazir;
	v22.match = p2;
	v22.homePoints = 93;
	v22.awayPoints = 86;
	
	const v33 = new Vote();
	v33.judge = babi;
	v33.winner = zasko;
	v33.loser = gazir;
	v33.match = p2;
	v33.homePoints = 101;
	v33.awayPoints = 86;

	const v44 = new Vote();
	v44.judge = soen;
	v44.winner = zasko;
	v44.loser = gazir;
	v44.match = p2;
	v44.homePoints = 121;
	v44.awayPoints = 104.5

	const v55 = new Vote();
	v55.judge = kapo;
	v55.winner = gazir;
	v55.loser = zasko;
	v55.match = p2;
	v55.homePoints = 117;
	v55.awayPoints = 128.5;

	p2.votes = [v11, v22, v33, v44, v55]

	await getRepository(Match).save(p2);

	// P3
	const p3 = new Match();
	p3.home = ego
	p3.away = tirpa
	p3.loser = ego
	p3.round = round;
	p3.winner = tirpa;
	p3.winType = WinType.REPLICA;
	p3.words = await getAllMatchWords(['calma', 'twitter', 'duda', 'vejez', 'almas', 'parecido', 'amantes', 'puentes', 'tiktok', 'ensaimada', 'sabio', 'caramelos'], ['oportunidad', 'voz', 'trastorno', 'euro', 'carcel', 'like', 'fiesta', 'bloqueo', 'sitio', 'veneno', 'top', 'mama', 'medios', 'tarde', 'velocidad', 'ley', 'asistencia', 'igual', 'crpnica', 'registro', 'leon', 'rival', 'despido', 'cara']);
	p3.thematics = await getAllThematics(['Isla', 'Super Poderes']);

	const v111 = new Vote();
	v111.judge = estrimo;
	v111.match = p3;
	v111.homePoints = 76.5;
	v111.awayPoints = 77.5;
	v111.winner = tirpa;
	v111.loser = ego;

	const v222 = new Vote();
	v222.judge = noult;
	v222.match = p3;
	v222.homePoints = 77;
	v222.awayPoints = 78;
	
	const v333 = new Vote();
	v333.judge = babi;
	v333.winner = tirpa;
	v333.loser = ego;
	v333.match = p3;
	v333.homePoints = 75;
	v333.awayPoints = 87.5;

	const v444 = new Vote();
	v444.judge = soen;
	v444.winner = tirpa;
	v444.loser = ego;
	v444.match = p3;
	v444.homePoints = 114;
	v444.awayPoints = 101;

	const v555 = new Vote();
	v555.judge = kapo;
	v555.winner = tirpa;
	v555.loser = ego;
	v555.match = p3;
	v555.homePoints = 103;
	v555.awayPoints = 107;

	p3.votes = [v111, v222, v333, v444, v555]

	await getRepository(Match).save(p3);

	// P4 
	const p4 = new Match();
	p4.home = mnak
	p4.away = khan
	p4.loser = khan
	p4.round = round;
	p4.winner = mnak;
	p4.winType = WinType.DIRECT;
	p4.words = await getAllMatchWords(['coste', 'sobrada', 'nieve', 'puesto', 'whatsapp', 'arte', 'patron', 'nostalgia', 'telegram', 'plaza', 'astronauta', 'bocadillo'], ['giro', 'mundo','sitio', 'cristiano', 'ocasion', 'gesto', 'collazo', 'presa', 'moral', 'litro', 'foso', 'anestesia', 'brillo', 'vacio', 'cerrojo', 'superior', 'labios', 'suerte', 'barrio', 'sapo', 'pecho', 'vida', 'postura']);
	p4.thematics = await getAllThematics(['Sentidos', 'Anime']);

	const v1111 = new Vote();
	v1111.judge = estrimo;
	v1111.match = p4;
	v1111.winner = mnak;
	v1111.loser = khan;
	v1111.homePoints = 79.5;
	v1111.awayPoints = 65;

	const v2222 = new Vote();
	v2222.judge = noult;
	v2222.match = p4;
	v2222.homePoints = 77;
	v2222.awayPoints = 67;
	
	const v3333 = new Vote();
	v3333.judge = babi;
	v3333.winner = mnak;
	v3333.loser = khan;
	v3333.match = p4;
	v3333.homePoints = 82;
	v3333.awayPoints = 74;

	const v4444 = new Vote();
	v4444.judge = soen;
	v4444.winner = mnak;
	v4444.loser = khan;
	v4444.match = p4;
	v4444.homePoints = 91.5;
	v4444.awayPoints = 81;

	const v5555 = new Vote();
	v5555.judge = kapo;
	v5555.winner = mnak;
	v5555.loser = khan;
	v5555.match = p4;
	v5555.homePoints = 98.5;
	v5555.awayPoints = 86.5;

	p4.votes = [v1111, v2222, v3333, v4444, v5555]

	await getRepository(Match).save(p4);

	// P5
	const p5 = new Match();
	p5.home = errece;
	p5.away = bnet
	p5.loser = errece
	p5.round = round;
	p5.winner = bnet;
	p5.winType = WinType.DIRECT;
	p5.words = await getAllMatchWords(['discord', 'estreno', 'sticker', 'credito', 'muela', 'reto', 'gota', 'voluntario', 'skype', 'tiempo', 'pasion', 'ruina'], ['espart', 'money', 'ultima', 'valor', 'lucha', 'derrota', 'pais', 'tapa', 'figura', 'spray', 'modo', 'gato', 'pendiente', 'analisis', 'gente', 'certeza', 'burbuja', 'palacio', 'burro', 'inutil', 'jamas', 'coro', 'pan', 'julio']);
	p5.thematics = await getAllThematics(['Leyendas Urbanas', 'Videojuegos']);

	const v11111 = new Vote();
	v11111.judge = estrimo;
	v11111.match = p5;
	v11111.winner = bnet;
	v11111.loser = errece;
	v11111.homePoints = 78.5;
	v11111.awayPoints = 94;

	const v22222 = new Vote();
	v22222.judge = noult;
	v22222.match = p5;
	v22222.winner = bnet;
	v22222.loser = errece;
	v22222.homePoints = 74.5;
	v22222.awayPoints = 93;

	
	const v33333 = new Vote();
	v33333.judge = babi;
	v33333.winner = bnet;
	v33333.loser = errece;
	v33333.match = p5;
	v33333.homePoints = 82;
	v33333.awayPoints = 97;

	const v44444 = new Vote();
	v44444.judge = soen;
	v44444.winner = bnet;
	v44444.loser = errece;
	v44444.match = p5;
	v44444.homePoints = 104;
	v44444.awayPoints = 114.5

	const v55555 = new Vote();
	v55555.judge = kapo;
	v55555.winner = bnet;
	v55555.loser = errece;
	v55555.match = p5;
	v55555.homePoints = 111;	
	v55555.awayPoints = 136;

	p5.votes = [v11111, v22222, v33333, v44444, v55555]

	await getRepository(Match).save(p5);
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

async function getAllThematics(thematics: string[]): Promise<Thematic[]> {
	const _thematics: Thematic[] = [];
	for await(let t of thematics) {
		const _existing = await getRepository(Thematic).findOne({ where: { value: t }});
		if(_existing) {
			_thematics.push(_existing);
		} else {
			const thematic = new Thematic();
			thematic.value = t;
			_thematics.push(thematic);
		}
	}
	return _thematics
}

async function getAllMatchWords(easy: string[], hard: string[]): Promise<Word[]> {
	const words: Word[] = [];
	for await(let w of easy) {
		const _existing = await getRepository(Word).findOne({ where: { value: w }});
		if(_existing) {
			_existing.mode = ModeWordType.HARD;
			words.push(_existing);
		} else {
			const word = new Word();
			word.value = w;
			word.mode = ModeWordType.HARD;
			words.push(word);
		}
	}
	for await(let w of hard) {
		const _existing = await getRepository(Word).findOne({ where: { value: w }});
		if(_existing) {
			_existing.mode = ModeWordType.HARD;
			words.push(_existing);
		} else {
			const word = new Word();
			word.value = w;
			word.mode = ModeWordType.HARD;
			words.push(word);
		}
	}
	return words;
};

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
			const _words = shuffle(mockWords);
			const _thematics = shuffle(mockThematics);
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