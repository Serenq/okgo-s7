//Элемент в зоне экрана
;(function(){
   function scrollTopListener(){
      var scrollTop = $('html, body').scrollTop();
      var shift = window.innerHeight / 1.2;

      //Прослушка отступов
      $('[class*=scope-me]').each(function(){
         var hasClass = $(this).hasClass('visible');
         var currentElem = Math.ceil( $(this).offset().top - scrollTop );
         var currentElemShift = Math.ceil( $(this).offset().top - (scrollTop + shift) );
         var fullShift = Math.ceil( $(this).offset().top - scrollTop );

         //Один раз выполнить - показать простой блок
         if( !hasClass && currentElemShift <= 0 && currentElem > 0 ){
            $(this).addClass('visible');

            //Один раз выполнить - показать ТОЛЬКО блок с буквами
            if( $(this).hasClass('--scope-me-queue') ){
               //console.log('queue', fullShift);
               //Побуквенная анимация
               iterator( this );
            }
            //console.log('visible', fullShift);
         }
         //Если активный блок скрывается из зоны видимости. Спрятать его.
         /* else {
            if( hasClass && fullShift > window.innerHeight+200 ){
               //Скрыть ТОЛЬКО блок с буквами
               if( $(this).hasClass('--scope-me-queue') ){
                  //Стереть побуквенную анимацию
                  iterator.clear();
               }
               //Скрыть простой блок
               $(this).removeClass('visible');
            }
         } */
      });
   }//Прослушка отступов

   function iterator(elem){
      var children_ln = elem.children.length;
      var interval = null;
      var counter = 0;
      var speed = 100;

      interval = setInterval(function(){
         $(elem).children().eq(counter).addClass('active');

         counter++;
         if(counter > children_ln){
            clearInterval(interval);
         }
      },speed);

      iterator.clear = function(){
         $(elem).children().removeClass('active');
      };
   }
   
   scrollTopListener();
   $(window).on('scroll', scrollTopListener);
}());
//Элемент в зоне экрана

//Организация мониторов
;(function(){
   function monitors(){
      if( $(event.target.closest('a')) ){
         var attribute = $(event.target.closest('a')).attr('data-monitor');

         $('.backstage-clips-block__group-item').addClass('--off');
         $('.backstage-clips-block__group-item.--item_'+attribute).removeClass('--off');

         $('.backstage-clips-block').attr('class','backstage-clips-block active --backStage_'+attribute);
      }
   }

   $('.big-monitor-picture').on('click', function(){
      $('.backstage-clips-block').addClass('active');
   });

   $('.backstage-monitors').on('click', monitors)
}());//Организация мониторов

//Организация кружков и фотогалереи
;(function(){
   var maxLeftImage = 0;

   function compareRandom(a, b) {
      return Math.random() - 0.5;
   }

   // Обработка кружков фотогалереи
   var genCirclesPhoto = function (count) {
      var leftCoun = 0;
      var leftPX = 768;
      var leftStep = 1500;
      var color = [1, 2, 3, 4]; // Цвета

      // Перемешиваем массив
      color.sort(compareRandom);

      var colorI = 0; // Счетчик цветов

      for (i = 1; i <= (count); i++) {

         if (leftCoun == 0) { // Старт кругов
            leftC = -220; //550
            topC = 180; //391
            diameterC = 170;
         } else if (leftCoun == 1) { // Второй
            leftC = 343;
            topC = 0;
            diameterC = 76;
         } else if (leftCoun == 2) { // Третий
            leftC = 564;
            topC = 238; //412
            diameterC = 113;
         } else if (leftCoun == 3) { // Четвертый
            leftC = 1280;
            topC = 180;
            diameterC = 170;
         }

         // Если крeжки уже созданы то значит их нужно откадрировать
         if ( $('.galery-list-circles li' ).length >= count) {
            $( '.galery-list-circles li' ).eq(i - 1)
               .css({
                  'left': (leftPX + leftC),
                  'top': (topC),
                  'width': (diameterC),
                  'height': (diameterC)
               });
         }
         // Иначе создаем
         else {
            $('<li class="c_' + i + '"></li>')
               .appendTo('.galery-list-circles')
               .addClass('color_' + color[colorI])
               .css({
                  'left': (leftPX + leftC),
                  'top': (topC),
                  'width': (diameterC),
                  'height': (diameterC)
               });
         }
         leftCoun++;
         colorI++;

         if (leftCoun > 3) {
            leftCoun = 1;
            leftPX += leftStep;
            color.sort(compareRandom);
            colorI = 0;
         }

      }
   }

   // Обработка самих фотографий в фотогалерее
   var genImagePhoto = function (count) {

      var leftCoun = 0;
      var leftPX = 768;
      var leftStep = 1500;

      for (i = 1; i <= count; i++) {

         if (leftCoun == 0) { // Первая фотография
            leftC = 40;
            topC = 50;
            diameterC = 308;
         } else if (leftCoun == 1) { // Вторая фотография
            leftC = 420;
            topC = 50;
            diameterC = 200;
         } else if (leftCoun == 2) { // Третья фотография
            leftC = 708;
            topC = 90;
            diameterC = 280;
         } else if (leftCoun == 3) { // Четвертая фотография
            leftC = 1070;
            topC = 40;
            diameterC = 205;
         }

         // Если крeжки уже созданы то значит их нужно откадрировать
         if ( $('.galery-list-photos li').length >= count ) {
            $('.galery-list-photos li').eq(i - 1)
               .css({
                  'left': (leftPX + leftC),
                  'top': (topC),
                  'width': (diameterC),
                  'height': (diameterC)
               });
         }
         // Иначе создаем
         else {
            $('<li class="photo_' + i + '"><a href="img/photo/photo_' + i + '.jpg" class="gallery" rel="gallery1"><img src="img/photo/photo_' + i + '_small.png" alt=""></a></li>')
               .appendTo('.galery-list-photos')
               .css({
                  'left': (leftPX + leftC),
                  'top': (topC),
                  'width': (diameterC),
                  'height': (diameterC),
                  'position': 'absolute'
               });
         }
         leftCoun++;

         if (leftCoun > 3) {
            leftCoun = 0;
            leftPX += leftStep;
         }
      }
      maxLeftImage = (leftPX + leftC);
   }//genImagePhoto

   //Навигация
   function photoNavigation(){
      var winW = 1500;
      var speed = 400;
      var counter = 0;
      var photo_ln = null;
      var countLimit = null;
      
      function slideLeft(){
         (counter > 0) ? counter-- : 0;//Диапозон

         $('.galery-list-photos, .galery-list-circles').stop().animate({
            'left': -winW * counter
         }, speed);//Сдвиг в нужную сторону
      };

      function slideRight(){
         (counter < countLimit) ? counter++ : countLimit;//Диапозон

         $('.galery-list-photos, .galery-list-circles').stop().animate({
            'left': -winW * counter
         }, speed);//Сдвиг в нужную сторону
      };

      //Обновление значений для деактивации стрелок.
      function arrowsUpdate(){
         photo_ln = $('.galery-list-photos li').length;
         countLimit = Math.floor(photo_ln / 4);

         (counter <= 0)//Если в начале
            ? $('.photo-galery-navigation__btn.--left').addClass('off')
            : $('.photo-galery-navigation__btn.--left').removeClass('off');

         (counter >= countLimit)//Если в конце
            ? $('.photo-galery-navigation__btn.--right').addClass('off')
            : $('.photo-galery-navigation__btn.--right').removeClass('off');
      }

      //Исполнительная функция
      function readClick(){
         if( counter > 0 && $(event.target).hasClass('--left') ){
            slideLeft();
            arrowsUpdate();
         }

         if( counter < countLimit && $(event.target).hasClass('--right') ){
            slideRight();
            arrowsUpdate();
         }
      }//Исполнительная функция

      //Обновить стрелки сейчас же!
      arrowsUpdate();

      //Внешнее управление
      return {
         slideLeft: slideLeft,
         slideRight: slideRight,
         readClick: readClick,
      }
   }//Навигация

   photoNavigation();

   // Генерируем кружки для фотогалереи
   genCirclesPhoto(20);

   // Генерируем фотографии для фотогалереи
   genImagePhoto(20);
   
   $('.photo-galery-navigation__btn').on("click", photoNavigation().readClick );
   
   $(window).on('resize', function () {

      // Пересчитываем значения кружков
      genCirclesPhoto(20);

      // Пересчитываем значения фотографий      
      genImagePhoto(20);
   });
}()); //Организация кружков и фотогалереи

//Просмотрщик фото
;(function(){
   function photoShow(e){
      e.preventDefault();
      var href = $(e.target.closest('a')).attr('href');
      var index = $(e.target.closest('li')).index();
      var photo_ln = $(e.target.closest('ul')).find('li').length;
      var hrefMass = [];
      var counter = index;

      $('.photoViever').addClass('active');
      $('.photoViever__image').attr('src', href);

      //Получаю массив ссылок доступных элементов
      hrefMass.length = 0;
      for(var i = 0; i < photo_ln; i++){
         hrefMass.push( $('.gallery').eq(i).attr('href') );
      }

      //Закрыть
      function closePhotoShow(){
         $('.photoViever').removeClass('active');
      }//Закрыть

      //Листать куда надо
      function slideTo(){
         if( $(event.target).hasClass('photoViever__next') ){
            (counter < photo_ln-1) ? ++counter : counter = 0;
            $('.photoViever__image').attr('src', hrefMass[counter] );
         }

         if( $(event.target).hasClass('photoViever__prev') ){
            (counter > 0) ? --counter : counter = photo_ln-1;
            $('.photoViever__image').attr('src', hrefMass[counter] );
         }
      }//Листать куда надо

      $('.photoViever__close').on('click', closePhotoShow);
      $('.photoViever').on('click', slideTo);
   }

   $('.gallery').on('click', photoShow);
}());//Просмотрщик фото