/* Tabela Pais */
const SELECT_COUNTRIES = `SELECT * FROM pais;`
const SELECT_COUNTRY_BY_ID = `SELECT * FROM pais WHERE id = ($1);`
const SELECT_COUNTRY_BY_NAME = `SELECT * FROM pais WHERE descricao like $1;`

module.exports = {
	SELECT_COUNTRIES,
	SELECT_COUNTRY_BY_ID,
	SELECT_COUNTRY_BY_NAME
}