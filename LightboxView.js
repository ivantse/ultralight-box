function LightboxView(lightboxEl, overlayEl) {
    let imageWrapper = document.createElement('div');
    imageWrapper.setAttribute('id', 'img-wrapper');
    let navTextEl = document.createElement('div');
    navTextEl.setAttribute('class', 'nav-text');
    let imgEl = document.createElement('img');
    let titleEl = document.createElement('div');
    titleEl.setAttribute('class', 'img-title');

    let leftArrow = document.createElement('a');
    leftArrow.setAttribute('class', 'nav-button');
    leftArrow.innerHTML = '&lsaquo;';

    let rightArrow = document.createElement('a');
    rightArrow.setAttribute('class', 'nav-button');
    rightArrow.innerHTML = '&rsaquo;';

    imageWrapper.appendChild(navTextEl);
    imageWrapper.appendChild(imgEl);
    imageWrapper.appendChild(titleEl);

    lightboxEl.appendChild(leftArrow);
    lightboxEl.appendChild(imageWrapper);
    lightboxEl.appendChild(rightArrow);

    return {
        overlayEl: overlayEl,
        leftArrow: leftArrow,
        rightArrow: rightArrow,
        imgEl: imgEl,

        hide: function() {
            lightboxEl.style.display = 'none';
            overlayEl.style.display = 'none';
        },

        show: function() {
            lightboxEl.style.display = 'flex';
            overlayEl.style.display = 'block';
        },

        setLightboxImage: function(lightboxImage) {
            imgEl.setAttribute('src', lightboxImage.imageUrl);
            titleEl.innerHTML = lightboxImage.title;
        },

        setNavText: function(text) {
            navTextEl.innerHTML = text;
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
};