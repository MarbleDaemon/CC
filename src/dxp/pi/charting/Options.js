goog.require("sc.core.ObjectUtils");

goog.provide("dxp.pi.charting.Options");
goog.scope(function ()
{
	var ObjectUtils = sc.core.ObjectUtils;

	/**
	 *
	 * @constructor
	 * @unrestricted
	 */
	dxp.pi.charting.Options = goog.defineClass(null, {
		constructor: function ()
		{
		},

		/**
		 *
		 * @param {Object.<string,?>} options
		 *
		 * @return {dxp.pi.charting.Options}
		 */
		configure: function (options)
		{
			var thi$ = this;

			ObjectUtils.forEachItem(options, function (value, key)
			{
				if (ObjectUtils.hasProperty(thi$, key))
				{
					thi$[key] = value;
					console.log(thi$[key], value);
				}
			});

			return this;
		}
	});
});
