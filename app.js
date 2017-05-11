class UltralightBoxApp {
    constructor(bodyEl, gridEl, lightboxEl, overlayEl) {
        let lightboxView = new LightboxView(lightboxEl, overlayEl);
        let model = new ImagesCollectionModel();
        let lightboxController = new LightboxController(lightboxView, model);

        // disable scrolling when lightbox is presented
        lightboxController.onPresented = function() { bodyEl.classList.add('scroll-disabled') };
        lightboxController.onDismissed = function() { bodyEl.classList.remove('scroll-disabled') };

        let gridView = new GridView(gridEl);
        gridView.onCellSelected = function(index) { lightboxController.presentWithIndex(index) };
        let gridController = new GridController(gridView, model);

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
        model.onImagesLoadedHandlers.push(loadMorePagesIfNeeded);

        model.loadNextPageOfImages();
    }
}