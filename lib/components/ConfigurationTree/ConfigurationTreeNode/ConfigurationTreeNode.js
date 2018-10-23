import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import ActionDiamond, { types as actionTypes } from './../ActionDiamond/ActionDiamond';
import NodeDiamond, { types as nodeTypes } from './../NodeDiamond/NodeDiamond';

require(`./ConfigurationTreeNode.${process.env.NODE_ENV === 'storybook' ? 'scss' : 'css'}`);

const ConfigurationTreeNode = (props) => {
  const {
    upLine,
    downLine,
    leftLine,
    rightLine,
    name,
    width,
    type,
    state,
    ...other
  } = props;

  const leftLineClasses = classNames(
    'configuration-tree-node-header__horizontal-line',
    `configuration-tree-node-header__horizontal-line--${leftLine.active ? 'active' : 'inactive'}`,
    'configuration-tree-node-header__horizontal-line--left',
  );

  const rightLineClasses = classNames(
    'configuration-tree-node-header__horizontal-line',
    `configuration-tree-node-header__horizontal-line--${rightLine.active ? 'active' : 'inactive'}`,
    'configuration-tree-node-header__horizontal-line--right',
  );

  const upLineClasses = classNames(
    'configuration-tree-node-header__vertical-line',
    `configuration-tree-node-header__vertical-line--${upLine.active ? 'active' : 'inactive'}`,
  );

  const footerClasses = classNames(
    'configuration-tree-node-footer',
    `configuration-tree-node-footer--${downLine.active ? 'active' : 'inactive'}`,
  );

  return (
    <div style={{ width }} className="configuration-tree-node-container">
      <div className="configuration-tree-node-header" >
        <div style={{ visibility: leftLine.show ? 'visible' : 'hidden' }} className={leftLineClasses} />
        <div style={{ visibility: upLine.show ? 'visible' : 'hidden' }} className={upLineClasses} />
        <div style={{ visibility: rightLine.show ? 'visible' : 'hidden' }} className={rightLineClasses} />
      </div>
      {
        actionTypes.includes(type)
          ? <ActionDiamond type={type} clicked={state === 'clicked'} {...other} />
          : <NodeDiamond type={type} state={state} {...other} />
      }
      <span className="configuration-tree-node-name">{ name }</span>
      <div style={{ visibility: downLine.show ? 'visible' : 'hidden' }} className={footerClasses} />
    </div>
  );
};

ConfigurationTreeNode.propTypes = {
  upLine: PropTypes.shape({
    show: PropTypes.bool,
    active: PropTypes.bool,
  }),
  downLine: PropTypes.shape({
    show: PropTypes.bool,
    active: PropTypes.bool,
  }),
  leftLine: PropTypes.shape({
    show: PropTypes.bool,
    active: PropTypes.bool,
  }),
  rightLine: PropTypes.shape({
    show: PropTypes.bool,
    active: PropTypes.bool,
  }),
  name: PropTypes.string,
  width: PropTypes.string,
  type: PropTypes.oneOf(actionTypes.concat(nodeTypes)),
  state: PropTypes.oneOf(['inactive', 'active', 'clicked']),
};

ConfigurationTreeNode.defaultProps = {
  upLine: { show: false, active: false },
  downLine: { show: false, active: false },
  leftLine: { show: false, active: false },
  rightLine: { show: false, active: false },
  name: '',
  width: '100%',
  type: 'Area',
  state: 'inactive',
};

export default ConfigurationTreeNode;
