import React from 'react';
import ActionDiamond from './ActionDiamond/ActionDiamond';
import SVG from 'react-inlinesvg';
import arrowIcon from './arrowLeft.svg';
import ConfigurationTreeNode from './ConfigurationTreeNode/ConfigurationTreeNode';

require(`./ConfigurationTree.${process.env.NODE_ENV === 'storybook' ? 'scss' : 'css'}`);

class ConfigurationTree extends React.Component {
  static displayName = 'ConfigurationTree';

  constructor(props) {
    super(props);
    this.container = React.createRef();
    this.state = {
      parentWidth: 0,
      columnWidth: 120,
      scrollIndex: 0,
    };
    this.handleScroll = this.handleScroll.bind(this);
    this.handleScrollLeft = this.handleScroll.bind(this, 'left');
    this.handleScrollRight = this.handleScroll.bind(this, 'right');
    this.onWindowResize = this.onWindowResize.bind(this);
  }

  componentDidMount() {
    this.updateParentSize();
    window.addEventListener('resize', this.onWindowResize, { passive: true }); // TODO something more performant
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize, { passive: true });
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

  onWindowResize() {
    this.updateParentSize();
  }

  getRowOffset() {
    const pivotOffset = this.getPivotOffset();
    const { columnWidth, parentWidth } = this.state;
    const columnCount = this.getColumnCount();
    const { nodes } = this.props;
    if (pivotOffset && nodes.length < columnCount) {
      const paddingOffset = (parentWidth - (columnCount * columnWidth)) / 2;
      const visibleWidth = this.getVisibleWidth();
      const maxRowOffset = (columnWidth * columnCount) - (visibleWidth + columnWidth) + paddingOffset;
      const rowOffset = Math.max(pivotOffset - (visibleWidth / 2) + paddingOffset, 0);
      return Math.min(rowOffset, maxRowOffset);
    }
    return null;
  }

  getRowStyle() {
    const style = {};
    const { columnWidth } = this.state;
    const columnCount = this.getColumnCount();
    const width = columnWidth * columnCount;
    const rowOffset = this.getRowOffset();
    if (rowOffset) {
      style.marginLeft = `${rowOffset}px`;
    }
    style.width = `${width}px`;
    style.maxWidth = style.width;
    return style;
  }

  getArrowStyle(direction) {
    const style = {};
    const columnCount = this.getColumnCount();
    const { nodes } = this.props;
    if (nodes.length <= columnCount) {
      style.display = 'none';
      return style;
    }
    const { columnWidth, parentWidth } = this.state;
    const visibleWidth = columnCount * columnWidth;
    const paddingOffset = (parentWidth - visibleWidth) / 2;
    const arrowOffsetPx = `${paddingOffset + visibleWidth}px`;
    style[direction === 'left' ? 'right' : 'left'] = arrowOffsetPx;
    return style;
  }

  getPivotOffset() {
    const { pivotOffset } = this.props;
    const { columnWidth } = this.state;
    const columnCount = this.getColumnCount();
    let computedPivotOffset = pivotOffset;
    if (pivotOffset == null) {
      computedPivotOffset = (columnCount * columnWidth) / 2;
    }
    return computedPivotOffset;
  }

  getVisibleWidth() {
    const { columnWidth } = this.state;
    const columnCount = this.getColumnCount();
    const { nodes } = this.props;
    const ignoreAction = nodes.length < columnCount;
    const visibleWidth = columnWidth * Math.min((nodes.length - (ignoreAction ? 1 : 0)), columnCount);
    return visibleWidth;
  }

  handleScroll(direction) {
    if (direction === 'left') {
      this.setState(state => ({ scrollIndex: Math.max(0, state.scrollIndex - 1) }));
    } else if (direction === 'right') {
      const maxScrollIndex = this.getMaxScrollIndex();
      this.setState(state => ({ scrollIndex: Math.min(maxScrollIndex, state.scrollIndex + 1) }));
    }
  }

  getMaxScrollIndex() {
    return Math.max(this.props.nodes.length - this.getColumnCount(), 0);
  }

  updateParentSize() {
    const parentWidth = this.container.current.clientWidth;
    const maxScrollIndex = this.getMaxScrollIndex();
    this.setState(state => ({
      parentWidth,
      scrollIndex: Math.min(state.scrollIndex, maxScrollIndex),
    }));
  }

  renderNode(node, index) {
    const nodesCount = this.props.nodes.length;
    const isLast = index === nodesCount - 2;
    const isFirst = index === 0;

    if (node.type === 'action') {
      return (<ConfigurationTreeNode type="Add" />);
    }

    const lines = {
      rightLine: { show: true, active: false },
      leftLine: { show: true, active: false },
      upLine: { show: true, active: false },
      downLine: { show: false, active: false },
    };
    if (isFirst) {
      lines.leftLine.show = false;
    } else if (isLast) {
      lines.rightLine.show = false;
    }

    if (node.active) {
      lines.downLine.show = true;
      lines.downLine.active = true;
      lines.upLine.show = true;
      lines.upLine.active = true;
    }

    return (<ConfigurationTreeNode type={node.type} {...lines} />);
  }

  renderChildNodes() {
    const { nodes } = this.props;
    const { columnWidth } = this.state;
    const activeNode = nodes
      .map((node, index) => ({ node, index }))
      .find(node => node.node.active);
    if (!activeNode || !activeNode.node.nodes || !activeNode.node.nodes.length) {
      return null;
    }
    const rowOffset = this.getRowOffset();
    const parentPivot = rowOffset ? this.getPivotOffset() : 0;
    const visibleWidth = this.getVisibleWidth(); // columnWidth * (nodes.length - 1);
    const childPivot = parentPivot
      ? parentPivot - (visibleWidth / 2) + (activeNode.index * columnWidth) + (columnWidth / 2)
      : (activeNode.index * columnWidth) + (columnWidth / 2);
    return (
      <ConfigurationTree nodes={activeNode.node.nodes} pivotOffset={childPivot} />
    );
  }

  render() {
    return (
      <div className="ct_wrapper">
        <div className="ct">
          <div className="ct__arrow" style={this.getArrowStyle('left')} onClick={this.handleScrollLeft}>
            <SVG src={arrowIcon} />
          </div>
          <div className="ct__container" ref={this.container}>
            <div className="ct__row" id="row" style={this.getRowStyle()}>
              {
                this.props.nodes.map((node, index) => (
                  <div key={index} className="ct__node" style={this.getNodeStyle(node, index)}>
                    {this.renderNode(node, index)}
                  </div>
                  ))
              }
            </div>
          </div>
          <div className="ct__arrow ct__arrow--right" style={this.getArrowStyle('right')} onClick={this.handleScrollRight}>
            <SVG src={arrowIcon} />
          </div>
        </div>
        {this.renderChildNodes()}
      </div>
    );
  }
}

export default ConfigurationTree;
