export const knexConfig = {
  client: 'sqlite3',
  connection: {
    filename: `${process.cwd()}/src/db/db.sqlite`
  },
  useNullAsDefault: true,
  
  // Parsear automaticamente los datos RAW que llegan de la base de datos a su equivalente en ES6
  postProcessResponse: (result, _queryContext) => {
    if(Array.isArray(result)) {
      return result.map(row => {
        return JSON.parse(JSON.stringify(row));
      })
    } 
    return JSON.parse(JSON.stringify(result));
  }
}
