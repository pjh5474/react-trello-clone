import { createGlobalStyle } from "styled-components";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { toDosState } from "./atoms";
import DraggableCard from "./Components/DraggableCard";
import { useState } from "react";

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
	max-width: 480px;
	width: 100%;
	margin: 0 auto;
	justify-content: center;
	align-items: center;
	height: 100vh;
`;

const Boards = styled.div`
	display: grid;
	width: 100%;
	grid-template-columns: repeat(1, 1fr);
`;

const Board = styled.div`
	padding: 20px 10px;
	padding-top: 30px;
	background-color: ${(props) => props.theme.boardColor};
	border-radius: 5px;
	min-height: 200px;
`;

function App() {
	const [toDos, setToDos] = useRecoilState(toDosState);
	const [isRendering, setIsRendering] = useState(false);

	const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
		if (isRendering) return;

		if (!destination) return;
		setToDos((oldToDos) => {
			const copyToDos = [...oldToDos];
			copyToDos.splice(source.index, 1);
			copyToDos.splice(destination.index, 0, draggableId);
			return copyToDos;
		});
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
						<Droppable droppableId="one">
							{(droppableMagic) => (
								<Board
									ref={droppableMagic.innerRef}
									{...droppableMagic.droppableProps}
								>
									{toDos.map((toDo, index) => (
										<DraggableCard
											key={toDo}
											toDo={toDo}
											index={index}
										/>
									))}
									{droppableMagic.placeholder}
								</Board>
							)}
						</Droppable>
					</Boards>
				</Wrapper>
			</DragDropContext>
		</>
	);
}

export default App;
