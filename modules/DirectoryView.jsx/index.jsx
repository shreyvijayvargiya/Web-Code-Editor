import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IconButton, Tooltip } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { TreeView, TreeItem } from "@mui/lab";
import {
	AiFillFolderAdd,
	AiFillFileAdd,
	AiFillFolder,
	AiFillFolderOpen,
} from "react-icons/ai";
import router from "next/router";
import {
	FileIconByName,
	CloseIcon,
	ExpandIcon,
	CollapseIcon,
	CloseFolderIcon,
	OutlineRightIcon,
} from "../UI/Icons";
import colors from "utils/config/colors";
import { addActiveFile, addActiveFiles } from "redux/slice";
import { batch } from "react-redux";
import DeleteDirFileDialog from "./DeleteDirFileDialog";

const DirectoryView = () => {
	const dispatch = useDispatch();
	const { activeFiles, initialRepoTree, activeFile } = useSelector(
		(state) => state
	);
	const [expanded, setExpanded] = useState([]);
	const [repoTree, setRepoTree] = useState(initialRepoTree);
	const [selected, setSelected] = useState([]);
	const [hoverId, setHoverId] = useState();
	const [showDeleteDialog, setShowDeleteDialog] = useState({
		open: false,
		name: null,
		kind: null,
	});

	const handleToggle = (event, nodeIds) => {
		setExpanded(nodeIds);
	};
	const handleSelect = (event, nodeIds) => {
		setSelected(nodeIds);
	};

	const handleExpandClick = () => {
		if (expanded.length === 0) {
			let directories = [];
			const getDirectorNames = (tree) => {
				tree.children.filter((node) => {
					if (node.kind === "directory") {
						directories.push(node.name);
						getDirectorNames(node);
					}
				});
			};
			getDirectorNames(repoTree);
			setExpanded(directories);
		} else {
			setExpanded([]);
		}
	};

	const generateRandomName = (extensionRequired) => {
		const randomString = Math.random().toString(36).substring(2, 8);
		const extension = Math.random() < 0.5 ? ".txt" : ".jsx";
		return `${extensionRequired ? randomString + extension : randomString}`;
	};

	const getParentNode = (currentNode, name) => {
		if (!currentNode.children) {
			return null;
		}
		for (const child of currentNode?.children) {
			if (child.name === name) {
				return currentNode;
			} else {
				const parentNode = getParentNode(child, name);
				if (parentNode) {
					return parentNode;
				}
			}
		}
		return null;
	};

	const findTargetDir = (nodes, newNode) => {
		let nodesCopy ={ ...nodes };
		nodesCopy.children.forEach((node) => {
			if (node.name === selected && node.kind === "directory") {
				if (!node.children) {
					node.children = [];
				}
				return node.children.push(newNode);
			} else if (node.name !== selected && node.kind === "directory") {
				findTargetDir(node, newNode);
			} else if (node.name === selected && node.kind === "file") {
				const parentNode = getParentNode(nodesCopy, selected);
				if (!parentNode.children) {
					parentNode.children = [];
				}
				return parentNode.children.push(newNode);
			}
		});
		return nodes;
	};

	const addFolder = () => {
		const newFolder = {
			name: generateRandomName(false),
			kind: "directory",
			children: [],
		};
		const finalTree = findTargetDir(repoTree, newFolder);
		setRepoTree(finalTree);
	};

	const addFile = () => {
		const newFile = {
			name: generateRandomName(true),
			kind: "file",
			modified: Date.now().toLocaleString(),
			size: "1KB",
		};
		const finalTree = findTargetDir(repoTree, newFile);
		setRepoTree(finalTree);
	};

	const removeFile = (name) => {
		function removeNodeByName(node) {
			if (!node || !node.children) {
				return false;
			}
			const index = node.children.findIndex((child) => child?.name === name);
			if (index > -1) {
				node.children.splice(index, 1);
				return true;
			}

			for (const child of node.children) {
				if (removeNodeByName(child, name)) {
					return true;
				}
			}

			return false;
		}
		removeNodeByName(repoTree);
	};

	const removeDir = (name) => {
		function removeDirectory(tree) {
			if (tree.children) {
				tree.children = tree?.children.filter((node) => {
					if (node.kind === "directory" && node.name === name) {
						return false;
					} else {
						return removeDirectory(node);
					}
				});
			}
			return tree;
		}
		removeDirectory(repoTree);
	};

	const styles = useStyles();

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

	const DirectoryTree = ({ tree }) => {
		return (
			<>
				{tree?.children &&
					tree?.children.map((item, index) => {
						if (item.kind === "file")
							return (
								<div
									key={`${item.name}_${index}`}
									className={`flex justify-between items-center cursor-pointer text-gray-400 hover:text-gray-200 pl-8 my-1 ${
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
									<DirectoryTree tree={item} />
								</TreeItem>
							);
					})}
			</>
		);
	};
	return (
		<div className="text-gray-200 w-full">
			<div className="flex justify-between items-center p-2 border-t border-b border-gray-800">
				<p>Ignite Assignment</p>
				<div className="flex justify-evenly items-center">
					<Tooltip title="Add file">
						<IconButton>
							<AiFillFileAdd
								size={18}
								color={colors.trueGray[400]}
								onClick={addFile}
							/>
						</IconButton>
					</Tooltip>
					<Tooltip title="Add folder">
						<IconButton>
							<AiFillFolderAdd
								size={18}
								color={colors.trueGray[400]}
								onClick={addFolder}
							/>
						</IconButton>
					</Tooltip>
					<Tooltip title={expanded.length === 0 ? "Expand" : "Collapse"}>
						<div onClick={handleExpandClick}>
							{expanded.length === 0 ? <ExpandIcon /> : <CollapseIcon />}
						</div>
					</Tooltip>
				</div>
			</div>
			<div className="p-4">
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
					<DirectoryTree tree={repoTree} />
				</TreeView>
			</div>
			<DeleteDirFileDialog
				removeDir={removeDir}
				removeFile={removeFile}
				showDeleteDialog={showDeleteDialog}
				setShowDeleteDialog={setShowDeleteDialog}
			/>
		</div>
	);
};
export default DirectoryView;

export const useStyles = makeStyles(() => ({
	folderItem: {
		"& .css-1kylpgj-MuiTreeItem-content.Mui-selected:hover": {
			backgroundColor: colors.gray[800],
		},
		"& .css-1kylpgj-MuiTreeItem-content.Mui-selected": {
			backgroundColor: colors.gray[800],
		},
	},
	directoryTree: {},
}));
