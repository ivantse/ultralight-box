var LightboxView = {
    lightboxEl: null,
    navTextEl: null,
    imgEl: null,
    titleEl: null,
    leftArrow: null,
    rightArrow: null,

    initialize: function(lightboxEl, properties) {
        let leftClick = properties['leftClick'];
        let rightClick = properties['rightClick'];

        let imageWrapper = document.createElement('div');
        imageWrapper.setAttribute('id', 'img-wrapper');
        this.navTextEl = document.createElement('div');
        this.navTextEl.setAttribute('class', 'nav-text');
        this.imgEl = document.createElement('img');
        this.titleEl = document.createElement('div');
        this.titleEl.setAttribute('class', 'img-title');

        let leftArrow = document.createElement('a');
        leftArrow.setAttribute('class', 'nav-button');
        leftArrow.innerHTML = '&laquo;';
        leftArrow.addEventListener('click', leftClick);

        let rightArrow = document.createElement('a');
        rightArrow.setAttribute('class', 'nav-button');
        rightArrow.innerHTML = '&raquo;';
        rightArrow.addEventListener('click', rightClick);

        this.leftArrow = leftArrow;
        this.rightArrow = rightArrow;

        imageWrapper.appendChild(this.navTextEl);
        imageWrapper.appendChild(this.imgEl);
        imageWrapper.appendChild(this.titleEl);

        lightboxEl.appendChild(this.leftArrow);
        lightboxEl.appendChild(imageWrapper);
        lightboxEl.appendChild(this.rightArrow);

        this.lightboxEl = lightboxEl;
    },

    setLightboxImage: function(lightboxImage) {
        this.imgEl.setAttribute('src', lightboxImage.imageUrl);
        this.titleEl.innerHTML = lightboxImage.title;
        this.lightboxEl.style.opacity = 1; // default is 0, to avoid flicker at load
    },

    setNavText: function(text) {
        this.navTextEl.innerHTML = text;
    },

    enableLeftArrow(enable) {
        this._enableArrowButton(this.leftArrow, enable);
    },

    enableRightArrow(enable) {
        this._enableArrowButton(this.rightArrow, enable);
    },

    _enableArrowButton(arrowButton, enable) {
        if (enable) {
            arrowButton.classList.remove('disabled');
        } else {
            arrowButton.classList.add('disabled');
        }
    },
};