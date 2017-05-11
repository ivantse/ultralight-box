var FlickrApi = {
    API_KEY: '168abff2bd195fbc1105fe5252dfb3dc',
    PHOTOSET_ID: '72157626579923453',

    getPhotos: function(page, perPage, success, failure) {
        var url = `https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=${this.API_KEY}&photoset_id=${this.PHOTOSET_ID}&format=json&nojsoncallback=1&per_page=${perPage}&page=${page}`;
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onload = function() {
            if (this.readyState == 4 && this.status == 200) {
                let jsonResponse = JSON.parse(this.responseText);
                if (jsonResponse['stat'] == 'ok') {
                    let photoset = jsonResponse['photoset'];
                    let totalCount = photoset['total'];
                    let lightboxImages = photoset['photo'].map(function(obj) {
                        let farmId = obj['farm'];
                        let id = obj['id'];
                        let serverId = obj['server'];
                        let secret = obj['secret'];
                        return new LightboxImage({
                            imageUrl: `https://farm${farmId}.staticflickr.com/${serverId}/${id}_${secret}.jpg`,
                            title: obj['title'],
                        });
                    });
                    success(totalCount, lightboxImages);
                } else {
                    failure(jsonResponse['message']);
                }
            }
        };
        xhr.onerror = function() {
            failure(this);
        }
        xhr.send();
    },
}