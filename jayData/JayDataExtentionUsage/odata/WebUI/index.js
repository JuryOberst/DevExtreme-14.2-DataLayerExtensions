window.WebUI = window.WebUI || {};

$(function () {
    // Uncomment the line below to disable platform-specific look and feel and to use the Generic theme for all devices
    DevExpress.devices.current({ platform: "generic" });
    // To customize the Generic theme, use the DevExtreme Theme Builder (http://js.devexpress.com/ThemeBuilder)
    // For details on how to use themes and the Theme Builder, refer to the http://js.devexpress.com/Documentation/Howto/Themes article

    document.addEventListener("deviceready", onDeviceReady, false);

    function onDeviceReady() {
        navigator["splashscreen"].hide();
        if (window.devextremeaddon != null) {
            window.devextremeaddon.setup();
        }
        document.addEventListener("backbutton", onBackButton, false);
    }

    function onBackButton() {
        DevExpress.processHardwareBackButton();
    }

    function onNavigatingBack(e) {
        if (e.isHardwareButton && !WebUI.app.canBack()) {
            e.cancel = true;
            exitApp();
        }
    }

    function exitApp() {
        switch (DevExpress.devices.real().platform) {
            case "tizen":
                window["tizen"].application.getCurrentApplication().exit();
                break;
            case "android":
                navigator["app"].exitApp();
                break;
            case "win8":
                window.external.Notify("DevExpress.ExitApp");
                break;
        }
    }

    WebUI.app = new DevExpress.framework.html.HtmlApplication({
        namespace: WebUI,
        layoutSet: DevExpress.framework.html.layoutSets[WebUI.config.layoutSet],
        navigation: WebUI.config.navigation,
        commandMapping: WebUI.config.commandMapping
    });

    WebUI.app.router.register(":view/:id", { view: "about", id: undefined });
    WebUI.app.on("navigatingBack", onNavigatingBack);
    WebUI.app.navigate();
});
