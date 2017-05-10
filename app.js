function LightboxApp() {
    let self = this;
    let view = LightboxView(lightboxEl);
    let model = ImagesCollectionModel();
    let controller = LightboxController(view, model);
    controller.initialize();
};