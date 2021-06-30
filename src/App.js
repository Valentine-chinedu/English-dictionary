import { Container, Switch, withStyles } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import Results from "./components/result/Results";
import Header from "./components/header/Header";

function App() {
	const [word, setWord] = useState("");
	const [meanings, setMeanings] = useState([]);
	const [darkTheme, setDarkTheme] = useState(false);

	const dictionaryApi = async () => {
		try {
			const data = await axios.get(
				`https://api.dictionaryapi.dev/api/v2/entries/en_US/${word}`
			);
			setMeanings(data.data);
		} catch (error) {
			console.log(error);
		}
	};

	console.log(meanings);

	useEffect(() => {
		dictionaryApi();
		// eslint-disable-next-line
	}, [word]);

	const PurpleSwitch = withStyles({
		switchBase: {
			color: grey[50],
			"&$checked": {
				color: grey[900],
			},
			"&$checked + $track": {
				backgroundColor: grey[500],
			},
		},
		checked: {},
		track: {},
	})(Switch);

	return (
		<div
			className='App'
			style={{
				height: "100vh",
				backgroundColor: darkTheme ? "#282c34" : "#fff",
				color: darkTheme ? "white" : "black",
				transition: "all 0.5s linear",
			}}
		>
			<Container
				maxWidth='md'
				style={{
					display: "flex",
					flexDirection: "column",
					height: "100vh",
					justifyContent: "space-evenly",
				}}
			>
				<div
					style={{ position: "absolute", top: 0, right: 15, paddingTop: 10 }}
				>
					<span>{darkTheme ? "Light" : "Dark"} Mode</span>
					<PurpleSwitch
						checked={darkTheme}
						onChange={() => setDarkTheme(!darkTheme)}
					/>
				</div>
				<Header
					setWord={setWord}
					word={word}
					setMeanings={setMeanings}
					darkTheme={darkTheme}
				/>
				{meanings && (
					<Results meanings={meanings} word={word} darkTheme={darkTheme} />
				)}
			</Container>
		</div>
	);
}

export default App;
