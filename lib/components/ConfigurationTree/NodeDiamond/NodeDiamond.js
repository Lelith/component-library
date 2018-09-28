import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import Icon from './../../Icon/Icon';

require(`./NodeDiamond.${process.env.NODE_ENV === 'storybook' ? 'scss' : 'css'}`);

export const typeToStyle = {
  Area: { color: 'color1' },
  CellTower: { color: 'color2' },
  FiniteDieselGenerator: { color: 'color2' },
  InfiniteDieselGenerator: { color: 'color2' },
  Load: { color: 'color2' },
  PV: { color: 'color2' },
  Storage: { color: 'color2' },
};

const NodeDiamond = (props) => {
  const {
    type,
    clicked,
    ...other
  } = props;


  const diamondClasses = classNames(
    'node-diamond',
    `node-diamond--${typeToStyle[type].color}${clicked ? '-clicked' : ''}`,
  );

  const iconClasses = classNames('node-diamond__icon');

  return (
    <div className="node-diamond-wrapper">
      <div className={diamondClasses} {...other}>
        <Icon type={type} className={iconClasses} />
      </div>
    </div>
  );
};

NodeDiamond.propTypes = {
  type: PropTypes.oneOf(Object.keys(typeToStyle)),
  clicked: PropTypes.bool,
};

NodeDiamond.defaultProps = {
  type: 'Area',
  clicked: false,
};

export default NodeDiamond;

export const types = Object.keys(typeToStyle);
