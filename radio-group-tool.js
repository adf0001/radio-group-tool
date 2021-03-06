
// radio-group-tool @ npm, dom radio group tool.

/*
example:
	//don't set name attribute of radio control, to avoid outside name duplication.

	<label id='group1'><input type='radio' checked value='a'></input>aaa</label><br>
	<span id='group2'>
		<label><input type='radio' value='b'></input>bbb</label><br>
		<label><input type='radio' value='c' disabled></input>ccc</label><br>
	</span>

	//init radio group
	radio_group_tool.init(['group1','group2'],'b');
	//or
	radio_group_tool(['group1','group2'],'b');	//shortcut for .init()

	//get value
	assert(radio_group_tool.getValue('group1') === radio_group_tool.getValue('group2'));
*/

var ele = require("get-element-by-id");
var ele_id = require("ele-id");

var getSubRadios = function (el) {
	el = ele(el);
	return (el.tagName.toUpperCase() == "INPUT" && el.type == "radio") ? el :
		el.querySelectorAll("input[type='radio']");
}

var onRadioGroupClick = function () {
	this.checked = true;		//keep checked

	var groupId = this.getAttribute("ht-ui-radio-group");
	var elGroup = ele(groupId);
	var lastId = elGroup.getAttribute("ht-ui-radio-group-last");

	var thisId = ele_id(this);
	if (lastId == thisId) return;

	//uncheck last
	if (lastId) { ele(lastId).checked = false; }

	elGroup.setAttribute("ht-ui-radio-group-last", thisId);
}

//return groupId
//.init(groupArray [, defaultValue [, elGroup]] ) {
var init = function (groupArray, defaultValue, elGroup) {
	if (!(groupArray instanceof Array)) groupArray = [groupArray];

	//prepare group id
	if (!elGroup) elGroup = groupArray[0];
	var groupId = ele_id(ele(elGroup));

	var i, j, elList, elRadio, elSelected, idList = [];
	for (var i = 0; i < groupArray.length; i++) {
		elList = getSubRadios(groupArray[i]);

		for (j = 0; j < elList.length; j++) {
			elRadio = elList[j];
			if (!elSelected) elSelected = elRadio;	//if no defaultValue, select the 1st.

			elRadio.setAttribute("ht-ui-radio-group", groupId);
			elRadio.addEventListener("click", onRadioGroupClick);
			elRadio.checked = (elRadio.getAttribute("value") === defaultValue);
			if (elRadio.checked) elSelected = elRadio;

			idList.push(ele_id(elRadio));
		}
	}

	ele(elGroup).setAttribute("ht-ui-radio-id-list", idList.join(","));

	onRadioGroupClick.apply(elSelected);

	return groupId;
}

//groupId: any groupId or radio id
function getMainGroup(groupId) {
	var el = ele(groupId);
	var lastId = el.getAttribute("ht-ui-radio-group-last");
	if (lastId) return el;

	//try get from radio
	groupId = getSubRadios(el)[0].getAttribute("ht-ui-radio-group");
	return groupId ? ele(groupId) : null;
}

//groupId: any groupId or radio id
var getValue = function (groupId) {
	var elGroup = getMainGroup(groupId);
	if (!elGroup) return null;

	var lastId = elGroup.getAttribute("ht-ui-radio-group-last");
	if (!lastId) return null;

	return ele(lastId).getAttribute("value");
}

//groupId: any groupId or radio id
var setValue = function (groupId, value) {
	var elGroup = getMainGroup(groupId);
	if (!elGroup) return null;

	var idList = elGroup.getAttribute("ht-ui-radio-id-list").split(",");
	var i, imax = idList.length, el;
	for (i = 0; i < imax; i++) {
		el = ele(idList[i]);
		if (el.getAttribute("value") == value) {
			onRadioGroupClick.apply(el);
			break;
		}
	}
}

// module

module.exports = exports = init;

exports.init = init;
exports.getValue = getValue;
exports.setValue = setValue;
