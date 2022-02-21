
//global variable, for html page, refer tpsvr @ npm.
radio_group_tool = require("../radio-group-tool.js");

module.exports = {

	"radio_group_tool": function (done) {
		//.getValue(groupId)
		//.setValue(groupId, value)
		document.getElementById('divResult2').innerHTML =
			"<label id='group1'><input type='radio' checked value='a'></input>aaa</label><br>" +
			"<span id='group2'>" +
			"	<label><input type='radio' value='b'></input>bbb</label><br>" +
			"	<label><input type='radio' disabled value='c'></input>ccc</label><br>" +
			"	<label><input type='radio' value='d'></input>ddd</label><br>" +
			"</span>" +
			"<button onclick=\"alert(radio_group_tool.getValue('group1'))\">get</button>" +
			"<button onclick=\"alert(radio_group_tool.getValue('group2'))\">get2</button><br>" +
			"<button onclick=\"radio_group_tool.setValue('group1','c')\">set c</button>" +
			"<button onclick=\"radio_group_tool.setValue('group2','d')\">set d</button>" +
			"";

		//.init(groupArray [, defaultValue [, elGroup]] )
		var groupId = radio_group_tool.init(['group1', 'group2'], 'b');

		return 'ui test, groupId=' + groupId;
	},
	"radio_group_tool/2": function (done) {
		document.getElementById('divResult2').innerHTML =
			"<label id='group1'><input type='radio' value='a'></input>aaa</label><br>" +
			"<span id='group2'>" +
			"	<label><input type='radio' value='b'></input>bbb</label><br>" +
			"	<label><input type='radio' disabled value='c'></input>ccc</label><br>" +
			"	<label><input type='radio' value='d'></input>ddd</label><br>" +
			"</span>" +
			"<button onclick=\"alert(radio_group_tool.getValue('group1'))\">get</button>" +
			"<button onclick=\"alert(radio_group_tool.getValue('group2'))\">get2</button>" +
			"";

		var groupId = radio_group_tool(['group1', 'group2']);

		return 'ui test, groupId=' + groupId;
	},

};

// for html page
//if (typeof setHtmlPage === "function") setHtmlPage("title", "10em", 1);	//page setting
if (typeof showResult !== "function") showResult = function (text) { console.log(text); }

//for mocha
if (typeof describe === "function") describe('radio_group_tool', function () { for (var i in module.exports) { it(i, module.exports[i]).timeout(5000); } });
