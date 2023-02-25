() => {
    var ImageMap = function (map, img) {
        var n,
            areas = map.getElementsByTagName('area'),
            len = areas.length,
            coords = [],
            previousWidth = 2048;
        for (n = 0; n < len; n++) {
            coords[n] = areas[n].coords.split(',');
        }
        this.resize = function () {
            var n, m, clen,
                x = img.offsetWidth / previousWidth;
            for (n = 0; n < len; n++) {
                clen = coords[n].length;
                for (m = 0; m < clen; m++) {
                    coords[n][m] *= x;
                }
                areas[n].coords = coords[n].join(',');
            }
            previousWidth = document.body.clientWidth;
            return true;
        };
        window.onresize = this.resize;
    },
        imageMap = new ImageMap(document.getElementById('body-map'), document.getElementById('map-img'));
    imageMap.resize();
    imageMap = new ImageMap(document.getElementById('head-map-target'), document.getElementById('head-img'));
    imageMap.resize();
    imageMap = new ImageMap(document.getElementById('just-body-map-target'), document.getElementById('just-body-img'));
    imageMap.resize();
    return;
}

$(".body-area").click((e) => {
    e.preventDefault()
    var target = $(e.currentTarget).attr("title")
    console.log(target)
    if (target == "Head") {
        $("#head").show()
        $("#whole-body").hide()
    }
    if (target == "Body") {
        $("#body").show()
        $("#whole-body").hide()
    }

})

