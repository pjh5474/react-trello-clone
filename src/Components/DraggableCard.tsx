import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { styled } from "styled-components";

const Card = styled.div<{ $isDragging: boolean }>`
	border-radius: 5px;
	margin-bottom: 5px;
	padding: 10px;
	background-color: ${(props) =>
		props.$isDragging ? "#74b9ff" : props.theme.cardColor};
	transition: background-color 0.3s ease-in-out;

	box-shadow: ${(props) =>
		props.$isDragging ? "0px 2px 5px rgba(0, 0, 0, 0.05)" : "none"};
`;

interface IDraggableCardProps {
	toDoId: number;
	toDoText: string;
	index: number;
}

function DraggableCard({ toDoId, toDoText, index }: IDraggableCardProps) {
	return (
		<Draggable
			key={toDoId}
			draggableId={toDoId + ""}
			index={index}
		>
			{(draggableMagic, snapshot) => (
				<Card
					$isDragging={snapshot.isDragging}
					ref={draggableMagic.innerRef}
					{...draggableMagic.draggableProps}
					{...draggableMagic.dragHandleProps}
				>
					{toDoText}
				</Card>
			)}
		</Draggable>
	);
}

export default React.memo(DraggableCard);
