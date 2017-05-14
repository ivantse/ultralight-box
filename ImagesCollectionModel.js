const IMAGES_PER_LOAD = 10;

class ImagesCollectionModel {
    constructor() {
        this.isLoading = false;
        this.pageOffset = 1;
        this.totalImagesCount = 0;
        this.images = [];
        this.onImagesLoadedHandlers = [];
        this.flickrApi = new FlickrApi(true);
    }

    loadNextPageOfImages() {
        if (this.isLoading) { return }
        this.isLoading = true;
        let self = this;
        this.flickrApi.getPhotos(this.pageOffset, IMAGES_PER_LOAD, function(totalCount, lightboxImages) {
            self.images.push.apply(self.images, lightboxImages);
            self.totalImagesCount = totalCount;
            self.pageOffset += 1;   // next page load will use the updated pageOffset
            self.isLoading = false;
            self._onImagesLoaded(lightboxImages);
        }, function(xhr) {
            alert('Could not load images from Flickr API.');
            self.isLoading = false;
        });
    }

    _onImagesLoaded(addedLightboxImages) {
        this.onImagesLoadedHandlers.forEach(function(handler) {
            handler(addedLightboxImages);
        }, this);
    }

    hasMoreImagesToLoad() {
        return this.images.length != this.totalImagesCount;
    }
}
