function LightboxImage(properties) {
    return {
        thumbnailUrl: properties['thumbnailUrl'],
        imageUrl: properties['imageUrl'],
        title: properties['title'],

        preloadImage: function() {
            let image = new Image();
            image.src = this.imageUrl;
        },
    };
};