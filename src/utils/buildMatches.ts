export default function buildMatches(numberOfParticipants: number, participants: number[]): number[][][] {
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