<%@ Page Language="C#" %>

<%@ Register TagPrefix="telerik" Namespace="Telerik.Web.UI" Assembly="Telerik.Web.UI" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>jQuery animations on RadGrid</title>

    <script type="text/javascript" src="jquery-1.2.6.pack.js"></script>

    <script type="text/javascript" src="jquery.bgpos.js"></script>

    <telerik:RadCodeBlock ID="RadCodeBlock1" runat="server">
        <style type="text/css">
	    #<%= RadGrid1.ClientID %> th
	    {
	        background: url(bg.jpg) repeat -20px 35px;
	     }
	    #<%= RadGrid2.ClientID %> th
	    {
	        background: url(bg2.jpg) repeat 0 0;
	     }
	    #<%= RadGrid3.ClientID %> th
	    {
	        background: url(bg3.jpg) repeat 0 0;
	     }
        </style>

        <script type="text/javascript">
            $(function(){
            
	            $('#<%= RadGrid1.ClientID %> th')
		            .css( {backgroundPosition: "-20px 35px"} )
		            .mouseover(function(){
			            $(this).stop().animate({backgroundPosition:"(-20px 94px)"}, {duration:700})
		            })
		            .mouseout(function(){
			            $(this).stop().animate({backgroundPosition:"(40px 35px)"}, {duration:500, complete:function(){
				            $(this).css({backgroundPosition: "-20px 35px"})
			            }})
		            })
		            
	            $('#<%= RadGrid2.ClientID %> th')
		            .css( {backgroundPosition: "0 0"} )
		            .mouseover(function(){
			            $(this).stop().animate({backgroundPosition:"(-150px 0)"}, {duration:700})
		            })
		            .mouseout(function(){
			            $(this).stop().animate({backgroundPosition:"(-300px 0)"}, {duration:500, complete:function(){
				            $(this).css({backgroundPosition: "0 0"})
			            }})
		            })
	            $('#<%= RadGrid3.ClientID %> th')
		            .css( {backgroundPosition: "0 0"} )
		            .mouseover(function(){
			            $(this).stop().animate({backgroundPosition:"(0 -250px)"}, {duration:700})
		            })
		            .mouseout(function(){
			            $(this).stop().animate({backgroundPosition:"(0 0)"}, {duration:700})
		            })
            });
        </script>

    </telerik:RadCodeBlock>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            <asp:ScriptManager ID="ScriptManager1" runat="server" />
            <telerik:RadGrid ID="RadGrid1" Width="400px" runat="server" DataSourceID="SqlDataSource1" />
            <br />
            <telerik:RadGrid ID="RadGrid2" Width="400px" runat="server" DataSourceID="SqlDataSource1" />
            <br />
            <telerik:RadGrid ID="RadGrid3" Width="400px" runat="server" DataSourceID="SqlDataSource1" />
            <br />
            <asp:SqlDataSource ID="SqlDataSource1" runat="server" ConnectionString="<%$ ConnectionStrings:NorthwindConnectionString %>"
                SelectCommand="SELECT TOP 5 [UserId], [FirstName], [LastName], [Email] FROM [User]">
            </asp:SqlDataSource>
        </div>
    </form>
</body>
</html>
