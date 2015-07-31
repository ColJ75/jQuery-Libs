/*
/* jquery.tpl.js - template plugin for jQuery
/* Colin Jaggs (c) 2013 Pin Digital Ltd
/* Allows a template of HTML to be used and bound to a json data source, for example using json data to find a list of object and bind them as a list, repeating the same block of HTML with field merge facility and conditional blocks
/* version 1.0

/*
/* example:
/* 
/* 

<script id="itemTpl" type="text/x-jquery-tmpl">
	<tr class="Prnt${ParentId}">
		<td>
			?{${ChildCount} > 0}
				<a href="javascript:;" class="branchToggle" title="expand" rel="${PageId}"><img src="<%= Components.Tools.Uri.FolderRoot %>Img/Tree/plus1.gif" alt="expand" title="expand" style="padding-left: ${Padding}px" /></a>
			{Else}
				<img src="<%= Components.Tools.Uri.FolderRoot %>Img/Tree/treebar2.gif" style="padding-left: ${Padding}px" />
			{End}
			${Path}
		</td>
		<td>${Alias}</td>
		<td>${LastModified}</td>
	</tr>
</script>

// do ajax call to get child nodes
$.ajax({
	url: FolderRoot + "Ajax.aspx?func=Admin.PageList&pageId=" + pageId,
	cache: false,
	dataType: "json",
	success: function (data)
	{
		$tr.after($("#itemTpl").tpl({ data: data.pages }));
	}
});

*/

$.fn.tpl = function(o)
{
	// set defaults and load preferred options
	var defaults =
	{
		tpl: $(this).html(),
		fieldPatt: "${}",
		data: []
	};
	o = $.extend({}, defaults, o || {});

	// find merge fields in the template
	var fields = o.tpl.match(/\${([^}]+)}/g);

	// loop through the data and repeate the template x number of times, and perform field merges along the way - return when done
	var html = "";
	for (var i = 0; i < o.data.length; i++)
	{
		var htmlLine = o.tpl;
		for (var j = 0; j < fields.length; j++)
		{
			value = eval('o.data[i].' + fields[j].replace(/^\${/, "").replace(/}$/, ""));
			htmlLine = htmlLine.replace(fields[j], (value == undefined) ? fields[j] : value);
		}
		html += htmlLine;
	}

	// now check for conditional html
	var conditions = html.match(/\?{([^}]+)}/g);
	if (conditions)
		for (var i = 0; i < conditions.length; i++)
		{
			// separate the html so we have the before, the condition and the after html
			var pre = html.substr(0, html.indexOf(conditions[i])); html = html.substr(pre.length + 1);
			var post = html.substr(html.indexOf("{End}") + 5); html = html.substr(0, html.length - post.length - 5);
			console.log(html);

			// separate the condition in to expression, true html and false html (if else is provided)
			var expr = conditions[i];
			var ifTrue = "", ifFalse = "";
			if (html.indexOf("{Else}") > -1)
			{
				ifFalse = html.substr(html.indexOf("{Else}") + 6);
				html = html.substr(0, html.indexOf("{Else}"));
			}
			ifTrue = html.substr(expr.length);
			html = pre + ((eval('(' + expr.replace(/^\?{/, "").replace(/}$/, "") + ')')) ? ifTrue : ifFalse) + post;
		}
	
	return html;
};
