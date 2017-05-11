function ImagesCollectionModel() {
    return {
        IMAGES_PER_LOAD: 25,
        LOAD_OFFSET_THRESHOLD: 10,
        isLoading: false,
        pageOffset: 1,
        totalImagesCount: 0,
        images: [],
        onImagesLoadedHandlers: [],

        loadNextPageOfImages: function() {
            if (this.isLoading) {
                return;
            }
            this.isLoading = true;
            let self = this;
            FlickrApi.getPhotos(this.pageOffset, this.IMAGES_PER_LOAD, function(totalCount, lightboxImages) {
                self.images.push.apply(self.images, lightboxImages);
                self.totalImagesCount = totalCount;
                self.onImagesLoaded(lightboxImages);
                self.pageOffset += 1;   // next page load will use the updated pageOffset
                self.isLoading = false;
            }, function(xhr) {
                alert('Could not load images from Flickr API.');
                self.isLoading = false;
            });
        },

        onImagesLoaded: function(addedLightboxImages) {
            this.onImagesLoadedHandlers.forEach(function(handler) {
                handler(addedLightboxImages);
            }, this);
        },

        hasMoreImagesToLoad: function() {
            return this.images.length != this.totalImagesCount;
        },

        shouldLoadNextPage: function(currentIndex) {
            if (this.hasMoreImagesToLoad()) {
                return currentIndex > this.images.length - this.LOAD_OFFSET_THRESHOLD - 1;
            }
            return false;
        },
    }
};
