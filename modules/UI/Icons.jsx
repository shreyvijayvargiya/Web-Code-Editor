import React from "react";
import { IconButton } from "@mui/material";
import { SiJavascript } from "react-icons/si";
import { DiCss3, DiReact } from "react-icons/di";
import {
	VscJson,
	VscMarkdown,
	VscCollapseAll,
	VscExpandAll,
} from "react-icons/vsc";
import { BsCodeSlash } from "react-icons/bs";
import { AiFillHtml5, AiOutlineDown, AiOutlineRight } from "react-icons/ai";
import { SiGitignoredotio, SiGoland } from "react-icons/si";
import { IoLogoNodejs } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import { DiPython } from "react-icons/di";
import colors from "utils/config/colors";

export const FileIconByName = ({ name }) => {
	const ext = name?.split(".");
	if (ext[ext.length - 1] === "js")
		return <SiJavascript size={14} color={colors.yellow[400]} />;
	else if (ext[ext.length - 1] === "jsx")
		return <DiReact size={14} color={colors.blue[400]} />;
	else if (ext[ext.length - 1] === "html")
		return <AiFillHtml5 size={14} color={colors.red[400]} />;
	else if (ext[ext.length - 1] === "css")
		return <DiCss3 size={14} color={colors.pink[400]} />;
	else if (ext[ext.length - 1] === "json" && name !== "package.json")
		return <VscJson size={14} color={colors.green[400]} />;
	else if (ext[ext.length - 1] === "md")
		return <VscMarkdown size={14} color={colors.gray[400]} />;
	else if (name === "package.json")
		return <IoLogoNodejs size={14} color={colors.green[400]} />;
	else if (ext[ext.length - 1] === "gitignore")
		return <SiGitignoredotio size={14} color={colors.pink[400]} />;
	else if (ext[ext.length - 1] === "py")
		return <DiPython size={14} color={colors.orange[400]} />;
	else if (ext[ext.length - 1] === "go")
		return <SiGoland size={14} color={colors.teal
			[400]} />;
	else return <BsCodeSlash size={14} color="gray" />;
};

export const CloseIcon = () => (
	<IoCloseOutline size={16} color={colors.gray[500]} />
);

export const ExpandIcon = () => (
	<IconButton>
		<VscExpandAll size={18} color={colors.trueGray[400]} />
	</IconButton>
);
export const CollapseIcon = () => (
	<IconButton>
		<VscCollapseAll size={18} color={colors.trueGray[400]} />
	</IconButton>
);

export const CloseFolderIcon = () => (
	<AiOutlineDown size={18} color={colors.trueGray[400]} />
);

export const OutlineRightIcon = () => (
	<AiOutlineRight size={18} color={colors.trueGray[400]} />
)