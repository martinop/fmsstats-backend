import {MigrationInterface, QueryRunner, getRepository} from "typeorm";
import spainParticipants from '../mocks/spainParticipants';
// import chileParticipants from "../mocks/chileParticipants";
import peruParticipants from "../mocks/peruParticipants";

import fillCompetitionData from "../utils/fillCompetitionData";
import { Match } from "../entities/Match";
import { Vote } from "../entities/Vote";
import { WinType, ModeWordType } from "../types";
import { Round } from "../entities/Round";
import { Participant } from "../entities/Participant";
import { Thematic } from "../entities/Thematic";
import { Word } from "../entities/Word";

export class main1594063630166 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const competitionPeru = await fillCompetitionData("FMS Peru", "https://freetrivias.s3-us-west-2.amazonaws.com/freestylers/fmsperu.jpg", peruParticipants)
    const roundp = new Round();
    roundp.title = 'Jornada 1';
    roundp.startAt = new Date();
    roundp.calculated = true;
    roundp.competition = competitionPeru;

    await getRepository(Round).save(roundp);

    const skill = peruParticipants.find(e => e.name === 'Skill') as Participant;
    const choque = peruParticipants.find(e => e.name === 'Choque') as Participant;
    const jaze = peruParticipants.find(e => e.name === 'Jaze') as Participant;
    const jota = peruParticipants.find(e => e.name === 'Jota') as Participant;

    const hbd = peruParticipants.find(e => e.name === 'HBD') as Participant;
    const vellutino = peruParticipants.find(e => e.name === 'Vellutino') as Participant;
    const joro = peruParticipants.find(e => e.name === 'Joro') as Participant;
    const fox = peruParticipants.find(e => e.name === 'Fox') as Participant;
    const gcr = peruParticipants.find(e => e.name === 'Gcr') as Participant;
    
    // P1
    const pp1 = new Match();
    pp1.home = choque
    pp1.away = skill
    pp1.winner = skill;
    pp1.loser = choque
    pp1.round = roundp;
    pp1.winType = WinType.DIRECT;
    pp1.words = await this.getAllMatchWords(['oportunidad', 'creacion', 'diamante', 'paseo', 'ceremonia', 'estreno', 'valor', 'pesca', 'vision', 'tierra', 'luz', 'redes'], ['sandalias', 'chicha', 'quiebra', 'ardilla', 'razon', 'timbre', 'lluvia', 'redacta', 'tuberia', 'cuba', 'region', 'ardor', 'daga', 'iglesia', 'chela', 'huerto', 'rama', 'paraiso', 'instinto', 'simple']);
    pp1.thematics = await this.getAllThematics(['Tahuantinsuyo', 'Congreso']);

    const pv1 = new Vote();
    pv1.judge = vellutino;
    pv1.winner = skill;
    pv1.loser = choque;
    pv1.match = pp1;
    pv1.homePoints = 58;
    pv1.awayPoints = 76.5;
    
    const pv2 = new Vote();
    pv2.judge = fox;
    pv2.winner = skill;
    pv2.loser = choque;
    pv2.match = pp1;
    pv2.homePoints = 72;
    pv2.awayPoints = 86;
    
    const pv3 = new Vote();
    pv3.judge = joro;
    pv3.winner = skill;
    pv3.loser = choque;
    pv3.match = pp1;
    pv3.homePoints = 110;
    pv3.awayPoints = 124;
  
    const pv4 = new Vote();
    pv4.judge = gcr;
    pv4.winner = skill;
    pv4.loser = choque;
    pv4.match = pp1;
    pv4.homePoints = 55;
    pv4.awayPoints = 107.5;
  
    const pv5 = new Vote();
    pv5.judge = hbd;
    pv5.winner = skill;
    pv5.loser = choque;
    pv5.match = pp1;
    pv5.homePoints = 85.5;
    pv5.awayPoints = 101;
  
    pp1.votes = [pv1, pv2, pv3, pv4, pv5]
  
    await getRepository(Match).save(pp1);
    
    // P2
    const pp2 = new Match();
    pp2.home = jaze
    pp2.away = jota
    pp2.winner = jota;
    pp2.loser = jaze
    pp2.round = roundp;
    pp2.winType = WinType.DIRECT;
    pp2.words = await this.getAllMatchWords(['corona', 'leon', 'youtube', 'directo', 'hielo', 'reaccion', 'valor', 'silencio', 'clima', 'tesoro', 'calendario', 'pueblo'], ['costa', 'material', 'iris', 'chamba', 'mosca', 'lento', 'sal', 'antartida', 'trailer', 'messi', 'cicatriz', 'tren', 'arena', 'cadena', 'ejecucion', 'problema', 'paz', 'kharma', 'cuchillo', 'acto']);
    pp2.thematics = await this.getAllThematics(['Tahuantinsuyo', 'Congreso']);

    const pv11 = new Vote();
    pv11.judge = vellutino;
    pv11.winner = jaze;
    pv11.loser = jota;
    pv11.match = pp2;
    pv11.homePoints = 129.5;
    pv11.awayPoints = 117;
    
    const pv22 = new Vote();
    pv22.judge = fox;
    pv22.winner = jota;
    pv22.loser = jaze;
    pv22.match = pp2;
    pv22.homePoints = 96.5;
    pv22.awayPoints = 106;
    
    const pv33 = new Vote();
    pv33.judge = joro;
    pv33.winner = jota;
    pv33.loser = jaze;
    pv33.match = pp2;
    pv33.homePoints = 96.5;
    pv33.awayPoints = 111.5
  
    const pv44 = new Vote();
    pv44.judge = gcr;
    pv44.winner = jota;
    pv44.loser = jaze;
    pv44.match = pp2;
    pv44.homePoints = 93.5;
    pv44.awayPoints = 104;
  
    const pv55 = new Vote();
    pv55.judge = hbd;
    pv55.winner = jota;
    pv55.loser = jaze;
    pv55.match = pp2;
    pv55.homePoints = 76.5;
    pv55.awayPoints = 89
  
    pp2.votes = [pv11, pv22, pv33, pv44, pv55]
  
    await getRepository(Match).save(pp2);
    
    const competition = await fillCompetitionData("FMS España", "https://freetrivias.s3-us-west-2.amazonaws.com/freestylers/fmsspain.jpg", spainParticipants)
    
    const round = new Round();
    round.title = 'Jornada 1';
    round.startAt = new Date();
    round.calculated = true;
    round.competition = competition;

    await getRepository(Round).save(round);

    const sweetPain = spainParticipants.find(e => e.name === 'Sweet Pain') as Participant;
    const blon = spainParticipants.find(e => e.name === 'Blon') as Participant;
    const zasko = spainParticipants.find(e => e.name === 'Zasko Master') as Participant;
    const gazir = spainParticipants.find(e => e.name === 'Gazir') as Participant;
    const ego = spainParticipants.find(e => e.name === 'Mr Ego') as Participant;
    const tirpa = spainParticipants.find(e => e.name === 'Tirpa') as Participant;
    const khan = spainParticipants.find(e => e.name === 'Khan') as Participant;
    const mnak = spainParticipants.find(e => e.name === 'Mnak') as Participant;
    const bnet = spainParticipants.find(e => e.name === 'Bnet') as Participant;
    const errece = spainParticipants.find(e => e.name === 'Errece') as Participant;
    const estrimo = spainParticipants.find(e => e.name === 'Estrimo') as Participant;
    const soen = spainParticipants.find(e => e.name === 'Soen') as Participant;
    const noult = spainParticipants.find(e => e.name === 'Noult') as Participant;
    const kapo = spainParticipants.find(e => e.name === 'Kapo') as Participant;
    const babi = spainParticipants.find(e => e.name === 'Babi') as Participant;
  
    // P1
    const p1 = new Match();
    p1.home = sweetPain
    p1.away = blon
    p1.loser = blon
    p1.round = round;
    p1.winner = sweetPain;
    p1.winType = WinType.DIRECT;
    p1.words = await this.getAllMatchWords(['estreno', 'sintomas', 'tinder', 'jardin', 'tarde', 'picasso','ladron', 'facebook', 'materia', 'alas', 'universo', 'matricula'], ['mallorca', 'bikini', 'colada', 'libro', 'inmenso', 'apellido', 'safari', 'paisaje', 'carne', 'hielo', 'nasa', 'redes', 'funda', 'pasta', 'ghetto', 'unanime', 'espejo', 'chispa', 'polemica', 'demonio', 'vuelo', 'estudio', 'sexo', 'charla']);
    p1.thematics = await this.getAllThematics(['Memes', 'Kun Aguero']);
  
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
    p2.words = await this.getAllMatchWords(['flores', 'tortuga', 'linkedin', 'confianza', 'magaluf', 'infinito', 'perdida', 'cancion', 'tumblr', 'fortuna', 'piedra', 'barco'], ['peces', 'chiste', 'gafe', 'ojos', 'moda', 'cristalino', 'globo', 'spoiler', 'jordan', 'enfoque', 'firma', 'medicacion', 'usa', 'gallo', 'aliens', 'nuevo', 'gritos', 'sabor', 'bar', 'margarita', 'brazo', 'maldad', 'sorteo']);
    p2.thematics = await this.getAllThematics(['Anonymous', 'Frutas']);
  
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
    p3.words = await this.getAllMatchWords(['calma', 'twitter', 'duda', 'vejez', 'almas', 'parecido', 'amantes', 'puentes', 'tiktok', 'ensaimada', 'sabio', 'caramelos'], ['oportunidad', 'voz', 'trastorno', 'euro', 'carcel', 'like', 'fiesta', 'bloqueo', 'sitio', 'veneno', 'top', 'mama', 'medios', 'tarde', 'velocidad', 'ley', 'asistencia', 'igual', 'crpnica', 'registro', 'leon', 'rival', 'despido', 'cara']);
    p3.thematics = await this.getAllThematics(['Isla', 'Super Poderes']);
  
    const v111 = new Vote();
    v111.judge = estrimo;
    v111.match = p3;
    v111.homePoints = 76.5;
    v111.awayPoints = 77.5;
  
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
    p4.words = await this.getAllMatchWords(['coste', 'sobrada', 'nieve', 'puesto', 'whatsapp', 'arte', 'patron', 'nostalgia', 'telegram', 'plaza', 'astronauta', 'bocadillo'], ['giro', 'mundo','sitio', 'cristiano', 'ocasion', 'gesto', 'collazo', 'presa', 'moral', 'litro', 'foso', 'anestesia', 'brillo', 'vacio', 'cerrojo', 'superior', 'labios', 'suerte', 'barrio', 'sapo', 'pecho', 'vida', 'postura']);
    p4.thematics = await this.getAllThematics(['Sentidos', 'Anime']);
  
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
    p5.words = await this.getAllMatchWords(['discord', 'estreno', 'sticker', 'credito', 'muela', 'reto', 'gota', 'voluntario', 'skype', 'tiempo', 'pasion', 'ruina'], ['espart', 'money', 'ultima', 'valor', 'lucha', 'derrota', 'pais', 'tapa', 'figura', 'spray', 'modo', 'gato', 'pendiente', 'analisis', 'gente', 'certeza', 'burbuja', 'palacio', 'burro', 'inutil', 'jamas', 'coro', 'pan', 'julio']);
    p5.thematics = await this.getAllThematics(['Leyendas Urbanas', 'Videojuegos']);
  
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
    // await fillCompetitionData("FMS Chile", "https://vignette.wikia.nocookie.net/rap/images/7/7f/FMSCHI.png/revision/latest/window-crop/width/200/x-offset/0/y-offset/0/window-width/513/window-height/512?cb=20190408031504&path-prefix=es", chileParticipants);
  }

  
  private async getAllThematics(thematics: string[]): Promise<Thematic[]> {
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

  private async getAllMatchWords(easy: string[], hard: string[]): Promise<Word[]> {
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

  // private async saveMatches(matches: number[][], round: Round, finished: boolean, participants: Participant[]) {
  //   for await(let matchParticipants of matches) {
  //     const [homeId, awayId] = matchParticipants;
  //     const match = new Match();
  //     match.home = { id: homeId } as unknown as Participant
  //     match.away = { id: awayId } as unknown as Participant
  //     match.round = round;
  //     if(finished) {
  //       const judges = participants.filter(e => e.type === ParticipantType.JUDGE);
  //       const { votes, winner, loser } = handleVotes(judges, match);
  //       const _words = shuffle(mockWords);
  //       const _thematics = shuffle(mockThematics);
  //       match.votes = votes;
  //       match.winner = winner;
  //       match.loser = loser;
  //       match.words = _words.slice(0, 50);
  //       match.thematics = _thematics.slice(0, 2);
  //       match.winType = Math.random() > 0.5 ? WinType.DIRECT : WinType.REPLICA;
  //     }
  //     await getRepository(Match).save(match);
  //   }
  // };

  // private handleVotes(judges: Participant[], match: Match): { votes: Vote[], winner: Participant, loser: Participant } {
  //   const votes = judges.map(judge => {
  //     const vote = new Vote();
  //     vote.judge = judge;
  //     const winnerPoints = faker.random.number({ min: 70, max: 105 });
  //     const loserPoints = faker.random.number({ min: 40, max: 69 });
  //     vote.homePoints = Math.random() > 0.5 ? winnerPoints : loserPoints;
  //     vote.awayPoints = vote.homePoints === winnerPoints ? loserPoints : winnerPoints;
  //     vote.winner = vote.homePoints > vote.awayPoints ? match.home : match.away;
  //     vote.loser = vote.homePoints < vote.awayPoints ? match.home : match.away;
  //     return vote;
  //   })
  //   const totalAwayPoints = votes.reduce((prev, current) => prev + current.awayPoints, 0);
  //   const totalHomePoints = votes.reduce((prev, current) => prev + current.homePoints, 0);
  //   const winner = totalAwayPoints >= totalHomePoints ? match.away : match.home;
  //   const loser = winner.id === match.away.id ? match.home : match.away;
  //   return { votes, loser, winner };
  // }
  public async down(queryRunner: QueryRunner): Promise<void> { }

}
