import { Participant } from "../entities/Participant";
import { ParticipantType } from "../types";

let p1 = new Participant();
p1.name = 'Jaze'
p1.imageUrl = 'https://freetrivias.s3-us-west-2.amazonaws.com/freestylers/jaze.jpeg';
p1.type = ParticipantType.FREESTYLER;

let p2 = new Participant();
p2.name = 'Nekroos'
p2.imageUrl = 'https://freetrivias.s3-us-west-2.amazonaws.com/freestylers/nekroos.jpeg';
p2.type = ParticipantType.FREESTYLER;

let p3 = new Participant();
p3.name = 'Choque'
p3.imageUrl = 'https://freetrivias.s3-us-west-2.amazonaws.com/freestylers/choque.jpg';
p3.type = ParticipantType.FREESTYLER;

let p4 = new Participant();
p4.name = 'Stick'
p4.imageUrl = 'https://freetrivias.s3-us-west-2.amazonaws.com/freestylers/stick.jpg';
p4.type = ParticipantType.FREESTYLER;

let p5 = new Participant();
p5.name = 'Skill'
p5.imageUrl = 'https://freetrivias.s3-us-west-2.amazonaws.com/freestylers/skill.jpeg';
p5.type = ParticipantType.FREESTYLER;

let p6 = new Participant();
p6.name = 'New Era';
p6.imageUrl = 'https://freetrivias.s3-us-west-2.amazonaws.com/freestylers/new+era.jpg';
p6.type = ParticipantType.FREESTYLER;

let p7 = new Participant();
p7.name = 'Litzen';
p7.imageUrl = 'https://freetrivias.s3-us-west-2.amazonaws.com/freestylers/litzen.jpg';
p7.type = ParticipantType.FREESTYLER;

let p8 = new Participant();
p8.name = 'Jota';
p8.imageUrl = 'https://freetrivias.s3-us-west-2.amazonaws.com/freestylers/jota.jpg';
p8.type = ParticipantType.FREESTYLER;

let p9 = new Participant();
p9.name = 'Ramset';
p9.imageUrl = 'https://freetrivias.s3-us-west-2.amazonaws.com/freestylers/ramset.jpg';
p9.type = ParticipantType.FREESTYLER;

let p10 = new Participant();
p10.name = 'Strike';
p10.imageUrl = 'https://freetrivias.s3-us-west-2.amazonaws.com/freestylers/strike.jpg';
p10.type = ParticipantType.FREESTYLER;

let j1 = new Participant();
j1.name = 'HBD'
j1.imageUrl = 'https://freetrivias.s3-us-west-2.amazonaws.com/freestylers/HBD.jpg';
j1.type = ParticipantType.JUDGE;

let j2 = new Participant();
j2.name = 'Joro'
j2.imageUrl = 'https://freetrivias.s3-us-west-2.amazonaws.com/freestylers/placeholder.png';
j2.type = ParticipantType.JUDGE;

let j3 = new Participant();
j3.name = 'Vellutino'
j3.imageUrl = 'https://freetrivias.s3-us-west-2.amazonaws.com/freestylers/placeholder.png';
j3.type = ParticipantType.JUDGE;

let j4 = new Participant();
j4.name = 'Fox'
j4.imageUrl = 'https://freetrivias.s3-us-west-2.amazonaws.com/freestylers/placeholder.png';
j4.type = ParticipantType.JUDGE;

let j5 = new Participant();
j5.name = 'Gcr'
j5.imageUrl = 'https://freetrivias.s3-us-west-2.amazonaws.com/freestylers/placeholder.png';
j5.type = ParticipantType.JUDGE;


export default [p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, j1, j2, j3, j4, j5]
