;(function () {
    /* youTube scripts */
    $(function () {
        //YT play buttons
        var play_ytBlock = $('.youtube-block__play-btn');
        //RUSSIA
        var play_monit_1 = $('.backstage-clips-block__group-item.--item_1');
        var play_monit_2 = $('.backstage-clips-block__group-item.--item_2');
        var play_monit_3 = $('.backstage-clips-block__group-item.--item_3');

        //USA
        var bodyEng = $('body').hasClass('english');
        var my_video_player;

        var showYouTube = function (code) {
            var htmlYouTube = '<div class="playVidBlock"><img src="img/pic/closeVid.png" alt="" class="closeVid"><iframe id="ytplayer" type="text/html" width="100%" height="100%" src="https://www.youtube.com/embed/' + code + '?autoplay=1&controls=0&disablekb=1&modestbranding=1&rel=0&showinfo=0&color=white&iv_load_policy=3&theme=light" frameborder="0"  allowfullscree></iframe></div>';

            $('body').prepend(htmlYouTube);


            var closeYouTube = function () {
                $('#ytplayer').remove();
                $('.playVidBlock').remove();
            }

            $('.playVidBlock .closeVid').one('click', function () {
                closeYouTube();
            });

        }
        var showFacebook = function (code) {
            var htmlFacebook = '<div class="playVidBlock"><img src="img/pic/closeVid.png" alt="" class="closeVid"><div  class="fb-video" data-href="https://www.facebook.com/S7AirlinesOfficial/videos/p.999214560157845/999214560157845/?type=3" data-width="100%" data-allowfullscreen="true"></div></div>';

            if ($('.playVidBlock').length == 0) {
                $('body').prepend(htmlFacebook);

                (function (d, s, id) {
                        var js, fjs = d.getElementsByTagName(s)[0];
                        if (d.getElementById(id)) {
                            return;
                        }
                        js = d.createElement(s);
                        js.id = id;
                        js.src = "//connect.facebook.net/en_US/sdk.js";
                        fjs.parentNode.insertBefore(js, fjs);
                    }

                (document, 'script', 'facebook-jssdk'));
                window.fbAsyncInit = function () {
                    FB.init({
                        xfbml: true,
                        version: 'v2.5'
                    });

                    FB.Event.subscribe('xfbml.ready', function (msg) {
                        if (msg.type === 'video') {
                            my_video_player = msg.instance;
                            my_video_player.play();
                        }
                    });
                };
            }
            else {
                $('.playVidBlock').show();
                my_video_player.seek(0);
                my_video_player.play();
            }


            $('.playVidBlock .closeVid').one('click', function () {
                if (my_video_player) {
                    my_video_player.pause();
                }
                $('.playVidBlock').hide();
            });
        }

        play_ytBlock.on('click', function () {
            showYouTube('G6u-TomcyD4');
        });

        play_monit_1.on('click', function () {
            showYouTube('7Od1V9XH_jI');
        });

        play_monit_2.on('click', function () {
            showYouTube('4WZOkYxe6Xw');
        });

        play_monit_3.on('click', function () {
            showYouTube('Ivot15Rky3U');
        });
    });
    /* youTube scripts */
}());