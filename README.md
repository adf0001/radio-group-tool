# radio-group-tool
dom radio group tool

# Install
```
npm install radio-group-tool
```

# Usage & Api
```javascript
var radio_group_tool = require("radio-group-tool");

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

```
