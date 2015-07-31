//
// Minitabs 0.1
// Requires jquery
//
//
// Usage :
//
// $("#container").minitabs([speed],[slide|fade]);
//

jQuery.fn.minitabs = function(speed, effect, firstEffect)
{
	id = "#" + this.attr('id')
	$(id + ">DIV").hide();
	$(id + ">UL>LI>A:first").addClass("current");

	// apply effect to first tab when loading
	var re = /([_\-\w]+$)/i;
	var target = $('#' + re.exec($(id + ">UL>LI:first>A").attr("href"))[1]);
	switch (firstEffect)
	{
		case 'fade':
			target.fadeIn(speed);
			break;
		case 'slide':
			target.fadeIn(speed);
			break;
		default:
			target.show(speed)
			break;
	}

	$(id + ">UL>LI>A").click(
		function()
		{
			$(id + ">UL>LI>A").removeClass("current");
			$(this).addClass("current");
			$(this).blur();
			var re = /([_\-\w]+$)/i;
			var target = $('#' + re.exec(this.href)[1]);
			var old = $(id + ">DIV");

			switch (effect)
			{
				case 'fade':
					old.fadeOut(speed).fadeOut(speed);
					target.fadeIn(speed);
					break;
				case 'slide':
					target.fadeOut(speed).fadeIn(speed);
					old.slideUp(speed);
					break;
				default:
					old.hide(speed);
					target.show(speed)
					break;
			}

			return false;
		}
	);
}

