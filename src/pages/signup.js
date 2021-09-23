import React, { useEffect } from "react";
import { useMutation, useApolloClient } from "@apollo/client";

import UserForm from "../components/UserForm";
import { SIGNUP_USER } from "../gql/mutation";

// Добавляем props, передаваемый в компонент для дальнейшего использования
const SignUp = props => {

	useEffect(() => {
		// Обновляем заголовок документа
		document.title = 'Sign Up - Notedly';
	});

	// Apollo Client
	const client = useApolloClient();

	// Добавляем хук мутации
	const [signUp, { loading, error }] = useMutation(SIGNUP_USER, {
		onCompleted: data => {
			// Сохраняем JWT в LocalStorage
			localStorage.setItem('token', data.signUp);
			// Обновляем локальный кэш
			client.writeData({ data: { isLoggedIn: true } });
			// Перенаправляем пользователя на домашнюю страницу
			props.history.push('/');
		}
	})

	// Отрисовываем форму
	return (
		<React.Fragment>
			<UserForm action={signUp} formType="signup" />

			{loading && <p>Loading...</p>}
			{error && <p>Error creating an account!</p>}
		</React.Fragment>
	);
};

export default SignUp;