import { Participant } from "./entities/Participant";
import { ParticipantType } from "./types";

export function getSpainParticipants(): Participant[] {
	let p1 = new Participant();
	p1.name = 'Bnet'
	p1.imageUrl = 'https://freetrivias.s3-us-west-2.amazonaws.com/freestylers/bnet.jpg';
	p1.type = ParticipantType.FREESTYLER;

	let p2 = new Participant();
	p2.name = 'Chuty'
	p2.imageUrl = 'https://freetrivias.s3-us-west-2.amazonaws.com/freestylers/441044_900422.jpg';
	p2.type = ParticipantType.FREESTYLER;

	let p3 = new Participant();
	p3.name = 'Gazir'
	p3.imageUrl = 'https://freetrivias.s3-us-west-2.amazonaws.com/freestylers/gazir.jpg';
	p3.type = ParticipantType.FREESTYLER;

	let p4 = new Participant();
	p4.name = 'Errece'
	p4.imageUrl = 'https://freetrivias.s3-us-west-2.amazonaws.com/freestylers/Errece.jpg';
	p4.type = ParticipantType.FREESTYLER;

	let p5 = new Participant();
	p5.name = 'Mr Ego'
	p5.imageUrl = 'https://i2.wp.com/blog.urbanroosters.com/wp-content/uploads/2019/11/1-31.jpg?resize=700%2C467&ssl=1';
	p5.type = ParticipantType.FREESTYLER;

	let p6 = new Participant();
	p6.name = 'Mnak';
	p6.imageUrl = 'https://freetrivias.s3-us-west-2.amazonaws.com/freestylers/mnak.jpeg';
	p6.type = ParticipantType.FREESTYLER;

	let p7 = new Participant();
	p7.name = 'Sweet Pain';
	p7.imageUrl = 'https://vignette.wikia.nocookie.net/rap/images/4/42/SweetPain.jpg/revision/latest?cb=20190407113037&path-prefix=es';
	p7.type = ParticipantType.FREESTYLER;

	let p8 = new Participant();
	p8.name = 'Blon';
	p8.imageUrl = 'https://pbs.twimg.com/profile_images/644157150122651648/Z7T9KaEc.jpg';
	p8.type = ParticipantType.FREESTYLER;

	let p9 = new Participant();
	p9.name = 'Zasko Master';
	p9.imageUrl = 'https://vignette.wikia.nocookie.net/rap/images/d/da/Zasko_Regional_Alicante.jpg/revision/latest?cb=20190720174630&path-prefix=es';
	p9.type = ParticipantType.FREESTYLER;

	let p10 = new Participant();
	p10.name = 'Skone';
	p10.imageUrl = 'https://freetrivias.s3-us-west-2.amazonaws.com/freestylers/skone.jpg';
	p10.type = ParticipantType.FREESTYLER;

	let j1 = new Participant();
	j1.name = 'Kapo'
	j1.imageUrl = 'https://freetrivias.s3-us-west-2.amazonaws.com/freestylers/kapo.jpeg';
	j1.type = ParticipantType.JUDGE;

	let j2 = new Participant();
	j2.name = 'Estrimo'
	j2.imageUrl = 'https://freetrivias.s3-us-west-2.amazonaws.com/freestylers/estrimo.jpg';
	j2.type = ParticipantType.JUDGE;

	return [p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, j1, j2]
}

export function getChileParticipants(): Participant[] {
	let p1 = new Participant();
	p1.name = 'Teorema';
	p1.imageUrl = 'https://freetrivias.s3-us-west-2.amazonaws.com/freestylers/teormea.jpg';
	p1.type = ParticipantType.FREESTYLER;

	let p2 = new Participant();
	p2.name = 'El Menor'
	p2.imageUrl = 'https://freetrivias.s3-us-west-2.amazonaws.com/freestylers/El-Menor.jpeg';
	p2.type = ParticipantType.FREESTYLER;

	let p3 = new Participant();
	p3.name = 'Ricto'
	p3.imageUrl = 'https://vignette.wikia.nocookie.net/rap/images/e/ec/Rictonew.png/revision/latest?cb=20190930014811&path-prefix=es';
	p3.type = ParticipantType.FREESTYLER;

	let p4 = new Participant();
	p4.name = 'Pepe Grillo'
	p4.imageUrl = 'https://freetrivias.s3-us-west-2.amazonaws.com/freestylers/Pepe-grillo-rap.jpg';
	p4.type = ParticipantType.FREESTYLER;

	let p5 = new Participant();
	p5.name = 'Esezeta'
	p5.imageUrl = 'https://freetrivias.s3-us-west-2.amazonaws.com/freestylers/Esezeta.jpg';
	p5.type = ParticipantType.FREESTYLER;

	let p6 = new Participant();
	p6.name = 'Tom Crowley'
	p6.imageUrl = 'https://freetrivias.s3-us-west-2.amazonaws.com/freestylers/tomcrowley.jpg';
	p6.type = ParticipantType.FREESTYLER;

	let p7 = new Participant();
	p7.name = 'Acertijo'
	p7.imageUrl = 'https://freetrivias.s3-us-west-2.amazonaws.com/freestylers/acertijo.jpg';
	p7.type = ParticipantType.FREESTYLER;

	let p8 = new Participant();
	p8.name = 'Nitro'
	p8.imageUrl = 'https://freetrivias.s3-us-west-2.amazonaws.com/freestylers/Nitro.jpg';
	p8.type = ParticipantType.FREESTYLER;

	let p9 = new Participant();
	p9.name = 'Jokker'
	p9.imageUrl = 'https://freetrivias.s3-us-west-2.amazonaws.com/freestylers/jokker.png';
	p9.type = ParticipantType.FREESTYLER;

	let p10 = new Participant();
	p10.name = 'Joqerr'
	p10.imageUrl = 'https://freetrivias.s3-us-west-2.amazonaws.com/freestylers/joqqer.jpg';
	p10.type = ParticipantType.FREESTYLER;

	return [p1, p2, p3, p4, p5, p6, p7, p8, p9, p10]
}

export function getMatches(numberOfParticipants: number, participants: number[]): number[][][] {
	let n = numberOfParticipants;
	let ps: any = [...participants];
	let rs: number[][][] = [[[]]];
	if (!ps) {
		ps = [];
		for (var k = 1; k <= n; k += 1) {
			ps.push(k);
		}
	} else {
		ps = ps.slice();
	}

	if (n % 2 === 1) {
		ps.push(-1);
		n += 1;
	}
	for (var j = 0; j < n - 1; j += 1) {
		rs[j] = [];
		for (var i = 0; i < n / 2; i += 1) {
			if (ps[i] !== -1 && ps[n - 1 - i] !== -1) {
				rs[j].push([ps[i], ps[n - 1 - i]]);
			}
		}
		ps.splice(1, 0, ps.pop());
	}
	return rs;
}