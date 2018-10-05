import React from 'react';
import PropTypes from 'prop-types';

import Icon from './../../Icon/Icon';
import { types } from './../NodeDiamond/NodeDiamond';

require(`./NodeParamsFormWrapper.${process.env.NODE_ENV === 'storybook' ? 'scss' : 'css'}`);

const NodeParamsFormWrapper = (props) => {
  const {
    type,
    onSave,
    onDelete,
    children,
    count,
    onCountChange,
  } = props;

  return (
    <div className="node-params-form-wrapper">
      <div className="node-params-form-wrapper-header">
        <Icon type={type} />
      </div>

      {
        count != null &&
        <div className="node-params-form-wrapper-counter">
          <div
            className="node-params-form-wrapper-counter__button"
            style={{ visibility: count > 1 ? 'visible' : 'hidden' }}
            role="presentation"
            onClick={() => onCountChange(count - 1)}
          >
            <Icon type="MinusCircle" />
          </div>
          <div className="node-params-form-wrapper-counter__value">{ count }</div>
          <div className="node-params-form-wrapper-counter__button" role="presentation" onClick={() => onCountChange(count + 1)}>
            <Icon type="PlusCircle" />
          </div>
        </div>
      }

      { children }

      <div className="node-params-form-wrapper-footer">
        <div className="node-params-form-wrapper-footer__save-button" onClick={onSave} role="presentation">
          <span>SAVE</span>
        </div>

        <div className="node-params-form-wrapper-footer__delete-button" onClick={onDelete} role="presentation">
          <Icon type="Delete" />
        </div>
      </div>
    </div>
  );
};

NodeParamsFormWrapper.propTypes = {
  count: PropTypes.number,
  onCountChange: PropTypes.func,
  children: PropTypes.node,
  onSave: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  type: PropTypes.oneOf(types).isRequired,
};

NodeParamsFormWrapper.defaultProps = {
  children: null,
  count: null,
  onCountChange: () => {},
};

export default NodeParamsFormWrapper;