export function addUser(nome) {
  return {
    type: 'ADD_USER',
    user:{name: nome}
  };
}

export function setQuery(query) {
  return {
    type: 'SET_QUERY',
    query: query
  };
}