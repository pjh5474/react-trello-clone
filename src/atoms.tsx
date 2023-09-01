import { atom } from "recoil";

export interface IToDosState {
	// [key: string]: string[];
	"To Do": string[];
	Doing: string[];
	Done: string[];
}

export const toDosState = atom<IToDosState>({
	key: "toDosState",
	default: {
		"To Do": ["(*/ω＼*)", "╰(*°▽°*)╯"],
		Doing: ["o(*￣▽￣*)ブ", "(/≧▽≦)/"],
		Done: ["o((>ω< ))o", "(o^▽^o)", "ヽ(>∀<☆)ノ"],
	},
});
