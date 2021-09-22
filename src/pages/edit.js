import React from "react";
import { useQuery, useMutation, gql } from "@apollo/client";

import NoteForm from "../components/NoteForm";
import { GET_NOTE, GET_ME } from "../gql/query";
import { EDIT_NOTE } from "../gql/mutation";

const EditNote = props => {
	// Сохраняем id из url в виде переменной
	const id = props.match.params.id;
	// Запрашиваем хук, передавая значение id в качестве переменной
	const { loading, error, data } = useQuery(GET_NOTE, { variables: { id } });

	// Получаем информацию о текущем пользователе
	const { data: userdata } = useQuery(GET_ME);

	// Определяем мутацию
	const [editNote] = useMutation(EDIT_NOTE, {
		variables: {
			id
		},
		onCompleted: () => {
			props.history.push(`/note/${id}`);
		}
	});

	if (loading) {
		return <p>Loading...</p>;
	}
	if (error) {
		return <p>Error! Note not found!</p>;
	}

	// Если текущий пользователь не соответствует автору заметки,
	// возвращаем соответствующее сообщение
	if (userdata.me.id !== data.note.author.id) {
		return <p>You do not have access to edit this note</p>;
	}

	return (
		<NoteForm content={data.note.content} action={editNote} />
	);
};

export default EditNote;