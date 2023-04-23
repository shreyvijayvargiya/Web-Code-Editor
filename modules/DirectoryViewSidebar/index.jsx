import React, { useState } from "react";
import DirectoryView from "modules/DirectoryView.jsx";
import { AiOutlineRight } from "react-icons/ai";
import { Tooltip, Drawer } from "@mui/material";
import colors from "utils/config/colors";
import { makeStyles } from "@mui/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const DirectoryViewSidebar = ({ showSidebar, setShowSidebar }) => {
	const styles = useStyles({ showSidebar });
	const isDeviceDektop = useMediaQuery("(min-width:600px)"); 

	return (
		<div className={styles.sidebar}>
			{isDeviceDektop ? (
				<div className="bg-gray-900 border-r border-gray-800 h-full">
					<div className={styles.directoryViewContainer}>
						<DirectoryView />
					</div>
				</div>
			) : (
				<Drawer open={showSidebar} onClose={() => setShowSidebar(!showSidebar)} anchor="left">
					<div className="bg-gray-900 border-r border-gray-800 h-full">
						<div className={styles.directoryViewContainer}>
							<DirectoryView />
						</div>
					</div>
				</Drawer>
			)}
			<Tooltip title="Toggle sidebar">
				<div
					className="bg-gray-200 hover:bg-gray-50 rounded-md absolute bottom-10 left-10 z-20 m-4 p-1 w-6 cursor-pointer"
					onClick={() => setShowSidebar(!showSidebar)}
				>
					<AiOutlineRight color={colors.black} size={18} />
				</div>
			</Tooltip>
		</div>
	);
};
export default DirectoryViewSidebar;

export const useStyles = makeStyles((theme) => ({
	sidebar: {
		width: (props) => (props.showSidebar ? "20%" : "40px"),
		position: "fixed",
		top: 0,
		left: 0,
		bottom: 0,
		transition: "width 1s",
		zIndex: 10
	},
	directoryViewContainer: {
		opacity: (props) => (props.showSidebar ? 1 : 0),
		transition: "opacity .5s",
	},
}));
