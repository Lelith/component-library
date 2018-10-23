import React from 'react';

export default function configurationTreeDepth(ConfigurationTree) {
  return class extends React.Component {
    constructor(props) {
      super(props);
    }

    getTreeDepth(nodes, depth = 1) {
      const rowNodes = nodes || this.props.nodes;
      const activeNode = rowNodes.find(node => node.active);
      const activeChildren = activeNode ? (activeNode.nodes || []) : [];
      const activeNormalChildren = activeChildren.filter(node => node.type !== 'Add');
      return (activeNode && activeNormalChildren.length)
        ? this.getTreeDepth(activeChildren, depth + 1)
        : depth;
    }

    getCurrentDepth() {
      return this.props.depth || 0;
    }

    render() {
      let { nodes } = this.props;
      let breadcrumbsProp = null;
      if (this.getCurrentDepth() === 0) {
        const treeDepth = this.getTreeDepth();
        const visibleDepth = Math.min(treeDepth, 3);
        let skipRows = treeDepth - visibleDepth;
        const breadcrumbs = [];
        while (skipRows) {
          const activeNode = nodes.find(node => node.active);
          breadcrumbs.push(activeNode.name);
          nodes = activeNode.nodes;
          skipRows -= 1;
        }
        breadcrumbsProp = breadcrumbs.length
          ? breadcrumbs.join(' / ')
          : 'Top level';
      }
      return <ConfigurationTree {...this.props} nodes={nodes} breadcrumbs={breadcrumbsProp} depth={this.getCurrentDepth() + 1} />;
    }
  };
}
