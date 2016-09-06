import { connect } from 'react-redux';
import { fetchQuery, selectTab } from '../redux/actions';

const ExecQueryButton = (props) => (
    <div
	    className="btn btn-block btn-success" 
		onClick={() => {
            if (props.ascsv)
                window.location.replace('http://apoema.esalq.usp.br/~getlidar/query.php?query=' + props.query.replace(/\n/g, ' \n') + '&ascsv=true');
            else
            {
                props.selectTab();
                props.fetchQuery();
            }
        }}>
		Rodar
	</div>
);

const mapStateToProps = function(store) {
    return {
        query: store.query,
        ascsv: store.ascsv,
    };
}

function mapDispatchToProps(dispatch, props) {
    return {
        fetchQuery: () => {dispatch(fetchQuery())},
        selectTab: () => {dispatch(selectTab(1))},
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ExecQueryButton);
