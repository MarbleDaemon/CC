{
	goog.require("sc.core.Utils");

	goog.require("template.ITemplate");
}
{
	goog.provide("template.Template");
}
goog.scope(function ()
{
	var FunctionUtils = sc.core.FunctionUtils;

	/**
	 * @constructor
	 * @implements {template.ITemplate}
	 * @extends {Object}
	 */
	template.Template = goog.defineClass(Object, {
		constructor: function ()
		{
			FunctionUtils.invoke(Object, this);
		}
	});
});