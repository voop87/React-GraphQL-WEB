import React from 'react';
import { useQuery } from '@apollo/client';

import NoteFeed from '../components/NoteFeed';
import Button from '../components/Button';

import { GET_NOTES } from '../gql/query';

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
	return (
		<React.Fragment>
			<NoteFeed notes={data.noteFeed.notes} />
			{data.noteFeed.hasNextPage && (
				<Button
					onClick={() => {
						fetchMore({
							variables: {
								cursor: data.noteFeed.cursor
							},
							updateQuery: (previousResult, { fetchMoreResult }) => {
								return {
									noteFeed: {
										cursor: fetchMoreResult.noteFeed.cursor,
										hasNextPage: fetchMoreResult.noteFeed.hasNextPage,
										// Совмещаем новые результаты со старыми
										notes: [
											...previousResult.noteFeed.notes,
											...fetchMoreResult.noteFeed.notes
										],
										__typename: 'noteFeed'
									}
								};
							}
						})
					}}
				>Load more</Button>
			)}
		</React.Fragment>
		

	);
};

export default Home;