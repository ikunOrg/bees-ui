import G6 from "@antv/g6";

// 初始化 G6 图实例
const graph = new G6.Graph({
  container: "container", // 图的容器
  width: 800,
  height: 600,
  layout: {
    type: "compactBox", // 紧凑树布局
    direction: "TB", // 从上到下
    getId: function (d) {
      return d.id;
    },
    getHeight: () => {
      return 16;
    },
    getWidth: () => {
      return 16;
    },
    getVGap: () => {
      return 10;
    },
    getHGap: () => {
      return 100;
    },
  },
  defaultNode: {
    size: 30,
    type: "rect",
    style: {
      fill: "#9EC9FF",
      stroke: "#5B8FF9",
    },
  },
  modes: {
    default: ["drag-canvas", "zoom-canvas"],
  },
});

// 样例数据
const data = {
  id: "root",
  children: [
    {
      id: "subTree1",
      children: [{ id: "leaf1" }, { id: "leaf2" }],
    },
    {
      id: "subTree2",
      children: [{ id: "leaf3" }, { id: "leaf4" }],
    },
  ],
};

graph.data(data);
graph.render();

// 点击节点，控制展开和收缩
graph.on("node:click", (evt) => {
  const item = evt.item;
  const model = item.getModel();

  if (!model.children || model.children.length === 0) return;

  model.collapsed = !model.collapsed;
  graph.setItemState(item, "collapsed", model.collapsed);

  // 重新布局
  graph.layout();
});

// 自定义节点的收缩/展开样式
graph.node(function (node) {
  return {
    label: node.id,
    labelCfg: {
      position: "right",
    },
    icon: {
      show: true,
      img: node.collapsed ? "expand-icon-url" : "collapse-icon-url",
    },
  };
});
