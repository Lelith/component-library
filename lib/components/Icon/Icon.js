import React from 'react';
import PropTypes from 'prop-types';
import SVG from 'react-inlinesvg';

import areaIcon from './svg/area.svg';
import cellTowerIcon from './svg/cellTower.svg';
import closeIcon from './svg/close.svg';
import finiteDieselIcon from './svg/finiteDiesel.svg';
import infiniteDieselIcon from './svg/infiniteDiesel.svg';
import loadIcon from './svg/load.svg';
import plusIcon from './svg/plus.svg';
import pvIcon from './svg/pv.svg';
import storageIcon from './svg/storage.svg';

const typeToIcon = {
  Add: plusIcon,
  Area: areaIcon,
  CellTower: cellTowerIcon,
  Close: closeIcon,
  FiniteDieselGenerator: finiteDieselIcon,
  InfiniteDieselGenerator: infiniteDieselIcon,
  Load: loadIcon,
  PV: pvIcon,
  Storage: storageIcon,
};

const Icon = (props) => {
  const {
    type,
    ...other
  } = props;


  return (
    <SVG
      src={typeToIcon[type]}
      {...other}
    />
  );
};

Icon.propTypes = {
  type: PropTypes.oneOf(Object.keys(typeToIcon)).isRequired,
};

export default Icon;

