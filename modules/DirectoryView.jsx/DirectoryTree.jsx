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

const DirectoryTree = ({
	repoTree,
	expanded,
	selected,
	setRepoTree,
	setExpanded,
	setSelected,
}) => {
	const { activeFile, activeFiles } = useSelector((state) => state);
	const dispatch = useDispatch();
	const styles = useStyles();
	
	const [showDeleteDialog, setShowDeleteDialog] = useState({
		open: false,
		name: null,
		kind: null,
	});
	const [hoverId, setHoverId] = useState(null);

	const handleToggle = (event, nodeIds) => {
		setExpanded(nodeIds);
	};
	const handleSelect = (event, nodeIds) => {
		setSelected(nodeIds);
	};

	const openFileInEditor = (name) => {
		batch(() => {
			let activeFilesCopy = [...activeFiles];
			if (!activeFilesCopy.includes(name)) {
				activeFilesCopy.push(name);
			}
			dispatch(addActiveFile(name));
			dispatch(addActiveFiles(activeFilesCopy));
		});
	};

	const removeFile = (name) => {
		function removeNodeByName(node) {
			let treeCopy = { ...node };
			if (!treeCopy || !treeCopy.children) {
				return false;
			}
			const index = treeCopy?.children?.findIndex(
				(child) => child?.name === name
			);
			if (index > -1) {
				treeCopy?.children?.splice(index, 1);
				return true;
			}
			for (const child of treeCopy.children) {
				if (removeNodeByName(child, name)) {
					return true;
				}
			}
			return treeCopy
		}
		let repoTreeCopy = { ...repoTree };
		setRepoTree(removeNodeByName(repoTreeCopy));
		setShowDeleteDialog({ open: false, kind: null, name: null });
	};

	const removeDir = (name) => {
		function removeDirectory(tree) {
			let treeCopy = {...tree}
			if (treeCopy?.children) {
				treeCopy.children = treeCopy?.children.filter((node) => {
					if (node.kind === "directory" && node.name === name) {
						return false;
					} else {
						return removeDirectory(node);
					}
				});
			}
			return treeCopy;
		}
		let repoTreeCopy = {...repoTree};
		setRepoTree(removeDirectory(repoTreeCopy));
		setShowDeleteDialog({ open: false, kind: null, name: null })
	};


	const DirectoryTreeComponent = ({ tree }) => {
		return (
			<>
				{tree?.children &&
					tree?.children.map((item, index) => {
						if (item.kind === "file")
							return (
								<div
									key={`${item.name}_${index}`}
									className={`flex justify-between items-center cursor-pointer text-gray-400 hover:text-gray-200 pl-8 px-2 my-1 ${
										activeFile === item.name ? "bg-gray-800" : "bg-gray-900"
									}`}
									onMouseEnter={() => setHoverId(item.name)}
									onMouseLeave={() => setHoverId(null)}
									onClick={(e) => {
										e.preventDefault();
										openFileInEditor(item.name);
									}}
								>
									<div className="flex justify-start items-center gap-1">
										<FileIconByName name={item.name} />
										<p>{item.name}</p>
									</div>
									{hoverId === item.name && (
										<div
											onClick={() =>
												setShowDeleteDialog({
													open: true,
													kind: "file",
													name: item.name,
												})
											}
										>
											<CloseIcon />
										</div>
									)}
								</div>
							);
						else
							return (
								<TreeItem
									key={item.name}
									nodeId={item.name}
									onMouseEnter={() => setHoverId(item.name)}
									onMouseLeave={() => setHoverId(null)}
									label={
										<div className="flex justify-between items-center w-full">
											<div className="flex justify-start items-center gap-1">
												{expanded.includes(item.name) ? (
													<AiFillFolderOpen
														size={20}
														color={colors.blue[400]}
													/>
												) : (
													<AiFillFolder size={20} color={colors.blue[400]} />
												)}
												<p>{item.name}</p>
											</div>
											<div
												onClick={(e) => {
													e.stopPropagation();
													setShowDeleteDialog({
														open: true,
														kind: "directory",
														name: item.name,
													});
												}}
											>
												{hoverId == item.name && <CloseIcon />}
											</div>
										</div>
									}
									className={styles.folderItem}
								>
									<DirectoryTreeComponent tree={item} />
								</TreeItem>
							);
					})}
			</>
		);
	};
	return (
		<div>
			<TreeView
				aria-label="controlled"
				expanded={expanded}
				selected={selected}
				defaultCollapseIcon={<CloseFolderIcon />}
				defaultExpandIcon={<OutlineRightIcon />}
				onNodeToggle={handleToggle}
				onNodeSelect={handleSelect}
				className={styles.directoryTree}
			>
				<DirectoryTreeComponent tree={repoTree} />
			</TreeView>
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
		</div>
	);
};
export default DirectoryTree;

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
