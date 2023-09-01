import { atom } from "recoil";

export interface IToDo {
	id: number;
	text: string;
}

export interface IToDosState {
	[key: string]: IToDo[];
}

export const toDosState = atom<IToDosState>({
	key: "toDosState",
	default: {
		"To Do": [
			{ id: 1, text: "(*/ω＼*)" },
			{ id: 2, text: "╰(*°▽°*)╯" },
		],
		Doing: [
			{ id: 3, text: "o(*￣▽￣*)ブ" },
			{ id: 4, text: "(/≧▽≦)/" },
		],
		Done: [
			{ id: 5, text: "o((>ω< ))o" },
			{ id: 6, text: "(o^▽^o)" },
			{ id: 7, text: "ヽ(>∀<☆)ノ" },
		],
	},
});
