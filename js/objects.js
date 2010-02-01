$.objects.define('flickr_thumb',{
    defaults: { 
        flickr_info: {
            farm: 5,
            id: "4311172196",
            isfamily: 0,
            isfriend: 0,
            ispublic: 1,
            owner: "42536596@N00",
            secret: "beb74dcf10",
            server: "4022",
            title: "_MG_1030",
        }, 
        image_target: $()
    },
    structure: function(options) {
        var photo_base = 'http://farm' + options.flickr_info.farm + '.static.flickr.com/' + options.flickr_info.server + '/' + options.flickr_info.id + '_' + options.flickr_info.secret;
        var photo_thumb = photo_base + '_t.jpg'
        this.photo_url = photo_base + '.jpg'
        
        return $('<div/>',{
            css: {
                background: "url("+photo_thumb+")"
            },
            'class': 'flickr_tile'
        });
    },
    behavior: function(self, options) {
        self.click(function() {
            options.image_target.attr('src', self.photo_url);
        })
    }
});

$.objects.define('menu', {
    defaults: {title:null, content: null},
    structure: function(options) {
        this.menu_content = $('<div/>', {
            class:'menu_content'
        });
        this.header = $('<div/>', {
            class: 'menu_header',
            html: options.title
        });
        return $('<div/>', {
            class: 'menu',
            html: this.header
        }).append(this.menu_content);
    },
    behavior: function(self) {
        self.resizeMe = function() {
            var browser_height = $(window).height();
            var header_height = self.header.height(); 
            
            self.menu_content.height(browser_height - header_height - 50);
        }
        
        $(window).bind("resize", function(){
            self.resizeMe(); 
        });
        
        self.resizeMe();
    }
})

$.objects.define('image_viewer', {
    structure: function(options) {
        this.image = $('<img/>');
        return $('<div/>', {
            class: 'image_viewer',
            html: this.image
        });
    }
});

$.objects.define('split_screen', {
    structure: function(options) {
        var row = $('<tr/>');
        this.left_side = $('<td/>');
        this.right_side = $('<td/>');
        row.append(this.left_side);
        row.append(this.right_side);
        
        return $('<table/>', {
            class: 'split_screen',
            html: row
        });
    }
});

$.objects.define('full_window', {
    defaults: {content:null},
    structure: function(options) {
        return $('<div/>', {
            css: {
              overflow: 'hidden'
            },
            html: options.content
        });
    },
    behavior: function(self) {
        self.resizeMe = function() {
            self.height($(window).height());
            self.width($(window).width());
        }
        
        $(window).bind("resize", function(){
            self.resizeMe(); 
        });
        
        self.resizeMe();
    }
});

$.objects.define('loader', {
   structure: function(options) {
       return $('<img/>', {
           src: 'http://www.ajaxload.info/cache/FF/FF/FF/00/00/00/21-1.gif'
       });
   }
});