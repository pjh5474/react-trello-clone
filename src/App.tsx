import { createGlobalStyle } from "styled-components";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { toDosState, IToDosState } from "./atoms";
import { useState } from "react";
import Board from "./Components/Board";

const GlobalStyle = createGlobalStyle`

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}

* {
	box-sizing: border-box;
}
body {
	font-family: 'Source Sans Pro', sans-serif;
	background-color: ${(props) => props.theme.bgColor};
	color: "black";
	line-height: 1.2;
}
a {
	text-decoration: none;
  color: inherit;
}
`;

const Wrapper = styled.div`
	display: flex;
	max-width: 680px;
	width: 100%;
	margin: 0 auto;
	justify-content: center;
	align-items: center;
	height: 100vh;
`;

const Boards = styled.div`
	display: grid;
	width: 100%;
	gap: 10px;
	grid-template-columns: repeat(3, 1fr);
`;

function App() {
	const [toDos, setToDos] = useRecoilState(toDosState);
	const [isRendering, setIsRendering] = useState(false);

	const onDragEnd = (info: DropResult) => {
		if (isRendering) return;

		const { destination, draggableId, source } = info;
		if (!destination) return;
		if (destination.droppableId === source.droppableId) {
			// same board movement
			setToDos((allBoards) => {
				const boardCopy = [
					...allBoards[source.droppableId as keyof IToDosState],
				];
				boardCopy.splice(source.index, 1);
				boardCopy.splice(destination.index, 0, draggableId);
				return {
					...allBoards,
					[source.droppableId]: boardCopy,
				};
			});
		}

		if (destination.droppableId !== source.droppableId) {
			// different board movement
			setToDos((allBoards) => {
				const startBoard = [
					...allBoards[source.droppableId as keyof IToDosState],
				];
				const finishBoard = [
					...allBoards[destination.droppableId as keyof IToDosState],
				];
				startBoard.splice(source.index, 1);
				finishBoard.splice(destination.index, 0, draggableId);
				return {
					...allBoards,
					[source.droppableId]: startBoard,
					[destination.droppableId]: finishBoard,
				};
			});
		}
		// 드래그 앤 드랍 이후 새 이벤트 발생을 일정시간 막아서 중복 렌더링을 막는다
		setIsRendering(true);
		setTimeout(() => {
			setIsRendering(false);
		}, 800);
	};
	return (
		<>
			<HelmetProvider>
				<Helmet>
					<link
						href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap"
						rel="stylesheet"
					/>
				</Helmet>
			</HelmetProvider>
			<GlobalStyle />
			<DragDropContext onDragEnd={onDragEnd}>
				<Wrapper>
					<Boards>
						{Object.keys(toDos).map((boardId) => (
							<Board
								key={boardId}
								boardId={boardId}
								toDos={toDos[boardId as "To Do" | "Doing" | "Done"]}
							/>
						))}
					</Boards>
				</Wrapper>
			</DragDropContext>
		</>
	);
}

export default App;
