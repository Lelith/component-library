import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React from 'react';
import SVG from 'react-inlinesvg';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import arrowIcon from './../../images/icon_arrow_left.svg';
import ConfigurationTreeDepthController from './ConfigurationTreeDepthController';
import ConfigurationTreeNode from './ConfigurationTreeNode/ConfigurationTreeNode';

require(`./ConfigurationTree.${process.env.NODE_ENV === 'storybook' ? 'scss' : 'css'}`);

function isActive(node) {
  return node.state === 'active' || node.state === 'clicked';
}
class ConfigurationTree extends React.Component {
  static displayName = 'ConfigurationTree';

  constructor(props) {
    super(props);
    this.container = React.createRef();
    this.state = {
      parentWidth: 0,
      columnWidth: 120,
      scrollIndex: 0,
      childTransitionInProgress: false,
    };
    this.handleScroll = this.handleScroll.bind(this);
    this.handleScrollLeft = this.handleScroll.bind(this, 'left');
    this.handleScrollRight = this.handleScroll.bind(this, 'right');
    this.onWindowResize = this.onWindowResize.bind(this);
    this.handleChildTransitionEnter = this.handleChildTransitionEnter.bind(this);
    this.handleChildTransitionExited = this.handleChildTransitionExited.bind(this);
  }

  componentDidMount() {
    this.updateParentSize();
    window.addEventListener('resize', this.onWindowResize, { passive: true }); // TODO something more performant
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize, { passive: true });
  }

  componentDidUpdate(prevProps, prevState) {
    const prevNodes = prevProps.nodes;
    const { nodes } = this.props;
    if (nodes.length > prevNodes.length) {
      this.handleScrollRight();
    } else if (nodes.length < prevNodes.length) {
      this.handleScrollLeft();
    }
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
      const paddingOffset = 0; // (parentWidth - (columnCount * columnWidth)) / 2;
      const visibleWidth = this.getVisibleWidth();

      const additionalOffset = nodes.length === 1 && nodes[0].type === 'Add'
        ? 0
        : columnWidth;

      const maxRowOffset = (columnWidth * columnCount) - (visibleWidth + additionalOffset) + paddingOffset;
      const rowOffset = Math.max(pivotOffset - (visibleWidth / 2) + paddingOffset, 0);
      return {
        rowOffset: Math.min(rowOffset, maxRowOffset),
        maxRowOffset,
      };
    }
    return { rowOffset: 0 };
  }

  getScrollColumns(direction) {
    if (direction === 'left') {
      return this.state.scrollIndex;
    } else if (direction === 'right') {
      return this.props.nodes.length - this.getColumnCount() - this.state.scrollIndex;
    }
  }

  getRowStyle() {
    const style = {};
    const { columnWidth, parentWidth } = this.state;
    const columnCount = this.getColumnCount();
    const width = columnWidth * columnCount;
    const { rowOffset } = this.getRowOffset();
    const marginLeft = (rowOffset || 0) + ((parentWidth - width) / 2);
    style.marginLeft = `${marginLeft}px`;
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
    const { columnWidth, parentWidth, scrollIndex } = this.state;
    const visibleWidth = columnCount * columnWidth;
    const paddingOffset = (parentWidth - visibleWidth) / 2;
    const arrowOffsetPx = `${paddingOffset + visibleWidth}px`;
    style[direction === 'left' ? 'right' : 'left'] = arrowOffsetPx;
    if (!this.getScrollColumns(direction)) {
      style.opacity = 0.3;
    }
    return style;
  }

  getPivotOffset() {
    const { pivotOffset } = this.props;
    const { columnWidth, parentWidth } = this.state;
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
    const ignoreAction = (nodes.length < columnCount) && nodes.find(node => node.type === 'Add') && nodes.length > 1;
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

  isRowHidden() {
    const { parentVisible } = this.props;
    const { parentWidth } = this.state;
    return !parentVisible && parentVisible != null; // && parentWidth > 0;
  }

  getActiveNode() {
    const { scrollIndex } = this.state;
    const columnCount = this.getColumnCount();
    const { nodes } = this.props;
    const activeNode = nodes
      .map((node, index) => {
        const visibleIndex = index - scrollIndex;
        const isVisible = visibleIndex >= 0 && visibleIndex < columnCount;
        return {
          node,
          index,
          visibleIndex,
          isVisible,
        };
      })
      .find(node => isActive(node.node));
    return activeNode || null;
  }

  isLastActive() {
    const columnCount = this.getColumnCount();
    const { nodes } = this.props;
    const activeNode = this.getActiveNode();
    const { rowOffset, maxRowOffset } = this.getRowOffset();
    return activeNode && activeNode.visibleIndex === columnCount - 1 && nodes.length >= columnCount;
  }

  isRoot() {
    return this.props.parentIsLastActive == null;
  }

  renderNode(node, index) {
    const { nodes } = this.props;
    const nodesCount = nodes.length;
    const normalNodes = nodes.filter(node => node.type !== 'Add' || isActive(node));
    const { rowOffset } = this.getRowOffset();
    const { columnWidth, parentWidth, scrollIndex } = this.state;
    const lastNodeIndex = nodes.length - 1;
    const lastNode = nodes[lastNodeIndex];
    const showLinesOnLast = this.props.parentIsLastActive; // && this.isLastActive();
    const isLastAddActive = lastNode && lastNode.type === 'Add' && (isActive(lastNode) || showLinesOnLast);
    const isLast = (!isLastAddActive && index === nodesCount - 2) || (isLastAddActive && index === lastNodeIndex);
    const isFirst = index === 0;

    const showSideLines = (node.type !== 'Add' && (normalNodes.length > 1 || showLinesOnLast)) || (node.type === 'Add' && (isActive(node) || showLinesOnLast) && nodesCount > 1);
    const showUpLine = node.type !== 'Add' || this.props.nodes.length <= 1 || (node.type === 'Add' && isActive(node));

    const lines = {
      rightLine: { show: showSideLines, active: false },
      leftLine: { show: showSideLines, active: false },
      upLine: { show: showUpLine, active: false },
      downLine: { show: false, active: false },
    };
    if (isFirst) {
      lines.leftLine.show = false;
    } else if (isLast) {
      lines.rightLine.show = false;
    }

    if (isActive(node)) {
      const anyChildActive = node.nodes && node.nodes.find(node => isActive(node));
      const anyChild = node.nodes && node.nodes.length;
      lines.downLine.show = !!anyChild;
      lines.downLine.active = !!anyChildActive;
      lines.upLine.show = true;
      lines.upLine.active = true;
      if (!lines.leftLine.show && this.parentIsLastActive && this.isLastActive() && nodesCount > 1) {
        lines.leftLine.show = true;
      }
    }

    if (node.type === 'Add' && nodes.length === 1 && this.isRoot()) {
      lines.upLine.show = false;
    }

    const visibleIndex = index - scrollIndex;
    const columnCount = this.getColumnCount();
    const paddingOffset = (parentWidth - (columnCount * columnWidth)) / 2;
    const pivotOffset = this.getPivotOffset() + (paddingOffset / 2);
    const nodeOffset = rowOffset + (visibleIndex * columnWidth);
    const nodeLeftOffset = nodeOffset + (columnWidth / 4);
    const nodeRightOffset = nodeOffset + ((columnWidth * 3) / 4);
    const activeNode = this.getActiveNode();
    if (activeNode && normalNodes.length > 0) {
      const activeNodeOffset = rowOffset + (activeNode.visibleIndex * columnWidth) + (columnWidth / 2);
      if (
        (nodeLeftOffset < pivotOffset && nodeLeftOffset > activeNodeOffset) ||
        (nodeLeftOffset > pivotOffset && nodeLeftOffset < activeNodeOffset)
      ) {
        lines.leftLine.active = true;
        lines.leftLine.show = true;
      }
      if (
        (nodeRightOffset < pivotOffset && nodeRightOffset > activeNodeOffset) ||
        (nodeRightOffset > pivotOffset && nodeRightOffset < activeNodeOffset)
      ) {
        lines.rightLine.active = true;
        lines.rightLine.show = true;
      }
    }

    if ((!activeNode || !activeNode.node.nodes.length) && normalNodes.length) {
      ['leftLine', 'rightLine', 'upLine'].forEach((key) => {
        if (lines[key].show) {
          lines[key].active = true;
        }
      });
    }

    if (isActive(node)) {
      const childNodes = (node.nodes || []).filter(childNode => childNode.type !== 'Add');
      const anyChildActive = childNodes.find(childNode => isActive(childNode));
      if (childNodes.length && !anyChildActive && lines.downLine.show) {
        lines.downLine.active = true;
      }
    }


    return (<ConfigurationTreeNode
      type={node.type}
      {...lines}
      name={node.name}
      state={node.state}
      onClick={() => this.props.onNodeClick(node.id)}
    />);
  }

  shouldRenderChildren() {
    const activeNode = this.getActiveNode();
    if (!activeNode || !activeNode.node.nodes || !activeNode.node.nodes.length) {
      return false;
    }
    return activeNode.index + 1;
  }

  renderChildNodes() {
    const isLastActive = this.isLastActive();
    const { columnWidth } = this.state;
    const { nodes } = this.props;
    const activeNode = this.getActiveNode();

    if (!activeNode || !activeNode.node.nodes || !activeNode.node.nodes.length) {
      return <div />;
    }
    const { rowOffset } = this.getRowOffset();
    const parentPivot = rowOffset ? this.getPivotOffset() : 0;
    const visibleWidth = this.getVisibleWidth();
    const childPivot = parentPivot
      ? rowOffset + (activeNode.visibleIndex * columnWidth) + (columnWidth / 2)
      : (activeNode.visibleIndex * columnWidth) + (columnWidth / 2);

    return (
      <ConfigurationTree
        nodes={activeNode.node.nodes}
        pivotOffset={childPivot}
        parentVisible={activeNode.isVisible}
        onNodeClick={this.props.onNodeClick}
        parentIsLastActive={isLastActive}
      />
    );
  }

  renderRow() {
    return (
      <TransitionGroup appear>
        <CSSTransition
          key={this.props.parentPivot}
          in={!!this.state.parentWidth}
          timeout={{ enter: 500, exit: 250 }}
          classNames="ct-fade"
        >
          <div className="ct__row" id="row" style={this.getRowStyle()}>
            {
              this.props.nodes.map((node, index) => (
                <div key={index} className="ct__node" style={this.getNodeStyle(node, index)}>
                  {this.renderNode(node, index)}
                </div>
              ))
            }
          </div>
        </CSSTransition>
      </TransitionGroup>
    );
  }

  handleChildTransitionEnter() {
    this.setState(() => ({
      childTransitionInProgress: true,
    }));
  }

  handleChildTransitionExited() {
    this.setState(() => ({
      childTransitionInProgress: false,
    }));
  }

  getChildTransitionClasses() {
    return classNames({
      'ct-transition-in-progress': this.state.childTransitionInProgress,
    });
  }

  renderArrow(direction) {
    const scrollColumns = this.getScrollColumns(direction);
    const handleScroll = direction === 'left' ? this.handleScrollLeft : this.handleScrollRight;
    const arrowClasses = classNames({
      ct__arrow: true,
      'ct__arrow--right': direction === 'right',
    });
    return (
      <div className={arrowClasses} style={this.getArrowStyle(direction)} onClick={handleScroll}>
        { scrollColumns ? (<div className="ct__badge">{ scrollColumns }</div>) : null }
        <SVG src={arrowIcon} />
      </div>
    );
  }

  render() {
    const scrollRight = this.getScrollColumns('right');

    return (
      <div className={classNames('ct-wrapper', { 'ct-wrapper--hidden': this.isRowHidden() })}>
        <div className={classNames('ct__breadcrumbs', { 'ct__breadcrumbs--visible': !!this.props.breadcrumbs })}>
          { this.props.breadcrumbs }
        </div>
        <div className="ct">
          { this.renderArrow('left') }
          <div className="ct__container" ref={this.container}>
            {this.renderRow()}
          </div>
          { this.renderArrow('right') }
        </div>
        <TransitionGroup appear className={this.getChildTransitionClasses()}>
          <CSSTransition
            key={this.shouldRenderChildren()}
            timeout={{ enter: 300, exit: 150 }}
            onEnter={this.handleChildTransitionEnter}
            onExited={this.handleChildTransitionExited}
            classNames="ct-fade-children"
          >
            {this.renderChildNodes()}
          </CSSTransition>
        </TransitionGroup>
      </div>
    );
  }
}

ConfigurationTree.propTypes = {
  onNodeClick: PropTypes.func.isRequired,
};

export default ConfigurationTreeDepthController(ConfigurationTree);
