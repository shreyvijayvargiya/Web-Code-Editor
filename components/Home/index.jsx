import React, { useState } from "react";
import { IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { CloseIcon, FileIconByName } from "modules/UI/Icons";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addActiveFile, addActiveFiles } from "redux/slice";
import DirectoryViewSidebar from "modules/DirectoryViewSidebar";
import colors from "utils/config/colors";
import { batch } from "react-redux";

const Home = () => {
	const dispatch = useDispatch();
	const [showSidebar, setShowSidebar] = useState(true);
	const { activeFiles, activeFile } = useSelector((state) => state);

	const closeActiveFile = (fileName) => {
		batch(() => {
			let finalActiveFiles = [...activeFiles].filter((item) =>
				item !== fileName ? true : false
			);
			dispatch(addActiveFile(finalActiveFiles.length === 0 ? "" : fileName));
			dispatch(addActiveFiles(finalActiveFiles));
		});
	};

	const styles = useStyles({ showSidebar });

	return (
		<div className="bg-gray-900 w-full">
			<DirectoryViewSidebar
				showSidebar={showSidebar}
				setShowSidebar={setShowSidebar}
			/>
			<div className={styles.bodyContainer}>
				<div className={styles.fileNavigationBar}>
					<div className="flex justify-start items-center gap-4 w-full border-b border-gray-800">
						{activeFiles.map((item) => (
							<div
								className={`flex justify-start items-center gap-2 text-gray-400 hover:text-gray-100 max-w-xl overflow-x-scroll p-2 cursor-pointer ${
									activeFile === item ? "bg-gray-800" : "bg-transparent"
								}`}
								key={item}
								onClick={(e) => {
									e.preventDefault();
									dispatch(addActiveFile(item));
								}}
							>
								<FileIconByName name={item} />
								<p>{item}</p>
								<IconButton
									onClick={(e) => {
										e.stopPropagation();
										closeActiveFile(item);
									}}
								>
									<CloseIcon />
								</IconButton>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};
export default Home;

export const useStyles = makeStyles((theme) => ({
	bodyContainer: {
		width: "100%",
		position: "fixed",
		top: "3px",
		bottom: "0px",
		transform: (props) =>
			!props.showSidebar ? "translateX(0)" : "translateX(20%)",
		overflowX: "hidden",
		backgroundColor: colors.gray[900],
		zIndex: 0,
		[theme.breakpoints.between("xs", "md")]: {
			width: "100%",
		},
	},
	fileNavigationBar: {
		position: "fixed",
		top: "0px",
		right: "0px",
		left: (props) => (!props.showSidebar ? "40px" : "0px"),
		overflowX: "scroll",
	},
}));
