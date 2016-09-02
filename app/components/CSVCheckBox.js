import { connect } from 'react-redux';
import { asCsvChanged } from '../redux/actions';

const CSVCheckBox = (props) => (
    <div className="checkbox">
	  <label><input type="checkbox" value="" onClick={e => props.asCsvChanged(e.target.checked)} />Resultado em CSV</label>
	</div>
);

function mapDispatchToProps(dispatch) {
    return {
        asCsvChanged: value => dispatch(asCsvChanged(value)),
    };
}

export default connect(() => Object(), mapDispatchToProps)(CSVCheckBox);
