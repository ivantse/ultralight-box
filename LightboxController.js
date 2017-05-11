class LightboxController {
    constructor(view, model) {
        this.LOAD_OFFSET_THRESHOLD = 10;
        this.currentIndex = 0;
        this.onPresented = function(){};
        this.onDismissed = function(){};

        this.view = view;
        this.model = model;

        let self = this;
        view.leftArrow.addEventListener('click', function() { self.previousImage(); });
        view.rightArrow.addEventListener('click', function() { self.nextImage(); });
        view.imgEl.addEventListener('click', function() { self.nextImage(); });
        view.overlayEl.addEventListener('click', function() { self.dismissView(); });
        model.onImagesLoadedHandlers.push(function() {
            self.updateCurrentImage();
        });
    }

    updateNavTitle() {
        let text = `${this.currentIndex+1} OF ${this.model.totalImagesCount}`;
        this.view.setNavText(text);
    }

    updateNavButtons() {
        // we don't want to show an arrow if we can't actually go in that direction
        this.view.enableLeftArrow(this.canNavigateLeft());
        this.view.enableRightArrow(this.canNavigateRight());
    }

    updateCurrentImage() {
        let lightboxImage = this.model.images[this.currentIndex];
        this.view.setLightboxImage(lightboxImage);
        this.updateNavTitle();
        this.updateNavButtons();
    }

    canNavigateLeft() {
        return this.currentIndex > 0;
    }

    canNavigateRight() {
        return this.currentIndex < this.model.images.length - 1;
    }

    presentWithIndex(index) {
        if (index >= this.model.images.length) {
            alert("Oops! You tried to select an image that isn't actualy there. Sorry about that!");
            return;
        }
        this.currentIndex = index;
        this.updateCurrentImage();
        this.view.show();
        this.onPresented();
    }

    dismissView() {
        this.view.hide();
        this.onDismissed();
    }

    previousImage() {
        if (!this.canNavigateLeft()) {
            return;
        }
        this.currentIndex -= 1;
        this.updateCurrentImage();
    }

    nextImage() {
        if (!this.canNavigateRight()) {
            return;
        }
        this.currentIndex += 1;
        this.updateCurrentImage();

        // if we're getting close to the last downloaded images, get the next page of images
        if (this._shouldLoadNextPage()) {
            this.model.loadNextPageOfImages();
        }
    }

    _shouldLoadNextPage() {
        if (this.model.hasMoreImagesToLoad()) {
            return this.currentIndex > this.model.images.length - this.LOAD_OFFSET_THRESHOLD - 1;
        }
        return false;
    }
}