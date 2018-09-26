import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import SVG from 'react-inlinesvg';

import plusIcon from './plus.svg';

require(`./ConfigurationTreeAction.${process.env.NODE_ENV === 'storybook' ? 'scss' : 'css'}`);

const ConfigurationTreeAction = (props) => {
  const {
    clicked,
    type,
    ...other
  } = props;


  const modifier = clicked ? 'clicked' : 'unclicked';
  const diamondClasses = classNames(
    'configuration-tree-action',
    `configuration-tree-action--${modifier}`,
  );
  const iconClasses = classNames(
    'configuration-tree-action__icon',
    `configuration-tree-action__icon--${modifier}`,
  );

  let iconUrl;
  switch (type) {
    case 'add': iconUrl = plusIcon; break;
    default: iconUrl = plusIcon;
  }

  return (
    <div className={diamondClasses} {...other}>
      <SVG
        src={iconUrl}
        className={iconClasses}
      />
    </div>
  );
};

ConfigurationTreeAction.propTypes = {
  clicked: PropTypes.bool,
  type: PropTypes.oneOf(['add']),
};

ConfigurationTreeAction.defaultProps = {
  clicked: false,
  type: 'add',
};

export default ConfigurationTreeAction;
