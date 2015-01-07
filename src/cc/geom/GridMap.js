goog.require("sc.core.Maths");
goog.require("sc.geom.Point");

goog.provide("cc.geom.GridMap");
goog.scope(function ()
{
	var GridMap = cc.geom.GridMap;
	var Maths = sc.core.Maths;
	var Point = sc.geom.Point;

	var YX_RATIO = 13 / 32;

	GridMap.VIRTUAL_CELL_WIDTH = 12;
	GridMap.VIRTUAL_CELL_HEIGHT = GridMap.VIRTUAL_CELL_WIDTH * YX_RATIO;

	GridMap.numberOfHorizontalTiles = 1;
	GridMap.numberOfVerticalTiles = 1;

	GridMap.paddingX = 0;
	GridMap.paddingY = 0;

	/**
	 *
	 * @param {sc.geom.Point} point
	 *
	 * @return {sc.geom.Point}
	 */
	GridMap.cellToPoint = function (point)
	{
		var middle = GridMap.numberOfHorizontalTiles / 2;
		var tempX = point.x + GridMap.paddingX;
		var tempY = point.y + GridMap.paddingY;
		return new Point(
			(middle + (tempX - tempY) / 2) * GridMap.VIRTUAL_CELL_WIDTH,
			(tempX + tempY) / 2 * GridMap.VIRTUAL_CELL_HEIGHT
		);
	};

	/**
	 *
	 * @param {sc.geom.Point} point
	 *
	 * @return {sc.geom.Point}
	 */
	GridMap.pointToCell = function (point)
	{
		var middle = GridMap.numberOfHorizontalTiles / 2;
		var virtualX = point.x / GridMap.VIRTUAL_CELL_WIDTH;
		var virtualY = point.y / GridMap.VIRTUAL_CELL_HEIGHT;
		return new Point(
			virtualY + virtualX - middle - GridMap.paddingX,
			virtualY - virtualX + middle - GridMap.paddingY);

		// y + x - m - mx - fx
		// y - x + m - my - fy
		// x = m + (mx - my + fx - fy) / 2
		// y = (mx + my + fx + fy) / 2
	};

	/**
	 *
	 * @param {number} width
	 * @param {number} height
	 */
	GridMap.setUp = function (width, height)
	{
		GridMap.numberOfHorizontalTiles = width / GridMap.VIRTUAL_CELL_WIDTH;
		GridMap.numberOfVerticalTiles = height / GridMap.VIRTUAL_CELL_HEIGHT;
		GridMap.paddingX = 0;
		GridMap.paddingY = 0;
		var left = GridMap.pointToCell(new Point(0, 0));
		var right = GridMap.pointToCell(new Point(width, 0));
		GridMap.paddingX = left.x;
		GridMap.paddingY = right.y;
	};
});