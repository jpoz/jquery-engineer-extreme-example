$(document).ready(function() {
    var body = $('body');
    var main_window = $.objects.make('full_window');
    body.append(main_window);
    
    var split_screen = $.objects.make('split_screen');
    main_window.append(split_screen);
    
    var images_menu = $.objects.make('menu', {title: "Images"});
    split_screen.left_side.append(images_menu);
    split_screen.left_side.width('30%');
    
    var loader = $.objects.make('loader');
    images_menu.menu_content.html(loader);
    
    var image_viewer = $.objects.make('image_viewer');
    split_screen.right_side.append(image_viewer);
    
    $.getJSON('http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + '72b014c8881560f7370899e91d3a41aa&tags=awesome&format=json&jsoncallback=?', function(data) {
          images_menu.menu_content.html($('<div/>', {css: {'clear':'both'}}));
          $.each(data.photos.photo,function(i,p) {
              var new_tile = $.objects.make('flickr_thumb', {flickr_info:p, image_target: image_viewer.image} );
              images_menu.menu_content.prepend(new_tile);
          });
          
          images_menu.resizeMe();
     });
     
});

