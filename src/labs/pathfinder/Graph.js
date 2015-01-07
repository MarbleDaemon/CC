goog.require("sc.globals");
goog.require("sc.core.ObjectUtils");
goog.require("sc.core.Utils");
goog.require("sc.geom.Segment");
goog.require("sc.html.IDOMCanvasElement");

goog.require("labs.pathfinder.ILink");
goog.require("labs.pathfinder.INode");
goog.require("labs.pathfinder.Link");
goog.require("labs.pathfinder.Node");
goog.require("labs.pathfinder.Obstacle");

goog.provide("labs.pathfinder.Graph");
goog.scope(function ()
{
	var globals = sc.globals;

	var ArrayUtils = sc.core.ArrayUtils;
	var Link = labs.pathfinder.Link;
	var Node = labs.pathfinder.Node;
	var ObjectUtils = sc.core.ObjectUtils;
	var Segment = sc.geom.Segment;
	var TypedArrayUtils = sc.core.TypedArrayUtils;

	/**
	 * @constructor
	 */
	labs.pathfinder.Graph = goog.defineClass(null, {
		/**
		 *
		 * @param {Array<labs.pathfinder.Obstacle>} obstacles
		 */
		constructor: function (obstacles)
		{
			var thi$ = this;
			/**
			 *
			 * @type {Array<labs.pathfinder.Link>}
			 */
			this.links = [];

			/**
			 *
			 * @type {Array<labs.pathfinder.Node>}
			 */
			this.nodes = [];

			/**
			 *
			 * @type {Array.<labs.pathfinder.Obstacle>}
			 */
			this.obstacles = obstacles;

			/**
			 *
			 * @type {sc.html.IDOMCanvasElement}
			 */
			this.output = null;

			TypedArrayUtils.forEachItem(obstacles, function (obstacle)
			{
				/**
				 * @type {labs.pathfinder.Node}
				 */
				var firstNode = null;

				/**
				 * @type {labs.pathfinder.Node}
				 */
				var previousNode = null;

				/**
				 *
				 * @type {Array<labs.pathfinder.Node>}
				 */
				var nodes = [];

				TypedArrayUtils.forEachItem(obstacle.vertices, function (vertex)
				{
					var node = new Node(globals.UID++, vertex);

					if (!firstNode)
					{
						firstNode = node;
					}

					//ArrayUtils.push(nodes, node);
					node.color = node.isConcave ? [255, 127, 127] : [0x33, 0xff, 0x33];
					if (!node.isConcave)
					{
						thi$.findNodeLineOfSight(node);
						/*TypedArrayUtils.forEachItem(thi$.nodes, function (otherNode)
						 {
						 if (!otherNode.isConcave)
						 {
						 var segment = new Segment(node, otherNode);
						 if (_checkSegment(segment, obstacles))
						 {
						 ArrayUtils.push(thi$.links, new Link(node, otherNode));
						 }
						 }
						 });*/
					}

					if (previousNode)
					{
						(!previousNode.isConcave) && (!node.isConcave) && ArrayUtils.push(thi$.links, new Link(previousNode, node));
					}

					ArrayUtils.push(nodes, node);

					previousNode = node;
				});

				var lastNode = ArrayUtils.lastEntry(nodes);
				TypedArrayUtils.forEachItem(nodes, function (node, index)
				{
					if (node.isConcave)
					{
						var previous = index == 0 ? lastNode : nodes[index - 1];
						var next = node == lastNode ? nodes[0] : nodes[index + 1];
						var segment = new Segment(previous, next);
						if (thi$.checkSegment(segment))
						{
							ArrayUtils.push(thi$.links, new Link(previous, next));
						}
					}
				});

				ArrayUtils.push(thi$.links, new Link(previousNode, firstNode));

				thi$.nodes = ArrayUtils.concat(thi$.nodes, nodes);
			});
		},

		/**
		 *
		 * @param {sc.geom.IPoint} point
		 *
		 * @return {labs.pathfinder.INode}
		 */
		addPoint: function (point)
		{
			var node = new Node(globals.UID++, point);

			this.findNodeLineOfSight(node);

			ArrayUtils.push(this.nodes, node);

			return node;
		},

		/**
		 *
		 * @param {sc.geom.ISegment} segment
		 *
		 * @return {boolean}
		 */
		checkSegment: function (segment)
		{
			return (TypedArrayUtils.forEachItem(this.obstacles, function (obstacle)
			{
				return obstacle.intersectSegment(segment);
			}) !== false)
		},

		/**
		 *
		 * @param {labs.pathfinder.INode} node
		 *
		 * @return {labs.pathfinder.Graph}
		 */
		removeNode: function (node)
		{
			if (ArrayUtils.contain(this.nodes, node))
			{
				var thi$ = this;

				ObjectUtils.forEachItem(node.links,
					/**
					 *
					 * @param {labs.pathfinder.ILink} link
					 */
					function (link)
					{
						var otherNode = link.getOtherNode(node);
						delete otherNode.links[node.id];
						ArrayUtils.removeItem(thi$.links, link);
					});

				ArrayUtils.removeItem(this.nodes, node);
			}

			return this;
		},

		/**
		 *
		 * @param {labs.pathfinder.INode} node
		 *
		 * @return {labs.pathfinder.Graph}
		 */
		findNodeLineOfSight: function (node)
		{
			var thi$ = this;

			TypedArrayUtils.forEachItem(this.nodes, function (otherNode)
			{
				if ((node != otherNode) && !otherNode.isConcave)
				{
					var segment = new Segment(node, otherNode);
					if (thi$.checkSegment(segment))
					{
						ArrayUtils.push(thi$.links, new Link(node, otherNode));
					}
				}
			});

			return this;
		},

		/**
		 *
		 * @param {number=} red
		 * @param {number=} green
		 * @param {number=} blue
		 *
		 * @return {labs.pathfinder.Graph}
		 */
		render: function (red, green, blue)
		{
			var thi$ = this;
			if (this.output)
			{
				this.output.context2D.clear();

				TypedArrayUtils.forEachItem(this.links, function (link)
				{
					link.render(thi$.output, red, green, blue);
				});

				TypedArrayUtils.forEachItem(this.nodes, function (node)
				{
					/*ObjectUtils.forEachItem(node.links, function (link)
					 {
					 link.render(thi$.output, red, green, blue);
					 });*/

					node.render(thi$.output);
				});
			}

			return this;
		}
	})
});