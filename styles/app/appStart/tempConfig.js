app.constant('tempConfig',
{
    hashurl: {
        issue: '/issue/:type/:validatorName',
    },
    controllers: {
       
        issueCtrl: 'issueCtrl',
    },
    getTemplate: function (tmplname) {
        return "Templates/" + tmplname + ".html?_=" + Math.random();
    }
});