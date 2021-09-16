import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useQuery, gql } from '@apollo/client';

import NoteFeed from '../components/NoteFeed';

const GET_NOTES = gql`
	query noteFeed($cursor: String) {
		noteFeed(cursor: $cursor) {
			cursor
			hasNextPage
			notes {
				id
				createdAt
				content
				favoriteCount
				author {
					username
					id
					avatar
				}
			}
		}
	}
`;

const Home = () => {
	// Хук запроса
	const { data, loading, error, fetchMore } = useQuery(GET_NOTES);

	if (loading) {
		return <p>Loading...</p>;
	}
	if (error) {
		return <p>Error!!</p>;
	}
	// Если загрузка данных произошла успешно, отображаем их в UI
	return <NoteFeed notes={data.noteFeed.notes} />;
};

export default Home;