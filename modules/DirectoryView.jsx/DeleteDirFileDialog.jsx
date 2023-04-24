import React, { useState } from "react";
import { TreeView, TreeItem } from "@mui/lab";
import { Button, Dialog, DialogActions } from "@mui/material";
import { makeStyles } from "@mui/styles";
import {
	CloseFolderIcon,
	OutlineRightIcon,
	CloseIcon,
	FileIconByName,
} from "modules/UI/Icons";
import { AiFillFolderOpen, AiFillFolder } from "react-icons/ai";
import { addActiveFile, addActiveFiles } from "redux/slice";
import { useSelector } from "react-redux";
import { useDispatch, batch } from "react-redux";
import colors from "utils/config/colors";
import _ from "lodash";

const DeleteDirFileDialog = ({ removeDir, removeFile, showDeleteDialog, setShowDeleteDialog }) => {
	const { activeFiles } = useSelector((state) => state);
	const dispatch = useDispatch();
	const styles = useStyles();

	

	return (
		<Dialog
			onClose={() =>
				setShowDeleteDialog({ open: false, kind: null, name: null })
			}
			open={showDeleteDialog.open}
			className={styles.dialogRoot}
		>
			<div>
				<p className="text-xl">Delete {showDeleteDialog.name}</p>
				<p className="text-sm">
					Are you sure you want to delete {showDeleteDialog.name}{" "}
					{showDeleteDialog.kind}
				</p>
			</div>
			<DialogActions>
				<Button
					color="error"
					variant="contained"
					size="sm"
					onClick={() =>
						setShowDeleteDialog({ open: false, kind: null, name: null })
					}
				>
					No
				</Button>
				<Button
					color="success"
					variant="contained"
					size="sm"
					onClick={() => {
						if (showDeleteDialog.kind === "directory") {
							removeDir(showDeleteDialog.name);
						} else {
							removeFile(showDeleteDialog.name);
						}
					}}
				>
					Yes
				</Button>
			</DialogActions>
		</Dialog>
	);
};
export default DeleteDirFileDialog;

export const useStyles = makeStyles(() => ({
	folderItem: {
		"& .css-1kylpgj-MuiTreeItem-content.Mui-selected:hover": {
			backgroundColor: colors.gray[800],
		},
		"& .css-1kylpgj-MuiTreeItem-content.Mui-selected": {
			backgroundColor: colors.gray[800],
		},
	},
	directoryTree: {
		padding: "1rem",
	},
	dialogRoot: {
		"& 	.MuiDialog-root": {
			backgroundColor: "transparent",
		},
		"& .MuiDialog-paper": {
			backgroundColor: colors.gray[900],
			color: colors.gray[400],
			padding: "1rem",
		},
	},
}));
