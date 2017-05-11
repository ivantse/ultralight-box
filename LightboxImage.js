'use strict';

class LightboxImage {
    constructor(properties) {
        this.thumbnailUrl = properties['thumbnailUrl'];
        this.imageUrl = properties['imageUrl'];
        this.title = properties['title'];
    }

    cacheImage() {
        let image = new Image();
        image.src = this.imageUrl;
    }
}