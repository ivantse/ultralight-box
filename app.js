function UltralightBoxApp(gridEl, lightboxEl, overlayEl) {
    let lightboxView = new LightboxView(lightboxEl, overlayEl);
    let model = new ImagesCollectionModel();
    let lightboxController = new LightboxController(lightboxView, model);
    lightboxController.initialize();

    let gridView = new GridView(gridEl, window);
    gridView.initialize();
    let gridController = new GridController(gridView, model);
    gridController.initialize({
        cellSelected: function(index) {
            lightboxController.openWithIndex(index);
        },
    });

    // FIXME: if window is scrolled past bottom of gridview then load more
};

function GridController(view, model) {
    return {
        initialize: function(properties) {
            let cellSelected = properties['cellSelected'] || function(){};
            view.onCellSelected = cellSelected;
            view.onScrolledBottomInsideWindow = function() {
                model.loadNextPageOfImages();
            };
            model.onImagesLoadedHandlers.push(function(lightboxImages) {
                view.addCellsWithImages(lightboxImages);
                if (view.isBottomInsideWindow()) {
                    model.loadNextPageOfImages();
                }
            });
        },
    };
}