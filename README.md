.d-{value} for xs \
.d-{breakpoint}-{value} for sm, md, lg, xl, and xxl.

### No need grid system, viết thẳng vô class luônnnn

@col1: 100% / 12;

.layout\_\_top {
flex-basis: 3 \* @col1;
}

### Nếu min-width thì phải từ size nhỏ -> lớn

### Nếu max-width thì phải từ size lớn -> nhỏ (chọn cái này)

xài
.media-breakpoint-max(992px, {

})
