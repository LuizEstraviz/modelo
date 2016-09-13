

export function selectTab(e) {
	return {
		type: 'SEL_TAB',
		activeTab: e
	}
}

export function setQuery(query) {
  return {
    type: 'SET_QUERY',
    query: query
  };
}


export function requestData() {
  return {
    type: 'REQ_DATA'
  };
}

function receiveData(data) {
  return {
    type: 'REC_DATA',
    data: data
  };
}

export function asCsvChanged(e) {
	return {
		type: 'AS_CSV',
		ascsv: e
	};
}

function inTransition() {
  return {
    type: 'IN_TRANS',
  };
}

export function fetchQuery() {
	return function(dispatch, getState) {
		var state = getState();
		dispatch(requestData());
		return axios.get(servUrl + 'query.php', {
			params: {query: state.query}
		}).then((response) => {
			dispatch(receiveData(response.data));
			setTimeout(() => dispatch(inTransition()), 500);
		}).catch(e => {
			console.warn('Erro na resposta do servidor');
			console.warn(e);
		});
	}
}

export function fetchAsCSV(query) {
	return function(dispatch, getState) {
		var state = getState();
		dispatch(requestData());
		return axios.get(servUrl + 'query.php', {
			params: {query: state.query}
		}).then((response) => {
			dispatch(receiveData(response.data));
			setTimeout(() => dispatch(inTransition()), 500);
		}).catch(e => {
			console.warn('Erro na resposta do servidor');
			console.warn(e);
		});
	}
}

export function transitionEnd() {
	return {
		type: 'TRANS_END',
	}
}

export function selectScript(e) {
	return {
		type: 'SEL_SCRIPT',
		selScript: e
	}
}

function setSchema(e) {
	return {
		type: 'SET_SCHEMA',
		schema: e
	}
}

export function getSchema() {
	return function(dispatch, getState) {
		var state = getState();
		dispatch(requestData());
		return axios.get(servUrl + 'tables.php').then((response) => {
			dispatch(setSchema(response.data));
		}).catch(e => {
			console.warn('Erro na resposta do servidor');
			console.warn(e);
		});
	}	
}