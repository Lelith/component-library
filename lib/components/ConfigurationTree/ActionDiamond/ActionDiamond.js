import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import SVG from 'react-inlinesvg';

import plusIcon from './icons/plus.svg';

require(`./ActionDiamond.${process.env.NODE_ENV === 'storybook' ? 'scss' : 'css'}`);

const ActionDiamond = (props) => {
  const {
    clicked,
    type,
    ...other
  } = props;


  const modifier = clicked ? 'clicked' : 'unclicked';
  const diamondClasses = classNames(
    'action-diamond',
    `action-diamond--${modifier}`,
  );
  const iconClasses = classNames(
    'action-diamond__icon',
    `action-diamond__icon--${modifier}`,
  );

  let icon;
  switch (type) {
    case 'Add': icon = plusIcon; break;
    default: icon = plusIcon;
  }

  return (
    <div className={diamondClasses} {...other}>
      <SVG
        src={icon}
        className={iconClasses}
      />
    </div>
  );
};

ActionDiamond.propTypes = {
  clicked: PropTypes.bool,
  type: PropTypes.oneOf(['Add']),
};

ActionDiamond.defaultProps = {
  clicked: false,
  type: 'Add',
};

export default ActionDiamond;
