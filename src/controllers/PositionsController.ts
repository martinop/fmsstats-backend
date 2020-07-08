import { getRepository } from "typeorm";
import { Position } from "../entities/Position";

class PositionsController {
  static get = async function(source: any, args: {[competition: string]: number}) {
		const { competition } = args;
		try {
			const data = await getRepository(Position)
				.find({
					relations: ['competition', 'participant'],
					...competition && { where: { competition }}
				});
			return { data }
		} catch(e) {
			throw new Error(e);
		}
  };
}
export default PositionsController;
