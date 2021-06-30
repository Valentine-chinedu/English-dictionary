import { createMuiTheme, TextField, ThemeProvider } from "@material-ui/core";
import React, { useCallback } from "react";
import "./Header.css";
import { debounce } from "lodash";

const Header = ({ setWord, darkTheme }) => {
	const lightTheme = createMuiTheme({
		palette: {
			primary: {
				main: darkTheme ? "#fff" : "#000",
			},
			type: darkTheme ? "dark" : "light",
		},
	});

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const deb = useCallback(
		debounce((text) => setWord(text), 1000),
		[]
	);

	const handleText = (text) => {
		deb(text);
	};

	return (
		<div className='header'>
			<span className='title'>English Dictionary</span>
			<div className='inputs'>
				<ThemeProvider theme={lightTheme}>
					<TextField
						className='search'
						id='filled-basic'
						// value={word}
						label='Search a Word'
						variant='filled'
						onChange={(e) => handleText(e.target.value)}
					/>
				</ThemeProvider>
			</div>
		</div>
	);
};

export default Header;
