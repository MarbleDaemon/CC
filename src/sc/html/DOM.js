goog.require("sc.constants");
goog.require("sc.globals");
goog.require("sc.core.StringUtils");
goog.require("sc.html.IDOMElement");

goog.provide("sc.html.DOM");
goog.scope(function ()
{
	var constants = sc.constants;
	var globals = sc.globals;

	var DOM = sc.html.DOM;
	var StringUtils = sc.core.StringUtils;

	var DOCUMENT = globals.document;
	var WINDOW = globals.window;

	/**
	 *
	 * @private
	 * @type {Object}
	 */
	var _wrappers = {};

	DOM.ADD_EVENT_LISTENER = 'addEventListener';

	DOM.GET_ELEMENT_BY_ID = 'getElementById';

	DOM.HEIGHT = constants.HEIGHT;
	DOM.HTML_ELEMENT = "HTMLElement";

	DOM.STYLE = "style";

	DOM.TAG_CANVAS = "CANVAS";
	DOM.TAG_DIV = "DIV";
	DOM.TAG_IMG = "IMG";
	DOM.TAG_NAME = "tagName";

	DOM.WIDTH = constants.WIDTH;

	/**
	 *
	 * @param {string} tagName
	 * @param {function(new:sc.html.IDOMElement, (?|null)):undefined} wrapper
	 */
	DOM.addWrapper = function (tagName, wrapper)
	{
		_wrappers[StringUtils.toUpper(tagName)] = wrapper;
	};

	/**
	 *
	 * @param {string} tag
	 * @param {?(HTMLElement|sc.html.IDOMElement)=} parent
	 *
	 * @return {HTMLElement}
	 */
	DOM._create = function (tag, parent)
	{
		/**
		 * @type {HTMLElement}
		 */
		var element = /** @type {HTMLElement} */(DOCUMENT.createElement(tag));
		parent && ((parent instanceof WINDOW[DOM.HTML_ELEMENT]) ? parent : parent.element).appendChild(element);

		return element;
	};

	/**
	 *
	 * @param {string} id
	 *
	 * @return {HTMLElement}
	 */
	DOM._getById = function (id)
	{
		return DOCUMENT[DOM.GET_ELEMENT_BY_ID](id);
	};

	/**
	 *
	 * @param {string} id
	 *
	 * @return {sc.html.IDOMElement}
	 */
	DOM.getById = function (id)
	{
		return sc.html.DOM.wrap(sc.html.DOM._getById(id));
	};

	/**
	 *
	 * @param {string} query
	 * @param {?(Element|HTMLElement)=} baseElement
	 *
	 * @return {HTMLElement}
	 */
	DOM._query = function (query, baseElement)
	{
		return /** @type {HTMLElement} */((baseElement || DOCUMENT).querySelector(query));
	};

	/**
	 *
	 * @param {string} query
	 * @param {?(Element|HTMLElement|sc.html.IDOMElement)=} baseElement
	 *
	 * @return {sc.html.IDOMElement}
	 */
	DOM.query = function (query, baseElement)
	{
		var element = sc.html.DOM._query(query, /** @type {(Element|HTMLElement)} */(baseElement? (baseElement.element || baseElement): undefined));
		return element? sc.html.DOM.wrap(element): null;
	};

	/**
	 * @param {(HTMLElement|Element)} element
	 *
	 * @return {sc.html.IDOMElement}
	 */
	DOM.wrap = function (element)
	{
		/**
		 * @constructor
		 */
		var wrapper = _wrappers[StringUtils.toUpper(element[DOM.TAG_NAME])] || _wrappers[StringUtils.toUpper(DOM.TAG_NAME)];
		return /** @type {sc.html.IDOMElement} */(new wrapper(element));
	};
});
