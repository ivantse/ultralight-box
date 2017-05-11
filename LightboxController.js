function LightboxController(view, model) {
    return {
        LOAD_OFFSET_THRESHOLD: 10,
        currentIndex: 0,
        onPresented: function(){},
        onDismissed: function(){},

        // setting up view/model with events
        initialize: function() {
            let self = this;
            view.leftArrow.addEventListener('click', function() { self.previousImage(); });
            view.rightArrow.addEventListener('click', function() { self.nextImage(); });
            view.imgEl.addEventListener('click', function() { self.nextImage(); });
            view.overlayEl.addEventListener('click', function() { self.dismissView(); });
            model.onImagesLoadedHandlers.push(function() {
                self.updateCurrentImage();
            });
            model.loadNextPageOfImages();
        },

        updateNavTitle: function() {
            let text = `${this.currentIndex+1} OF ${model.totalImagesCount}`;
            view.setNavText(text);
        },

        updateNavButtons: function() {
            // we don't want to show an arrow if we can't actually go in that direction
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

        presentWithIndex: function(index) {
            if (index >= model.images.length) {
                alert("Oops! You tried to select an image that isn't actualy there. Sorry about that!");
                return;
            }
            this.currentIndex = index;
            this.updateCurrentImage();
            view.show();
            this.onPresented();
        },

        dismissView: function() {
            view.hide();
            this.onDismissed();
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

            // if we're getting close to the last downloaded images, get the next page of images
            if (this._shouldLoadNextPage()) {
                model.loadNextPageOfImages();
            }
        },

        _shouldLoadNextPage: function() {
            if (model.hasMoreImagesToLoad()) {
                return this.currentIndex > model.images.length - this.LOAD_OFFSET_THRESHOLD - 1;
            }
            return false;
        },
    };
}