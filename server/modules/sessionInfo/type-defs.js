const schema = `
  scalar JSON
  
  type Query {
    # Получение информации о пользователе
    SessionInfo: SessionInfo
  }
  type SessionInfo {
    isElevated: Boolean!
    login: String!
    roles: [SessionRole]
  }
  type SessionRole {
    id: Int!
    name: String!
    rules: [String]
  }
  type Subscription {
    sessionInfoChanged: SessionInfo!
  }
  `;
export default { schema };
