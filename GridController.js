class GridController {
    constructor(view, model) {
        model.onImagesLoadedHandlers.push(function(lightboxImages) {
            view.addCellsWithImages(lightboxImages);
        });
    }
}