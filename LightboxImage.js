class LightboxImage {
    constructor(properties) {
        this.thumbnailUrl = properties['thumbnailUrl'];
        this.imageUrl = properties['imageUrl'];
        this.title = properties['title'];
    }

    cacheImage() {
        // setting src on an Image object saves into browser's cache
        // so next request to the same URL will not make network
        // request
        let image = new Image();
        image.src = this.imageUrl;
    }
}