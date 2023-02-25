window.onload = function () {
    localStorage.removeItem("part-search")
    $("#whole-body").show()
    $("#head").hide()
    $("#body").hide()
    $("#reset").hide()

    var ImageMap = function (map, img) {
        var n,
            areas = map.getElementsByTagName('area'),
            len = areas.length,
            coords = [],
            previousWidth = 900;
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
    return;
}

$(".body-area").on("click", (e) => {
    e.preventDefault()
    var target = $(e.currentTarget).attr("title")
    if (target == "Head") {
        $("#head").show()
        $("#whole-body").hide()
        $("#reset").show()

        var ImageMap = function (map, img) {
            var n,
                areas = map.getElementsByTagName('area'),
                len = areas.length,
                coords = [],
                previousWidth = 420;
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
            imageMap = new ImageMap(document.getElementById('head-map-target'), document.getElementById('head-img'));
        imageMap.resize();
    } else if (target == "Body") {
        $("#body").show()
        $("#whole-body").hide()
        $("#reset").show()

        var ImageMap = function (map, img) {
            var n,
                areas = map.getElementsByTagName('area'),
                len = areas.length,
                coords = [],
                previousWidth = 900;
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
            imageMap = new ImageMap(document.getElementById('just-body-map-target'), document.getElementById('just-body-img'));
        imageMap.resize();
    } else {
        console.log(target)
        localStorage.setItem("part-search", target)
    }

})

$("#reset").on("click", (e) => {
    e.preventDefault()
    window.location.reload()
})