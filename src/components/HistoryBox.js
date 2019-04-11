import _ from 'lodash';
import React, { Component } from 'react';
import ImageBox from './ImageBox';
import { Link } from 'react-router-dom';
import { FaRegEdit } from 'react-icons/fa';

export default class HistoryBox extends Component {
  render() {
    const historyId = _.get(this.props, 'historyId');
    const recipeId = _.get(this.props, 'recipeId');
    const date = _.get(this.props, 'date', '');
    const remark = _.get(this.props, 'remark', '');
    const showRemark = _.get(this.props, 'showRemark', '');
    const images = _.get(this.props, 'images', []);

    return (
      <div>
        <div className="d-flex justify-content-between">
          <h4>{date}</h4>
          {historyId && (
            <Link to={`/recipe/${recipeId}/history/${historyId}`}>
              <button className="btn">
                <FaRegEdit />
              </button>
            </Link>
          )}
        </div>
        <ImageBox images={images}>
          {showRemark && (
            <div className="row mt-2">
              <p>{remark}</p>
            </div>
          )}
        </ImageBox>
      </div>
    );
  }
}
