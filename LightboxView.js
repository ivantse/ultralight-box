function LightboxView(lightboxEl, properties) {
    let imageWrapper = document.createElement('div');
    imageWrapper.setAttribute('id', 'img-wrapper');
    let navTextEl = document.createElement('div');
    navTextEl.setAttribute('class', 'nav-text');
    let imgEl = document.createElement('img');
    let titleEl = document.createElement('div');
    titleEl.setAttribute('class', 'img-title');

    let leftArrow = document.createElement('a');
    leftArrow.setAttribute('class', 'nav-button');
    leftArrow.innerHTML = '&laquo;';

    let rightArrow = document.createElement('a');
    rightArrow.setAttribute('class', 'nav-button');
    rightArrow.innerHTML = '&raquo;';

    imageWrapper.appendChild(navTextEl);
    imageWrapper.appendChild(imgEl);
    imageWrapper.appendChild(titleEl);

    lightboxEl.appendChild(leftArrow);
    lightboxEl.appendChild(imageWrapper);
    lightboxEl.appendChild(rightArrow);

    return {
        navTextEl: navTextEl,
        imgEl: imgEl,
        titleEl: titleEl,
        leftArrow: leftArrow,
        rightArrow: rightArrow,

        setLightboxImage: function(lightboxImage) {
            this.imgEl.setAttribute('src', lightboxImage.imageUrl);
            this.titleEl.innerHTML = lightboxImage.title;
            lightboxEl.style.opacity = 1; // default is 0, to avoid flicker at load
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
};