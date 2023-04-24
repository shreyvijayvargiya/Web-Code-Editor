import React, { useState } from "react";
import { IconButton, Tooltip } from "@mui/material";
import { AiFillFolderAdd, AiFillFileAdd } from "react-icons/ai";
import router from "next/router";
import { ExpandIcon, CollapseIcon } from "../UI/Icons";
import colors from "utils/config/colors";
import { useSelector } from "react-redux";
import DirectoryTree from "./DirectoryTree";

const DirectoryView = () => {
	const { initialRepoTree } = useSelector((state) => state);

	const [repoTree, setRepoTree] = useState(initialRepoTree);
	const [expanded, setExpanded] = useState([]);
	const [selected, setSelected] = useState([]);

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
		nodes.children.forEach((node) => {
			if (node.name === selected && node.kind === "directory") {
				if (!node.children) {
					node.children = [];
				}
				const newChildren = [...node.children,  newNode];
				return Object.defineProperty(node, "children", { value: newChildren });
			} else if (node.name !== selected && node.kind === "directory") {
				findTargetDir(node, newNode);
			} else if (node.name === selected && node.kind === "file") {
				const parentNode = getParentNode(nodes, selected);
				if (!parentNode.children) {
					parentNode.children = [];
				}
				const newChildren = [...parentNode.children, newNode];
				return Object.defineProperty(parentNode, "children", { value: newChildren })
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
		let tree = repoTree;
		const finalTree = findTargetDir(tree, newFolder);
		setRepoTree(finalTree);
	};

	const addFile = () => {
		const newFile = {
			name: generateRandomName(true),
			kind: "file",
			modified: Date.now().toLocaleString(),
			size: "1KB",
		};
		let tree = repoTree;
		const finalTree = findTargetDir(tree, newFile);
		setRepoTree(finalTree);
	};

	return (
		<div className="text-gray-200 w-full">
			<div className="flex justify-between items-center p-2 border-t border-b border-gray-800">
				<p>Web Code IDE</p>
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
			<DirectoryTree
				repoTree={repoTree}
				expanded={expanded}
				selected={selected}
				setRepoTree={setRepoTree}
				setExpanded={setExpanded}
				setSelected={setSelected}
			/>
		</div>
	);
};
export default DirectoryView;
