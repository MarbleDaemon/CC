var fs = require('fs');
var srcFolder = "src/";
var input = srcFolder + "Core.js";
var output = "build/assembled.js";

var $ =
{
	get: function (fileName, callBack)
	{
		callBack(fs.readFileSync(srcFolder + fileName, 'utf8'));
	}
};

function Compiler(script)
{
	var STYLE_HEADER = "color:#000000; font-size: 14px; font-weight: bold;";
	var STYLE_TYPE_OK = "color:green;";
	var STYLE_TYPE_ERROR = "color:red;";
	var STYLE_TYPE_WARNING = "color:#996633;";
	var STYLE_BODY = "color:#333333;";

	var _externals = [];
	var _namespaces = [];
	var importsById =
	{
	};
	var importsByPath =
	{
	};
	var mainScript =
	{
	};
	var iid = 0;

	var showParsedContent = function (path)
	{
		console.log(importsByPath[path].parsed);
	};

	var showRawContent = function (path)
	{
		console.log(importsByPath[path].raw);
	};

	var createImportDesc = function (id, path)
	{
		var importDesc =
		{
			id: id,
			linked: false,
			path: path
		};

		importsById[id] = importsByPath[path] = importDesc;

		return importDesc;
	};

	var link = function ()
	{
		mainScript.textContent = linkScript(mainScript.textContent, "main", "");

		mainScript.textContent = _namespaces.join('\n') + "\n" + "goog.scope(function(){(function(" + _externals.join(',') + "){\n" + mainScript.textContent + "\n})(" + _externals.join(',') + ");});";

		fs.writeFile(output, mainScript.textContent);
	};

	var linkScript = function (scriptContent, linker, space)
	{
		//console.warn(space + "%cLinking " + linker, STYLE_TYPE_WARNING);
		//linker = "";
		scriptContent = scriptContent.replace(/#(\d+)#/g, function (match, id, offset, string)
		{
			var importDesc = importsById[id];

			if (!importDesc || !importDesc.content)
			{
				//console.log(space + "%c" + linker + " %cNOT FOUND %c", id, STYLE_HEADER, STYLE_TYPE_ERROR, STYLE_BODY);
				return "#" + id + "#";
			}

			if (importDesc.used)
			{
				//console.log(space + "%c" + linker + " %cIGNORE %c" + importDesc.path, STYLE_HEADER, STYLE_TYPE_ERROR, STYLE_BODY);
				return "";
			}
			else
			{
				//console.log(space + "%c" + linker + " %cIMPORT %c" + importDesc.path, STYLE_HEADER, STYLE_TYPE_OK, STYLE_BODY);

				importDesc.used = true;

				if (!importDesc.linked)
				{
					//console.log(space + "%c" + linker + " %cLINK %c" + importDesc.path, STYLE_HEADER, STYLE_TYPE_OK, STYLE_BODY);

					importDesc.content = linkScript(importDesc.content, importDesc.path, space + "\t");

					importDesc.linked = true;
				}
				else
				{
					//console.log(space + "%c" + linker + " %NO LINKING %c" + importDesc.path, STYLE_HEADER, STYLE_TYPE_ERROR, STYLE_BODY);
				}

				return "//******************************************** " + importDesc.path + "\n" + importDesc.content;
			}

			return "console.error('ERROR LOADING ' + importDesc? importDesc.path: id)";
		});

		return scriptContent;
	};

	var loadImports = function (scriptContent)
	{
		{
			var importDecoder = false;

			scriptContent = scriptContent.replace(/\/\/encodePath((.|\r\n)*?)\/\/\/encodePath/mg, function (match, code, piece, offset, string)
			{
				importDecoder = true;
				var encoder = new PathEncoder();
				eval(code);

				var result = 'decodePath("' + encoder.toString().replace(/\n/g, "\\n").replace(/\r/g, "\\r") + '")';
				return result;
			});

			if (importDecoder)
			{
				scriptContent = "// import sc/codec/PathDecoder\n" + scriptContent;
			}
		}

		{
			scriptContent = scriptContent.replace(/\/\/\[debug\]((.|\r\n)*?)\/\/\[\/debug\]/mg, function (match, code, piece, offset, string)
			{
				return "";
			});
		}

		{
			scriptContent = scriptContent.replace(/\/\/\s*namespace\s+(.*)[\r\n]+/g, function (match, namespace, offset, string)
			{
				return "goog.provide('" + namespace + "');\n";
			});
		}

		{
			scriptContent = scriptContent.replace(/goog.provide\("([^"]*)"\);/g, function (match, namespace, offset, string)
			{
				console.log(match);
				if (_namespaces.indexOf(match) == -1)
				{
					_namespaces.push(match);
				}

				return "\n";
			});
		}

		{
			scriptContent = scriptContent.replace(/\/\/\s*external\s+(.*)[\r\n]+/g, function (match, externals, offset, string)
			{
				externals = externals.split(',');
				externals.forEach(function(external)
				{
					if (_externals.indexOf(external) == -1)
					{
						_externals.push(external);
					}
				});

				return "";
			});
		}

		{
			scriptContent = scriptContent.replace(/\/\/\s*import\s+(.*)[\r\n]+/g, function (match, path, offset, string)
			{
				var id;

				if (importsByPath.hasOwnProperty(path))
				{
					id = importsByPath[path].id;
				}
				else
				{
					id = iid++;
					var importDesc = createImportDesc(id, path);

					//console.log("Load:", id, path);

					$.get(path + ".js", (function (id, path, content)
					{
						importsByPath[path].raw = content;
						content = loadImports(content);

						importsByPath[path].parsed = content;

						scriptImported(id, path, content);
					}).bind(null, id, path), "text");
				}

				return "#" + id + "#\n";
			});
		}

		return scriptContent;
	};

	var scriptImported = function (id, path, content)
	{
		//console.log("Loaded:", id, path);

		importsById[id].content = content;

		for (var scriptId in importsById)
		{
			if (!importsById[scriptId].hasOwnProperty('content'))
			{
				return;
			}
		}

		//link();
	};

	var startUpScript = function ()
	{
		return "";
	};

	mainScript.textContent = loadImports(fs.readFileSync(script, "utf8"));
	link();
}

function PathEncoder()
{
	var BEGIN_PATH = "B";
	var CLOSE_PATH = "Z";
	var CUBIC_BEZIER = "C";
	var FILL = "F";
	var GRADIENT = "G";
	var RADIAL_GRADIENT = "O";
	var HORIZONTAL_LINE = "H";
	var LINE = "L";
	var MOVE = "M";
	var QUADRATIC_BEZIER = "Q";
	var RESTORE = "R";
	var SAVE = "S";
	var VERTICAL_LINE = "V";

	var _commands = [];
	var _fillStyle = null;
	var _variables = [];

	var addCommand = function (commandId, params)
	{
		var command = _commands[_commands.length - 1];

		if (!command || command.id != commandId)
		{
			command = new CanvasCommand(commandId, []);

			_commands.push(command);
		}

		command.params.push([].splice.call(params, 0));
	};

	var GradientEncoder = function (a, b, c, d)
	{
		_variables.push(this);

		addCommand(GRADIENT, arguments);

		this.addColorStop = function (position, color)
		{
			var parts = color.replace("rgb(", "").replace(")", "").replace(/[\s\t]/g, "").split(',');
			parts.unshift(position);
			parts.push(1);
			addCommand(GRADIENT, parts);
		};
	};

	var RadialGradientEncoder = function (a, b, c, d)
	{
		_variables.push(this);

		addCommand(RADIAL_GRADIENT, arguments);

		this.addColorStop = function (position, color)
		{
			var parts = color.replace("rgb(", "").replace(")", "").replace(/[\s\t]/g, "").split(',');
			parts.unshift(position);
			parts.push(1);
			addCommand(GRADIENT, parts);
		};
	};

	cvs_beginPath = function ()
	{
		_commands.push(new CanvasCommand(BEGIN_PATH));
	};

	cvs_bezierCurves = function ()
	{
		var args = arguments;
		var shift = Array.prototype.shift.bind(args);
		while (args.length > 0)
		{
			cvs_bezierCurveTo(shift(), shift(), shift(), shift(), shift(), shift());
		}
	};

	cvs_bezierCurveTo = function ()
	{
		addCommand(CUBIC_BEZIER, arguments);
	};

	cvs_closePath = function ()
	{
		_commands.push(new CanvasCommand(CLOSE_PATH));
	};

	cvs_createLinearGradient = function (a, b, c, d)
	{
		var gradient = new GradientEncoder(a, b, c, d);

		return gradient;
	};

	cvs_createRadialGradient = function (a, b, c, d, e, f)
	{
		var gradient = new RadialGradientEncoder(a, b, c, d, e, f);

		return gradient;
	};

	cvs_fill = function ()
	{
		addCommand(FILL, []/*[_variables.indexOf(_fillStyle)]*/);
	};

	cvs_lines = function ()
	{
		var args = arguments;
		var shift = Array.prototype.shift.bind(args);
		while (args.length > 0)
		{
			cvs_lineTo(shift(), shift());
		}
	};

	cvs_lineTo = function ()
	{
		addCommand(LINE, arguments);
	};

	cvs_moveTo = function ()
	{
		addCommand(MOVE, arguments);
	};

	cvs_restore = function ()
	{
		_commands.push(new CanvasCommand(RESTORE));
	};

	cvs_save = function ()
	{
		_commands.push(new CanvasCommand(SAVE));
	};

	cvs_stroke = function ()
	{
	};

	cvs_fillStyle = function (value)
	{
		_fillStyle = value;
	};

	this.toString = function ()
	{
		//console.log("Encoding");

		var result = [];

		for (var count = 0; count < _commands.length; count++)
		{
			result.push(_commands[count].toString());
		}

		return result.join('');
	};
}

function CanvasCommand(id, params)
{
	this.id = id;
	this.params = params || [];

	function ab2str(buf)
	{
		return String.fromCharCode.apply(null, new Uint16Array(buf));
	}

	var encodeValues = function (values)
	{
		values = values.map(function (value)
		{
			var result = Math.round(value * 10);
			!result && ( result = 32767);
			return result;
		});

		return ab2str(values);
	};

	this.toString = function ()
	{
		var result = "" + id;

		var params = [];

		for (var count = 0; count < this.params.length; count++)
		{
			params.push(encodeValues(this.params[count]));
		}

		params = params.join('');

		result += ab2str([params.length + 255]) + params;

		//console.log(this.id, params.length);

		return result.replace(/\\/g, "\\\\").replace(/"/g, "\\\"");
	};
}

(function ()
{
	new Compiler(input);
})();

