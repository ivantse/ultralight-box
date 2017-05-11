function GridView(gridEl) {
    return {
        cellsCount: 0,

        addCellsWithImages: function(lightboxImages) {
            let self = this;
            var index = this.cellsCount;
            lightboxImages.forEach(function(lightboxImage) {
                let cell = self._buildCell(index, lightboxImage);
                gridEl.appendChild(cell);
                index += 1;
            }, this);
            this.cellsCount += lightboxImages.length;
        },

        onCellSelected: function(index){},

        _buildCell: function(index, lightboxImage) {
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
        },
    };
};