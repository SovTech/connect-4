import * as React from 'react';
import styled from 'styled-components';
import { Avatar, ContainerWrapper, H2, Header } from '../../components';
import { ALL_USERS, AllUsersQuery } from '../../graphql/queries';
import theme from '../../theme';
import { immutableSort } from '../../utils';

const UserRow = styled.div`
  color: white;
  font-size: ${theme.h3Size};
  flex-direction: row;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 300px;
  max-width: 100%;
  
  span {
      display: flex;
      flex: 1;
  }
`;

export default class Leaderboard extends React.Component {
  renderUserRow(index: number, user: User, length: number) {
    const gamesPlayedCount = user._redPlayerGamesMeta.count
      + user._yellowPlayerGamesMeta.count;

    const userString = user._gamesCreatedMeta.count
      + ` / ${gamesPlayedCount}`
      + `${index === 0 ? '🏆' : ''}${index === length - 1 ? '🥔👑' : ''}`;
    return (
      <UserRow key={user.email} title={index + 1 + `. ` + user.firstName.toUpperCase()}>
        <Avatar imageUrl={user.avatarUrl} size={40} />
        <span>{userString}</span>
      </UserRow>
    );
  }

  render() {
    return (
      <ContainerWrapper>
        <Header />
        <AllUsersQuery query={ALL_USERS}>
          {({loading, error, data}) => {
            if (loading) {
              return <H2>Loading...</H2>;
            }
            if (error) {
              return <H2>Error 😭</H2>;
            }
            if (!data) {
              return <H2>There are no users to display 😭</H2>;
            }
            const sortedUsers = immutableSort(data.allUsers, (a: any, b: any) => {
                return b._gamesCreatedMeta.count - a._gamesCreatedMeta.count;
              }
            );
            return sortedUsers.map((user: User, index: number) =>
              this.renderUserRow(index, user, data.allUsers.length));
          }}
        </AllUsersQuery>
        Legend: (Games Started/ Games Played)
      </ContainerWrapper>
    );
  }
}
