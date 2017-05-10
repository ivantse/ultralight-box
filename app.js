var LightboxApp = {
    IMAGES_PER_LOAD: 25,
    LOAD_OFFSET_THRESHOLD: 10,
    pageOffset: 1,
    totalImagesCount: 0,
    images: [],
    currentIndex: 0,
    isLoading: false,

    initialize: function(lightboxDiv) {
        let self = this;
        LightboxView.initialize(lightboxDiv, {
            leftClick: function(evt) {
                self.previousImage();
            },
            rightClick: function(evt) {
                self.nextImage();
            }
        });
        this.loadNextPageOfImages();
    },

    loadNextPageOfImages: function() {
        if (this.isLoading) {
            return;
        }
        this.isLoading = true;
        let self = this;
        FlickrApi.getPhotos(this.pageOffset, this.IMAGES_PER_LOAD, function(totalCount, lightboxImages) {
            self.images.push.apply(self.images, lightboxImages);
            self.totalImagesCount = totalCount;
            self.updateCurrentImage();
            self.pageOffset += 1;   // next page load will use the updated pageOffset
            self.isLoading = false;
        }, function(xhr) {
            alert('Could not load images from Flickr API.');
            self.isLoading = false;
        });
    },

    updateNavTitle: function() {
        let text = `${this.currentIndex+1} of ${this.totalImagesCount}`;
        LightboxView.setNavText(text);
    },

    updateNavButtons: function() {
        LightboxView.enableLeftArrow(this.canNavigateLeft());
        LightboxView.enableRightArrow(this.canNavigateRight());
    },

    updateCurrentImage: function() {
        let lightboxImage = this.images[this.currentIndex];
        LightboxView.setLightboxImage(lightboxImage);
        this.updateNavTitle();
        this.updateNavButtons();
    },

    hasMoreImagesToLoad: function() {
        return this.images.length != this.totalImagesCount;
    },

    shouldLoadNextPage: function() {
        if (this.hasMoreImagesToLoad()) {
            return this.currentIndex > this.images.length - this.LOAD_OFFSET_THRESHOLD - 1;
        }
        return false;
    },

    canNavigateLeft: function() {
        return this.currentIndex > 0;
    },

    canNavigateRight: function() {
        return this.currentIndex < this.images.length - 1;
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
        if (this.shouldLoadNextPage()) {
            this.loadNextPageOfImages();
        }
    },
};