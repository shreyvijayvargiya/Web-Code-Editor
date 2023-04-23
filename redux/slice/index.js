import { createSlice } from "@reduxjs/toolkit";
import { treeData } from "utils/config/tree";

const initialState = {
	activeFiles: [],
	activeFile: null,
  initialRepoTree: treeData
};

const repoSlice = createSlice({
	initialState,
	name: "repoTree",
	reducers: {
		addActiveFiles: (state, action) => {
			return {
				...state,
				activeFiles: action.payload
			};
		},
		addActiveFile: (state, action) => {
			return {
				...state,
				activeFile: action.payload
			}
		}
	},
});

export const { addActiveFiles, addActiveFile } = repoSlice.actions;
export const reducer = repoSlice.reducer;
