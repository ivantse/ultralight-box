'use strict';

class LightboxView {
    constructor(lightboxEl, overlayEl) {
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

        this.overlayEl = overlayEl;
        this.lightboxEl = lightboxEl;
        this.leftArrow = leftArrow,
        this.rightArrow = rightArrow;
        this.imgEl = imgEl;
        this.titleEl = titleEl;
        this.navTextEl = navTextEl;
    }

    hide() {
        this.lightboxEl.style.display = 'none';
        this.overlayEl.style.display = 'none';
    }

    show() {
        this.lightboxEl.style.display = 'flex';
        this.overlayEl.style.display = 'block';
    }

    setLightboxImage(lightboxImage) {
        this.imgEl.setAttribute('src', lightboxImage.imageUrl);
        this.titleEl.innerHTML = lightboxImage.title;
    }

    setNavText(text) {
        this.navTextEl.innerHTML = text;
    }

    enableLeftArrow(enable) {
        this._enableArrowButton(this.leftArrow, enable);
    }

    enableRightArrow(enable) {
        this._enableArrowButton(this.rightArrow, enable);
    }

    _enableArrowButton(arrowButton, enable) {
        if (enable) {
            arrowButton.classList.remove('disabled');
        } else {
            arrowButton.classList.add('disabled');
        }
    }
}