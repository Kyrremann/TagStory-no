function setLanguage() {
    var lang = docCookies.getItem('lang');
    if (lang == null) {
        html10n.localize('en');
        docCookies.setItem('lang', 'en', 86400);
    } else {
        html10n.localize(lang);
    }

    $('.language-flags').children('img').on('click', function() {
        var id = this.id;
        if (id) {
            html10n.localize(id);
            docCookies.setItem('lang', id, 86400);
        }
    })
}

function getStoriesFromServer() {
    var lang = docCookies.getItem('lang');
    $.getJSON("http://tagstoryapi.herokuapp.com/v1/stories?source=tagstory.no&language=" + lang, function( data ) {
        var rightAlign = true;
        $.each( data, function( key, val ) {
            var story = val['value']
            if (rightAlign) {
                var html = '<section class="feature right">\n';
                rightAlign = false;
            } else {
                var html = '<section class="feature left">\n';
                rightAlign = true;
            }

            html += '<img src="https://s3-eu-west-1.amazonaws.com/tagstory/images/' + story["image"] + '" alt="" class="image" />\n';
            html += '<div class="content">\n';
            html += '<h3>' + story["title"] + '</h3>\n';
            html += '<p>' + story['description'] + '</p>\n';
            html += '</div>\n';
            html += '</section>';
            
            $('#list-of-stories').append(html);
        });
    });
}
