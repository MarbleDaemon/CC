goog.require("sc.constants");
goog.require("sc.globals");
goog.require("sc.html.DOM");

goog.provide("dxp.xmedia.Facebook");

goog.scope(function ()
{
	var constants = sc.constants;
	var globals = sc.globals;

	var DOM = sc.html.DOM;

	var FB_ASYNC_INIT = "fbAsyncInit";

	var document = globals.document;
	var window = globals.window;

	/**
	 * @constructor
	 */
	dxp.xmedia.Facebook = goog.defineClass(null, {
		constructor: function ()
		{
			window[FB_ASYNC_INIT] = function ()
			{
				var APP_ID = window['APP_ID'];
				var FILE = window['FILE'];

				window[FB_ASYNC_INIT] = undefined;
				delete (window[FB_ASYNC_INIT]);

				var selectedTarget;

				/**
				 * @type {NodeList|*}
				 */
				var allElements = document.getElementsByTagName("*");
				for (var count = 0, length = allElements[constants.LENGTH]; count < length; ++count)
				{
					/**
					 * @type {HTMLElement}
					 */
					var element = allElements[count];
					if (element.id && !window['hasOwnProperty'](element.id))
					{
						window[element.id] = allElements[count];
					}
				}

				/**
				 * @type {HTMLButtonElement}
				 */
				var btn_share = /** @type {HTMLButtonElement} */(DOM._getById('btn_share'));
				/**
				 * @type {HTMLDivElement}
				 */
				var ctn_content = /** @type {HTMLDivElement} */(DOM._getById('ctn_content'));
				/**
				 * @type {HTMLDivElement}
				 */
				var ctn_loader = /** @type {HTMLDivElement} */(DOM._getById('ctn_loader'));
				/**
				 * @type {HTMLDivElement}
				 */
				var ctn_targets = /** @type {HTMLDivElement} */(DOM._getById('ctn_targets'));
				/**
				 * @type {HTMLImageElement}
				 */
				var img_photo = /** @type {HTMLImageElement} */(DOM._getById('img_photo'));
				/**
				 * @type {HTMLImageElement}
				 */
				var img_user = /** @type {HTMLImageElement} */(DOM._getById('img_user'));
				/**
				 * @type {HTMLElement}
				 */
				var lbl_shareState = /** @type {HTMLElement} */(DOM._getById('lbl_shareState'));
				/**
				 * @type {HTMLElement}
				 */
				var lbl_target = /** @type {HTMLElement} */(DOM._getById('lbl_target'));
				/**
				 * @type {HTMLUListElement}
				 */
				var lst_targets = /** @type {HTMLUListElement} */(DOM._getById('lst_targets'));
				/**
				 * @type {HTMLDivElement}
				 */
				var sel_target = /** @type {HTMLDivElement} */(DOM._getById('sel_target'));
				/**
				 * @type {HTMLTextAreaElement}
				 */
				var tbx_message = /** @type {HTMLTextAreaElement} */(DOM._getById('tbx_message'));

				FB.init(
					{
						'appId':                APP_ID,
						'cookie':               true, // Enable cookies to allow the server to access the session
						'frictionlessRequests': true,
						'status':               true, // Check Facebook Login status
						'version':              'v2.0',
						'xfbml':                false // Do not look for social plugins on the page
					});

				var CONNECTED = "connected";

				var addTargets;

				/**
				 *
				 * @param {Object} response
				 */
				function onAuthResponseChange(response)
				{
					if (response['status'] === CONNECTED)
					{
						img_user.src = ["http://graph.facebook.com", response['authResponse']['userID'], "picture"].join('/');

						createTargetList();

						FB.api("/me/accounts",
							{}, function (response)
							{
								addTargets(response['data'], "Pages");
							});

						/*FB.api("/me/likes",
						 {
						 }, function (response)
						 {
						 addTargets(response.data, "Pages I like");
						 });*/

						/*FB.api("/me/groups",
						 {
						 }, function (response)
						 {
						 addTargets(response.data, "Groups");
						 });*/

						showForm();
					}
					else//if (response.status === NOT_AUTHORIZED)
					{
						FB.login(onAuthResponseChange,
							{
								'scope': 'manage_pages,publish_actions,publish_stream,user_groups,user_likes'
							});
					}
				}

				function base64ToBlob(base64Data, mime)
				{
					var byteString = window.atob(base64Data);

					var ia = new Uint8Array(byteString.length);
					for (var i = 0; i < byteString.length; i++)
					{
						ia[i] = byteString.charCodeAt(i);
					}

					var blob = new Blob([ia],
						{
							type: mime
						});

					return blob;
				}

				function createTargetList()
				{
					lbl_target.onclick = toggleTargetList;

					var ids = {};

					/**
					 * @type {HTMLElement}
					 */
					var lastSelected = null;

					/**
					 *
					 * @param {Object} target
					 * @param {?boolean=} selected
					 */
					function addTarget(target, selected)
					{
						/**
						 * @type {HTMLElement|Element}
						 */
						var item = document.createElement("li");
						item.className = "MenuItem";
						item.innerHTML = '<a class="ItemAnchor"><span class="ItemLabel">' + target['name'] + '</span></a>';
						item.onclick = /** @this {HTMLElement} */((function (target)
						{
							if (lastSelected)
							{
								lastSelected.className = "MenuItem";
							}

							lastSelected = this;

							this.className = "MenuItem Checked";

							selectedTarget = target;
							lbl_target.innerHTML = target['name'];

							closeTargetList();
						}).bind(item, target));
						if (selected)
						{
							item.onclick();
						}

						lst_targets.appendChild(item);

						ids[target.id] = item;
					}

					addTargets = function (targets, title)
					{
						title = title || "";

						var targetsToAdd = targets.filter(function (target)
						{
							return !ids.hasOwnProperty(target.id);
						});

						if (targetsToAdd.length > 0)
						{
							addSeparator(title);

							for (var count = 0; count < targetsToAdd.length; count++)
							{
								var target = targetsToAdd[count];
								addTarget(target);
							}
						}
					}

					function addSeparator(title)
					{
						/**
						 * @type {HTMLElement|Element}
						 */
						var item = document.createElement("li");
						item.className = "MenuSeperator";
						item.innerHTML = '<b style="color: #aaa;">' + title + "</b>";
						lst_targets.appendChild(item);
					}

					addTarget({'id': "me", 'name': "My wall"}, true);
				}

				function closeTargetList()
				{
					sel_target.className = "Select";
				}

				function enableShare(enabled)
				{
					if (enabled)
					{
						lbl_shareState.className = "ShareButtonEnabled";
						btn_share.disabled = false;
					}
					else
					{
						lbl_shareState.className = "ShareButtonDisabled";
						btn_share.disabled = true;
						btn_share.onclick = null;
					}
				}

				function isBase64()
				{
					return FILE['isBase64'];
				}

				function onPublishOnPage(message)
				{
					ctn_content.style.display = "none";
					ctn_loader.style.display = "block";

					lbl_target.style.display = "none";
					closeTargetList();
					lbl_shareState.style.visibility = "hidden";

					if (isBase64())
					{
						var formData = new FormData();
						formData.append("access_token", selectedTarget.access_token || /** @type {string} */(FB.getAuthResponse()['accessToken']));
						formData.append("message", message);
						formData.append("no_story", "0");
						formData.append("source", base64ToBlob(FILE['content'], FILE['contentType']));

						window['$']['ajax'](
							{
								'url':         "https://graph.facebook.com/" + selectedTarget.id + "/photos?rand=" + Math.random(),
								'type':        "POST",
								'data':        formData,
								'processData': false,
								'contentType': false,
								'cache':       false,
								'success':     onSubmitComplete,
								'error':       function (shr, status, response)
								{
									var message = "";
									if (!response)
									{
										message = "Unable to connect to Facebook";
									}
									else if (response['error'])
									{
										message = response['error']['message'];
									}

									ctn_loader.innerHTML = '<span style="color: red;">' + message + '</span>';
									console.error("error " + response['data'] + " Status " + shr['status']);
								},
								'complete':    function ()
								{
								}
							});
					}
					else
					{
						FB['api']("/" + selectedTarget.id + "/photos", "post",
							{
								'access_token': selectedTarget['access_token'],
								'message':      message,
								'no_story':     0,
								'url':          FILE['url']
							}, onSubmitComplete);
					}
				}

				function onSubmitComplete(response)
				{
					btn_share.value = "Close";
					lbl_shareState.style.visibility = "visible";
					btn_share.onclick = function ()
					{
						window.open('', '_self').close();
					};

					if (response['error'])
					{
						ctn_loader.innerHTML = '<span style="color: red;">' + response['error']['message'] + '</span>';
					}
					else
					{
						ctn_loader.innerHTML = "Image uploaded.";
					}
				}

				function showForm()
				{
					if (FILE['isBase64'])
					{
						img_photo.src = "data:" + FILE['contentType'] + ";base64," + FILE['content'];
					}
					ctn_loader.style.display = "none";
					ctn_content.style.display = "block";
					tbx_message.value = "";
					tbx_message.focus();

					enableShare(true);
					btn_share.onclick = function ()
					{
						onPublishOnPage(tbx_message.value);
					};

					var closer;
					ctn_targets.onmouseout = sel_target.onmouseout = function ()
					{
						clearTimeout(closer);
						closer = setTimeout(closeTargetList, 200);
					};

					ctn_targets.onmouseover = sel_target.onmouseover = function ()
					{
						clearTimeout(closer);
					};
				}

				function toggleTargetList()
				{
					if (sel_target.className.indexOf("Open") != -1)
					{
						sel_target.className = "Select";
					}
					else
					{
						sel_target.className = "Select Open";
					}
				}

				FB.getLoginStatus(onAuthResponseChange);
				/*FB.login(onAuthResponseChange,
				 {
				 return_scopes : true,
				 scope : 'publish_actions,publish_stream,user_groups,user_likes'
				 });*/
			};

			(function (d, s, id)
			{
				/**
				 * @type {HTMLScriptElement}
				 */
				var js;
				var fjs = d.getElementsByTagName(s)[0];
				if (d.getElementById(id))
				{
					return;
				}

				js = /** @type {HTMLScriptElement} */(d.createElement(s));
				js.id = id;
				js.src = "//connect.facebook.net/en_US/all.js";
				fjs.parentNode.insertBefore(js, fjs);
			})(document, 'script', 'facebook-jssdk');
		}
	});

});