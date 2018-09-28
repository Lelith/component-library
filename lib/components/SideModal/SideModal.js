import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import Icon from './../Icon/Icon';

require(`./SideModal.${process.env.NODE_ENV === 'storybook' ? 'scss' : 'css'}`);

const SideModal = (props) => {
  const {
    show,
    children,
    top,
    onClose,
    ...other
  } = props;


  const sideModalClasses = classNames(
    'side-modal',
    `side-modal--${show ? 'visible' : 'hidden'}`,
  );

  const sideModalStyle = {
    top,
  };

  return (
    <div style={sideModalStyle} className={sideModalClasses} {...other}>
      <div className="side-modal__close-button" onClick={onClose} role="presentation">
        <Icon type="Close" />
      </div>
      {children}
    </div>
  );
};

SideModal.propTypes = {
  show: PropTypes.bool,
  children: PropTypes.node.isRequired,
  top: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

SideModal.defaultProps = {
  show: false,
  top: '120px',
};

export default SideModal;
