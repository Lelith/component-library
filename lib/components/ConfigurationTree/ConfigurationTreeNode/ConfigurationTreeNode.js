import React from 'react';
import PropTypes from 'prop-types';

import NodeDiamond from './../NodeDiamond/NodeDiamond';

require(`./ConfigurationTreeNode.${process.env.NODE_ENV === 'storybook' ? 'scss' : 'css'}`);

const ConfigurationTreeNode = (props) => {
  const {
    upLine,
    downLine,
    leftLine,
    rightLine,
    ...other
  } = props;

  const leftHeaderBorder = `${leftLine.show ? '2' : '0'}px ${upLine.show ? '1' : '0'}px 0px 0px`;
  const rightHeaderBorder = `${rightLine.show ? '2' : '0'}px 0px 0px ${upLine.show ? '1' : '0'}px`;

  const leftHeaderStyle = {
    width: '50%',
    height: '100%',
    borderWidth: leftHeaderBorder,
  };

  const rightHeaderStyle = {
    width: '50%',
    height: '100%',
    borderWidth: rightHeaderBorder,
  };

  const diamondWrapperStyle = {
    marginTop: '11px',
    marginBottom: '11px',
  };

  const nameStyle = {
    height: '51px',
  };

  const footerStyle = {
    visibility: downLine.show ? 'visible' : 'hidden',
  };

  return (
    <div className="configuration-tree-node-container">
      <div className="configuration-tree-node-header" >
        <div style={leftHeaderStyle} />
        <div style={rightHeaderStyle} />
      </div>
      <div style={diamondWrapperStyle} >
        <NodeDiamond {...other} />
      </div>
      <div style={nameStyle} />
      <div style={footerStyle} className="configuration-tree-node-footer" />
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
};

ConfigurationTreeNode.defaultProps = {
  upLine: { show: false, active: false },
  downLine: { show: false, active: false },
  leftLine: { show: false, active: false },
  rightLine: { show: false, active: false },
};

export default ConfigurationTreeNode;
