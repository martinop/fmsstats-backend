import { Participant } from "../entities/Participant";
import { ParticipantType } from "../types";

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

export default [p1, p2, p3, p4, p5, p6, p7, p8, p9, p10]