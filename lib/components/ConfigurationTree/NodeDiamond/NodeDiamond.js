import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import SVG from 'react-inlinesvg';

import areaIcon from './icons/area.svg';
import cellTowerIcon from './icons/cellTower.svg';
import finiteDieselIcon from './icons/finiteDiesel.svg';
import infiniteDieselIcon from './icons/infiniteDiesel.svg';
import loadIcon from './icons/load.svg';
import pvIcon from './icons/pv.svg';
import storageIcon from './icons/storage.svg';

require(`./NodeDiamond.${process.env.NODE_ENV === 'storybook' ? 'scss' : 'css'}`);

const typeToStyle = {
  Area: { icon: areaIcon, color: 'color1' },
  CellTower: { icon: cellTowerIcon, color: 'color2' },
  FiniteDieselGenerator: { icon: finiteDieselIcon, color: 'color2' },
  InfiniteDieselGenerator: { icon: infiniteDieselIcon, color: 'color2' },
  Load: { icon: loadIcon, color: 'color2' },
  PV: { icon: pvIcon, color: 'color2' },
  Storage: { icon: storageIcon, color: 'color2' },
};

const NodeDiamond = (props) => {
  const {
    type,
    ...other
  } = props;


  const diamondClasses = classNames(
    'node-diamond',
    `node-diamond--${typeToStyle[type].color}`,
  );

  const iconClasses = classNames('node-diamond__icon');

  return (
    <div className={diamondClasses} {...other}>
      <SVG
        src={typeToStyle[type].icon}
        className={iconClasses}
      />
    </div>
  );
};

NodeDiamond.propTypes = {
  type: PropTypes.oneOf(Object.keys(typeToStyle)),
};

NodeDiamond.defaultProps = {
  type: 'Area',
};

export default NodeDiamond;
