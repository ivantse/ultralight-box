'use strict';

class GridView {
    constructor(gridEl) {
        this.cellsCount = 0;
        this.onCellSelected = function(index){};
        this.gridEl = gridEl;
    }

    addCellsWithImages(lightboxImages) {
        let self = this;
        let index = this.cellsCount;
        lightboxImages.forEach(function(lightboxImage) {
            let cell = self._buildCell(index, lightboxImage);
            self.gridEl.appendChild(cell);
            index += 1;
        }, this);
        this.cellsCount += lightboxImages.length;
    }

    _buildCell(index, lightboxImage) {
        let self = this;
        let cell = document.createElement('div');
        cell.setAttribute('class', 'grid-cell');

        let imgEl = document.createElement('img');
        imgEl.setAttribute('class', 'grid-img');
        imgEl.setAttribute('src', lightboxImage.thumbnailUrl);
        cell.appendChild(imgEl);

        cell.addEventListener('click', function() {
            self.onCellSelected(index);
        });
        return cell;
    }
}