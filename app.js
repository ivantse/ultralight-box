function UltralightBoxApp(gridEl, lightboxEl, overlayEl) {
    let lightboxView = new LightboxView(lightboxEl, overlayEl);
    let model = new ImagesCollectionModel();
    let lightboxController = new LightboxController(lightboxView, model);
    lightboxController.initialize();

    let gridView = new GridView(gridEl);
    let gridController = new GridController(gridView, model);
    gridController.initialize({
        cellSelected: function(index) {
            lightboxController.openWithIndex(index);
        },
    });

    let SCROLL_THRESHOLD_OFFSET = 50;   // so we load the next images before we get to the bottom of window
    let loadMorePagesIfNeeded = function() {
        let gridElBottom = gridEl.getBoundingClientRect().bottom;
        let pastScrollThreshold = (gridElBottom - SCROLL_THRESHOLD_OFFSET <= window.innerHeight);
        if (pastScrollThreshold && model.hasMoreImagesToLoad()) {
            model.loadNextPageOfImages();
        }
    }

    // if user scrolls, check if we need to load more images
    window.onscroll = loadMorePagesIfNeeded;

    // after loading images, load more if we need to (like on first load)
    model.onImagesLoadedHandlers.push(function() {
        loadMorePagesIfNeeded();
    });
};

function GridController(view, model) {
    return {
        initialize: function(properties) {
            let cellSelected = properties['cellSelected'] || function(){};
            view.onCellSelected = cellSelected;
            model.onImagesLoadedHandlers.push(function(lightboxImages) {
                view.addCellsWithImages(lightboxImages);
            });
        },
    };
}