$(function () {
    // Grab the data
    var data = [],
        axisx = [],
        axisy = [],
        stan = [],
        linia = [],
        table = $("#for-chart");
    $("tbody td", table).each(function (i) {
        data.push(parseFloat($(this).text(), 10));
        stan.push($(this).hasClass("open").toString());
        linia.push($(this).hasClass("linia").toString());
    });
    table.hide();
    $("tbody th", table).each(function () {
        axisy.push($(this).text());
    });
    $("tfoot th", table).each(function () {
        axisx.push($(this).text());
    });
    // Draw
    var width = 860,
        height = 300,
        leftgutter = 30,
        bottomgutter = 20,
        rightgutter = 20,
        r = Raphael("chart", width, height),
        txt = {"font": '10px Fontin-Sans, Arial', stroke: "none", fill: "#fff"},
        X = (width - leftgutter - rightgutter) / axisx.length,
        Y = (height - bottomgutter) / axisy.length,
        color = $("#chart").css("color");
        max = Math.round(X / 2) - 1;
    //r.rect(leftgutter, 0, width - leftgutter, height - bottomgutter, 5).attr({fill: "#666", stroke: "#AAA"});
    for (var i = 0, ii = axisx.length; i < ii; i++) {
        r.text(leftgutter + X * (i + .5), 294, axisx[i]).attr(txt);
    }
    for (var i = 0, ii = axisy.length; i < ii; i++) {
        r.text(10, Y * (i + .5), axisy[i]).attr(txt);
    }
    var o = 0;
    for (var i = 0, ii = axisy.length; i < ii; i++) {
        for (var j = 0, jj = axisx.length; j < jj; j++) {
            //var R = data[o] && Math.min(Math.round(Math.sqrt(data[o] / Math.PI) * 4), max);
            var R = data[o] && 11;
            if (R) {
                (function (dx, dy, R, value) {
                    var color = "hsb(" + [(1 - R / max) * .5, 1, .75] + ")";
                    if (stan[o] == "true") {
                        var dtatr = "none";
                    } else {
                        var dtatr = "#CF1919";
                    };

                    if (data[o] == "19") {
                        var dt = r.rect(dx + 60 , dy + 10 -R, 2*R, 2*R).attr({stroke: "#CF4040", "stroke-width": 3, fill: dtatr});
                    } else {
                        var dt = r.circle(dx + 60 + R, dy + 10, R).attr({stroke: "#CF4040", "stroke-width": 3, fill: dtatr});
                    };
                    
                    if (R < 6) {
                        var bg = r.circle(dx + 60 + R, dy + 10, 6).attr({stroke: "none", fill: "#000", opacity: .4}).hide();
                        //var path1 = ["m", dx + 60 , dy + 10, "l 14 0 l -7 10 z"].join(",");
                        //var bg1 = r.path(path1).attr({fill: "#333", stroke: "none", opacity: .8});
                    }
                    var lbl = r.text(dx + 80 + R, dy + 20, 'Q'+data[o] )
                            .attr({"font": '10px Fontin-Sans, Arial', stroke: "none", fill: "#fff"});
                    var dot = r.circle(dx + 60 + R, dy + 10, max).attr({stroke: "none", fill: "#000", opacity: 0});
                    
                    if (linia[o] == "true") {
                        var path2 = ["m", dx + 60 + R , dy - 18, "v 18"].join(",");
                    } else {
                        var path2 = ["m", dx + R/2 , dy + 10, "h 56", "m 10 -28 v 18"].join(",");
                    }
                    
                    var line = r.path(path2).attr({stroke: "#CF4040", "stroke-width": 3, "stroke-opacity": .8});
                    dot[0].onmouseover = function () {
                        if (bg) {
                            bg.show();
                        } else {
                            var clr = Raphael.rgb2hsb(color);
                            clr.b = .5;
                            dt.attr("fill", Raphael.hsb2rgb(clr).hex);
                        }
                        lbl.show();
                    };
                    dot[0].onmouseout = function () {
                        if (bg) {
                            bg.hide();
                        } else {
                            dt.attr("fill", dtatr);
                        }
                        //lbl.hide();
                    };
                })(leftgutter + X * (j + .5) - 60 - R, Y * (i + .5) - 10, R, data[o]);
            }
            o++;
        }
    }
});