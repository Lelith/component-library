import React from 'react';
// import PropTypes from 'prop-types';
// import classNames from 'classnames/bind';
require(`./ConfigurationTree.${process.env.NODE_ENV === 'storybook' ? 'scss' : 'css'}`);

class ConfigurationTree extends React.Component {
  constructor(props) {
    super(props);
    this.container = React.createRef();
    this.state = {
      parentWidth: 0,
      columnWidth: 100,
      scrollIndex: 0,
    };
    this.handleScroll = this.handleScroll.bind(this);
    this.handleScrollLeft = this.handleScroll.bind(this, 'left');
    this.handleScrollRight = this.handleScroll.bind(this, 'right');
  }

  componentDidMount() {
    this.updateParentSize();
  }

  getColumnCount() {
    return Math.floor(this.state.parentWidth / (this.state.columnWidth));
  }

  getNodeStyle(node, index) {
    const { scrollIndex, columnWidth } = this.state;
    const nodesCount = this.props.nodes.length;
    const columnCount = this.getColumnCount();
    const isLast = index === nodesCount - 1;
    const isFirst = index === 0;
    const style = {
      width: `${this.state.columnWidth}px`,
    };
    style.minWidth = style.width;
    if (isLast) {
      const normalNodesWidth = (nodesCount - 1) * this.state.columnWidth;
      const spaceLeft = ((columnCount * this.state.columnWidth) - normalNodesWidth) / 2;
      if (spaceLeft >= this.state.columnWidth) {
        style.marginRight = '-100px';
      }
    }
    if (isFirst && scrollIndex) {
      style.marginLeft = `-${scrollIndex * columnWidth}px`;
    } else {
      style.marginLeft = '0px';
    }
    return style;
  }

  getRowStyle() {
    const style = {};
    const { columnWidth } = this.state;
    const columnCount = this.getColumnCount();
    const { nodes } = this.props;
    const width = columnWidth * columnCount;
    style.width = `${width}px`;
    style.maxWidth = style.width;
    if (nodes.length > columnCount) {
      style.justifyContent = 'flex-start';
    }
    return style;
  }

  handleScroll(direction) {
    if (direction === 'left') {
      this.setState(state => ({ scrollIndex: Math.max(0, state.scrollIndex - 1) }));
    } else if (direction === 'right') {
      const maxScrollIndex = Math.max(this.props.nodes.length - this.getColumnCount(), 0);
      this.setState(state => ({ scrollIndex: Math.min(maxScrollIndex, state.scrollIndex + 1) }));
    }
  }

  updateParentSize() {
    this.setState(() => ({
      parentWidth: this.container.current.clientWidth,
    }));
  }

  render() {
    return (
      <div className="ct">
        <div className="ct__arrow" onClick={this.handleScrollLeft}>O</div>
        <div className="ct__container" ref={this.container}>
          <div className="ct__row" id="row" style={this.getRowStyle()}>
            {
              this.props.nodes.map((node, index) => (
                <div key={index} className="ct__node" style={this.getNodeStyle(node, index)}>
                  {index + 1}/{ this.getColumnCount() }
                </div>
                ))
            }
          </div>
        </div>
        <div className="ct__arrow" onClick={this.handleScrollRight}>O</div>
      </div>
    );
  }
}

export default ConfigurationTree;
