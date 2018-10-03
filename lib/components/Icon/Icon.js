import React from 'react';
import PropTypes from 'prop-types';
import SVG from 'react-inlinesvg';

import areaIcon from './../../images/icon_area.svg';
import cellTowerIcon from './../../images/icon_cell_tower.svg';
import closeIcon from './../../images/icon_close.svg';
import deleteIcon from './../../images/icon_delete.svg';
import errorIcon from './../../images/icon_error.svg';
import finiteDieselIcon from './../../images/icon_finite_diesel.svg';
import infiniteDieselIcon from './../../images/icon_infinite_diesel.svg';
import loadIcon from './../../images/icon_load.svg';
import minusCircleIcon from './../../images/icon_minus_circle.svg';
import plusCircleIcon from './../../images/icon_plus_circle.svg';
import plusIcon from './../../images/icon_plus.svg';
import pvIcon from './../../images/icon_pv.svg';
import storageIcon from './../../images/icon_storage.svg';

const typeToIcon = {
  Add: plusIcon,
  Area: areaIcon,
  CellTower: cellTowerIcon,
  Close: closeIcon,
  Delete: deleteIcon,
  Error: errorIcon,
  FiniteDieselGenerator: finiteDieselIcon,
  InfiniteDieselGenerator: infiniteDieselIcon,
  Load: loadIcon,
  MinusCircle: minusCircleIcon,
  PlusCircle: plusCircleIcon,
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

