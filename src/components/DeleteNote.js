import React from "react";
import { useMutation } from "@apollo/client";
import { withRouter } from "react-router";

import ButtonAsLink from './ButtonAsLink';
import { DELETE_NOTE } from "../gql/mutation";
import { GET_MY_NOTES, GET_NOTES } from "../gql/query";

const DeleteNote = props => {
	const [deleteNote] = useMutation(DELETE_NOTE, {
		variables: {
			id: props.noteId
		},
		// Повторно получаем запросы списка заметок, чтобы обновить кэш
		// НЕ РАБОТАЕТ БЕЗ ОБНОВЛЕНИЯ СТРАНИЦЫ, НАЙТИ ПРИЧИНУ!
		refetchQueries: [{ query: GET_MY_NOTES, GET_NOTES }],
		onCompleted: data => {
			// Перенаправляем пользователя на страницу "my notes"
			props.history.push('/mynotes');
		}
	});

	return (
		<ButtonAsLink onClick={deleteNote}>Delete Note</ButtonAsLink>
	);
};

export default withRouter(DeleteNote);