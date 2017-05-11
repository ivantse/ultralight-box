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