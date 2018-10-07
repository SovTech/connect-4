import GraphQLMock from 'graphql-mock';

const typeDefs = `
type File @model {
  contentType: String!
  createdAt: String!
  id: ID! @isUnique
  name: String!
  secret: String! @isUnique
  size: Int!
  updatedAt: String!
  url: String! @isUnique
}

type Game @model {
  id: ID! @isUnique
  updatedAt: String!
  createdAt: String!
  placesRemaining: Int! @defaultValue(value: 3)
  createdBy: User! @relation(name: "GameCreator")
  yellowPlayer: User @relation(name: "YellowUser")
  redPlayer: User @relation(name: "RedUser")
  status: GameStatus! @defaultValue(value: NOT_STARTED)
  winner: SideColor @defaultValue(value: RED)
}

enum GameStatus {
  NOT_STARTED
  IN_PROGRESS
  FINISHED
  CANCELLED
}

enum RoomStatus {
  FREE
  BUSY
}

type RoomStatusEntry @model {
  id: ID! @isUnique
  updatedAt: String!
  createdAt: String!
  status: RoomStatus!
  createdBy: User! @relation(name: "RoomStatusLogger")
}

enum SideColor {
  RED
  YELLOW
}

type User @model {
  id: ID! @isUnique
  updatedAt: String!
  createdAt: String!
  firstName: String!
  lastName: String!
  email: String! @isUnique
  slackUserId: String @isUnique
  avatarUrl: String
  gamesCreated: [Game!]! @relation(name: "GameCreator")
  yellowPlayerGames: [Game!]! @relation(name: "YellowUser")
  redPlayerGames: [Game!]! @relation(name: "RedUser")
  roomStatusEntries: [RoomStatusEntry!]! @relation(name: "RoomStatusLogger")
}

type AllUsersQuery {
    allUsers: [User]
}

type AllRoomStatusEntriesQuery {
    allRoomStatusEntries: [RoomStatusEntry]
}

type AllGamesQuery {
    allGames: [Game]
}
`;

export const mock = new GraphQLMock(typeDefs);
