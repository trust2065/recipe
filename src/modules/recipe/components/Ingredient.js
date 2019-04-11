import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';
import { Button } from '../../../components';
import { FaTimes } from 'react-icons/fa';

class Ingredient extends Component {
  static propTypes = {
    name: PropTypes.string,
    isEdit: PropTypes.bool
  };
  render() {
    const { isEdit, name } = this.props;
    return (
      <div
        className="input-group mb-3"
        style={{ flexGrow: '1', maxWidth: '49%' }}>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={e => this.props.onChange(e)}
          placeholder="new ingredient"
        />
        <div className="input-group-append">
          <Button onClick={this.props.onDelete} className="input-group-text">
            <FaTimes />
          </Button>
        </div>
      </div>
    );
  }
}

export default Ingredient;
