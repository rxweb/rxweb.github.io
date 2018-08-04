$(document).ready(function () {
    debugger
	var urlParams = new URLSearchParams(location.search);
	var token = urlParams.get('token');
	var loginName = urlParams.get('loginName');
    if(token!=null)
    {
	    localStorage.setItem("token",token)
	    localStorage.setItem("loginName",loginName)
    }
    signInLink();
    var contentChildrens = $("#_content").children();
    var headingElement = contentChildrens[0];
    var contributors = '<span class="contributors-text">Contributors </span>';
    contributors += '<ul class="contributors" data-bi-name="contributors">';
    var docUrl = $("#docUrl")[0];
    var splitUri = docUrl.href.split("master/")[1]
    if(splitUri!=undefined){
    $.get("https://api.github.com/repos/rxweb/rxweb/commits?path=" + splitUri.replace(".md/",".md")).then(function (jsonResult) {
        var logins = [];
        for (var i = 0; i < jsonResult.length; i++) {
            if (logins.indexOf(jsonResult[i].author.login) == -1) {
                contributors += "<li>"
                contributors += '<a href="' + jsonResult[i].author.html_url + '" title="' + jsonResult[i].author.login + '" data-bi-name="contributorprofile"><img src="' + jsonResult[i].author.avatar_url + '&size=32"  alt="' + jsonResult[i].author.login + '" class="x-hidden-focus"></a>';
                contributors += "</li>"
                logins.push(jsonResult[i].author.login);
            }
        }
        contributors += "</ul>"
        $(headingElement).after(contributors);
    })
    }
    $(".card-body").click(function () {
        if ($(this).hasClass("in"))
            $(this).removeClass("in");
        else
            $(this).addClass("in");
    })
    $(headingElement).addClass("display-1");
    var paragraphElement = contentChildrens[1];
    $(paragraphElement).addClass("lead");
    $(".subnav").remove();
    
})

let jObject = {
    "alpha": ["DECORATOR", "STABLE"]
}
function signInLink () {
  if($('#signInLink').is(':visible')){
    var token = localStorage.getItem('token');
	var loginName = localStorage.getItem('loginName');
    if(token!=null){
        var link = "<a href='/index.html' title='"+loginName+"'>"+loginName+"</a>";
        $("#signInLink").html(link)
    }
  } else {
    setTimeout(signInLink, 500);
  }
}
