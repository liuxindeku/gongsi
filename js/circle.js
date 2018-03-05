 function initcircle(jQuery) {
        jQuery.drawCircle = function(options) {
            var defaults = {
                elem: null,
                size: 0,
                start: null,
                end: null,
                endSucc: null
            };
            var opts = jQuery.extend({}, defaults, options);
            if (!opts.elem) {
                return;
            }
            var r = Raphael(opts.elem, 300, 252),
            rad = 80,
            init = true,
            speed = 5,
            z = null,
            circle= null,
            showda = 0,
            txt = null;
            color = "#f00";
            var tmptime = opts.end - opts.start,
            ds = null,
            dm = null,
            dh = null,
            dstop = null;

            if (opts.size === 0) {
                opts.color = "#cecece";
            } else {
                opts.color = getColor(opts.size) || "#000000";
            }


            function minit() {
                r.customAttributes.arc = function(value, total, R) {
                    var alpha = 360 / total * value,
                    a = (90 - alpha) * Math.PI / 180,
                    x = 150 + R * Math.cos(a),
                    y = 150 - R * Math.sin(a),
                    path;
                    if (total == value) {
                        path = [
                            ["M", 150, 150 - R],
                            ["A", R, R, 0, 1, 1, 149.99, 150 - R]
                        ];
                    } else {
                        path = [
                            ["M", 150, 150 - R],
                            ["A", R, R, 0, +(alpha > 180), 1, x, y]
                        ];
                    }
                    bpath = path;
                    return {
                        path: path
                    };
                };

                r.path().attr({
                    arc: [100, 100, rad],
                    'stroke-width': 15,
                    'stroke': "#cecece"
                });

                r.path().attr({
                    arc: [100, 100, 100],
                    'stroke-width': 2,
                    'stroke': "#cecece"
                });

                if(!!opts.size){
                    z = r.path().attr({
                        arc: [0.01, 100, rad],
                        'stroke-width': 15,
                        'stroke': opts.color,
                        'cursor': "pointer"
                    });

                    updateVal(opts.size, 100, 80, z, 2);
                }

                circle = r.circle(150, 150, 72);
                circle.attr("fill", "#fff");
                circle.attr("stroke", "none");
                circle.glow({
                    width: 4,
                    opacity: 0.2,
                    offsety: 3
                });


                txt = r.text(150, 150, opts.size + "%").attr({
                    font: "100 30px Arial",
                    fill: opts.color
                });

            };

            function dinit() {
                if (tmptime > 0) {
                    ds = parseInt(tmptime % 60);
                    dm = parseInt(tmptime / 60) % 60;
                    dh = parseInt(tmptime / 3600) % 24;

                    txt.remove();
                    txt = r.text(150, 150, dh + ":" + dm + ":" + ds).attr({
                        font: "100 30px Arial",
                        fill: opts.color
                    });
                    // txt.toFront();
                }

            };

            function playing() {
                dstop = setInterval(function() {
                    tmptime--;
                    if (tmptime <= 1) { !! opts.endSucc && opts.endSucc();
                        clearInterval(dstop);
                    } else {
                        dinit();
                    }
                    }, 1000);
            };

            function getColor(size) {
                var arr = [];
                for (var i = 0; i <= 255; i++) {
                    arr.push("rgb(" + i + "," + (255 - i) + ","+0+")");
                }
                return arr[parseInt(size * 2.55)];
            };

            function updateVal(value, total, R, hand, id) { 
                if (init) {
                    hand.animate({
                        arc: [value, total, R]
                        }, 2000, ">");
                } else {
                    if (!value || value == total) {
                        value = total;
                        hand.animate({
                            arc: [value, total, R]
                            }, 750, "bounce", function() {
                                hand.attr({
                                    arc: [0, total, R]
                                });
                        });
                    } else {
                        hand.animate({
                            arc: [value, total, R]
                            }, 750, "elastic");
                    }
                }
            };

            function mevents() {
                if(!!opts.size){
                    circle.click(function() {
                        if(showda==0) {
                            showda=1;
                            circle.attr("fill", "#eee");
                            z.animate({
                                'stroke-width': 40,
                                opacity: 0.75
                                }, 600, 'elastic');
                        }else{
                            showda=0;
                            circle.attr("fill", "#fff");
                            z.animate({
                                'stroke-width': 20,
                                opacity: 0.75
                                }, 600, 'elastic'); 
                        }
                        //txt.toFront();
                    }) ;
                }

            };
            minit();
            dinit();
            playing();
            mevents();
        };
    } 

