goog.require("sc.constants");
goog.require("sc.core.Utils");

goog.provide("sc.core.StringUtils");
goog.scope(function ()
{
	var ArrayUtils = sc.core.ArrayUtils;
	var StringUtils = sc.core.StringUtils;

	var LENGTH = sc.constants.LENGTH;

	/**
	 *
	 * @this {String}
	 *
	 * @param {RegExp|string} searchValue
	 * @param {string|Function} replaceValue
	 *
	 * @return {string}
	 */
	String.prototype.replace_ = "".replace;

	/**
	 *
	 * @this {(String|string)}
	 *
	 * @param {*=} separator
	 * @param {number=} [limit]
	 *?
	 * @return {Array<string>}
	 */
	String.prototype.split_ = "".split;

	/**
	 * @static
	 *
	 * @param {string} str
	 *
	 * @return {string}
	 */
	StringUtils.collapseWhiteSpace = function (str)
	{
		// Since IE doesn't include non-breaking-space (0xa0) in their \s character
		// class (as required by section 7.2 of the ECMAScript spec), we explicitly
		// include it in the regexp to enforce consistent cross-browser behavior.
		return str.replace_(/[\s\xa0]+/g, ' ').replace_(/^\s+|\s+$/g, '');
	};

	/**
	 * @static
	 *
	 * @param {string} hayStack
	 * @param {string} needle
	 *
	 * @return {boolean}
	 */
	StringUtils.contains = function (hayStack, needle)
	{
		return hayStack.indexOf(needle) > -1;
	};

	/**
	 * @static
	 *
	 * @param {string} str
	 *
	 * @return {number}
	 */
	StringUtils.hashCode = function (str)
	{
		var hash = 0, i, chr, len = str[LENGTH];
		if (0 == len) return hash;
		for (i = 0; i < len; i++)
		{
			chr = str.charCodeAt(i);
			hash = ((hash << 5) - hash) + chr;
			hash |= 0; // Convert to 32bit integer
		}

		return hash;
	};

	/**
	 * Checks if a string contains all letters.
	 *
	 * @static
	 *
	 * @param {string} str string to check.
	 *
	 * @return {boolean} True if {@code str} consists entirely of letters.
	 */
	StringUtils.isAlpha = function (str)
	{
		return !/[^a-zA-Z]/.test(str);
	};

	/**
	 * Checks if a string contains only numbers or letters.
	 *
	 * @static
	 *
	 * @param {string} str string to check.
	 *
	 * @return {boolean} True if {@code str} is alphanumeric.
	 */
	StringUtils.isAlphaNumeric = function (str)
	{
		return !/[^a-zA-Z0-9]/.test(str);
	};

	/**
	 * Checks if a string contains only numbers.
	 *
	 * @static
	 *
	 * @param {*} str string to check. If not a string, it will be casted to one.
	 *
	 * @return {boolean} True if {@code str} is numeric.
	 */
	StringUtils.isNumeric = function (str)
	{
		return !/[^0-9]/.test(str);
	};

	/**
	 * Checks if a string is empty.
	 * @link https://github.com/google/closure-library/blob/master/closure/goog/string/string.js
	 *
	 * @static
	 *
	 * @param {string} str The string to check.
	 *
	 * @return {boolean} Whether {@code str} is empty.
	 */
	StringUtils.isEmpty = function (str)
	{
		return str[LENGTH] == 0;
	};

	/**
	 * Checks if a string is empty or contains only whitespaces.
	 * @link https://github.com/google/closure-library/blob/master/closure/goog/string/string.js
	 *
	 * @static
	 *
	 * @param {string} str The string to check.
	 *
	 * @return {boolean} Whether {@code str} is empty or whitespace only.
	 */
	StringUtils.isEmptyOrWhitespace = function (str)
	{
		// testing length == 0 firstEntry is actually slower in all browsers (about the
		// same in Opera).
		// Since IE doesn't include non-breaking-space (0xa0) in their \s character
		// class (as required by section 7.2 of the ECMAScript spec), we explicitly
		// include it in the regexp to enforce consistent cross-browser behavior.
		return /^[\s\xa0]*$/.test(str);
	};

	/**
	 *
	 * @static
	 *
	 * @param {string} str
	 * @param {?} delimiter
	 * @param {number=} limit
	 *
	 * @return {Array}
	 */
	StringUtils.split = function (str, delimiter, limit)
	{
		return str ? str.split(delimiter, limit) : [];
	};

	/**
	 * Does simple python-style string substitution.
	 * subs("foo%s hot%s", "bar", "dog") becomes "foobar hotdog".
	 *
	 * @static
	 *
	 * @param {string} str The string containing the pattern.
	 * @param {...*} var_args The items to substitute into the pattern.
	 *
	 * @return {string} A copy of {@code str} in which each occurrence of {@code %s} has been replaced an argument from {@code var_args}.
	 */
	StringUtils.subs = function (str, var_args)
	{
		var splitParts = str.split_('%s');
		var returnString = '';

		var subsArguments = ArrayUtils.slice(arguments, 1);
		while (subsArguments[LENGTH] &&
			// Replace up to the lastEntry split part. We are inserting in the
			// positions between split parts.
			splitParts.length > 1)
		{
			returnString += ArrayUtils.shift(splitParts) + ArrayUtils.shift(subsArguments);
		}

		return returnString + ArrayUtils.join(splitParts, '%s'); // Join unused '%s'
	};

	/**
	 *
	 * @param {string} str
	 *
	 * @return {string}
	 */
	StringUtils.toUpper = function(str)
	{
		return str.toUpperCase();
	};
});
