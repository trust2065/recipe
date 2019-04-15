import _ from 'lodash';
import React, { Component } from 'react';
import { HistoryBox, LoadingIndicator } from '../../components';
import { recipeFetch } from './reducer';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';

const History = connect(store => {
  const { histories, recipeId, name } = store.history.data;
  const { fetching } = store.history.meta;
  return {
    recipeId,
    fetching,
    histories,
    name
  };
})(
  class History extends Component {
    constructor(props) {
      super(props);
      this.state = {
        showRemark: true
      };
    }
    componentDidMount = () => {
      const recipeId = _.get(this.props, 'match.params.id', '');
      this.props.dispatch(recipeFetch(recipeId));
    };
    onShowRemarkChange = e => {
      const showRemark = e.target.checked;
      this.setState({ ...this.state, showRemark: showRemark });
    };
    render() {
      const histories = _.get(this.props, 'histories', []);
      const recipeId = _.get(this.props, 'recipeId', 0);
      const name = _.get(this.props, 'name', '');
      const showRemark = _.get(this.state, 'showRemark', true);
      const { fetching } = this.props;

      const historyBoxes = [];

      histories &&
        histories.forEach((history, i) => {
          const date = new Date(history.date);
          const fullDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
          historyBoxes.push(
            <div key={`historyImage_${i}`} className="col-sm-4">
              <HistoryBox
                recipeId={recipeId}
                historyId={history.id}
                images={history.images}
                remark={history.remark}
                date={fullDate}
                showRemark={showRemark}
              />
            </div>
          );
        });

      return fetching ? (
        <LoadingIndicator />
      ) : (
        <div className="container">
          <div className="row">
            <div className="col-sm-6">
              <div>
                <h2>{name}</h2>
              </div>
            </div>
            <div className="col-sm-4 ml-auto d-flex flex-column align-items-end">
              <div className="form-check my-2 remark">
                <input
                  type="checkbox"
                  className="d-none"
                  id="showRemark"
                  onChange={this.onShowRemarkChange}
                  checked={showRemark}
                />
                <label
                  className="btn labelButton"
                  htmlFor="showRemark"
                  style={{ width: '160px' }}>
                  {showRemark ? 'Hide' : 'Show'} Remark
                </label>
              </div>
              {recipeId && (
                <Link to={`/recipe/${recipeId}/history/create`}>
                  <button className="btn btn-block" style={{ width: '160px' }}>
                    <FaPlus /> <span>Listing</span>
                  </button>
                </Link>
              )}
            </div>
          </div>
          <div className="row mt-5">{historyBoxes}</div>
        </div>
      );
    }
  }
);

export default History;
