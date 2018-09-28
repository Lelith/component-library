import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import Icon from './../../Icon/Icon';

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


  return (
    <div className="action-diamond-wrapper">
      <div className={diamondClasses} {...other}>
        <Icon type={type} className={iconClasses} />
      </div>
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

export const types = ['Add'];
