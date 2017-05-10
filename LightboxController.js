function LightboxController(view, model) {
    return {
        currentIndex: 0,

        // setting up view/model with events
        initialize: function() {
            let self = this;
            view.leftArrow.addEventListener('click', function() {
                self.previousImage();
            });
            view.rightArrow.addEventListener('click', function() {
                self.nextImage();
            });
            model.onImagesLoaded = function() { 
                self.updateCurrentImage();
            };
            model.loadNextPageOfImages();
        },

        updateNavTitle: function() {
            let text = `${this.currentIndex+1} of ${model.totalImagesCount}`;
            view.setNavText(text);
        },

        updateNavButtons: function() {
            view.enableLeftArrow(this.canNavigateLeft());
            view.enableRightArrow(this.canNavigateRight());
        },

        updateCurrentImage: function() {
            let lightboxImage = model.images[this.currentIndex];
            view.setLightboxImage(lightboxImage);
            this.updateNavTitle();
            this.updateNavButtons();
        },

        canNavigateLeft: function() {
            return this.currentIndex > 0;
        },

        canNavigateRight: function() {
            return this.currentIndex < model.images.length - 1;
        },

        previousImage: function() {
            if (!this.canNavigateLeft()) {
                return;
            }
            this.currentIndex -= 1;
            this.updateCurrentImage();
        },

        nextImage: function() {
            if (!this.canNavigateRight()) {
                return;
            }
            this.currentIndex += 1;
            this.updateCurrentImage();
            if (model.shouldLoadNextPage(this.currentIndex)) {
                model.loadNextPageOfImages();
            }
        },
    };
}