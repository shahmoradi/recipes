// Generate for each header, a different anchor link symbol
// $(function() {
//   return $("h2, h3, h4, h5, h6").each(function(i, el) {
//     var $el, suffix, prefix, id;
//     $el = $(el);
//     id = $el.attr('id');
//     suffix = '<i class="fa fa-link"></i>';
//     if (id) {
//       return $el.append($("<a />").addClass("header-link").attr("href", "#" + id).html(suffix));
//     }
//   });
// });

$(function() {
  return $("h2").each(function(i, el) {
    var $el, suffix, prefix, id;
    $el = $(el);
    id = $el.attr('id');
    if (id) {
        suffix = '<i class="fa fa-link"></i>';
        prefix = '<i class="fa fa-link fa-flip-horizontal"></i>';
        $el = $el.prepend($("<a />").addClass("header-link").attr("href", "#" + id).html(prefix));
        return $el.append($("<a />").addClass("header-link").attr("href", "#" + id).html(suffix));
    }
  });
});

$(function() {
  return $("h3").each(function(i, el) {
    var $el, suffix, prefix, id;
    $el = $(el);
    id = $el.attr('id');
    if (id) {
        suffix =   '<i class="fa fa-link"></i>\
                    <i class="fa fa-link"></i>';
        prefix =   '<i class="fa fa-link fa-flip-horizontal"></i>\
                    <i class="fa fa-link fa-flip-horizontal"></i>';
        $el = $el.prepend($("<a />").addClass("header-link").attr("href", "#" + id).html(prefix));
        return $el.append($("<a />").addClass("header-link").attr("href", "#" + id).html(suffix));
    }
  });
});

$(function() {
  return $("h4").each(function(i, el) {
    var $el, suffix, prefix, id;
    $el = $(el);
    id = $el.attr('id');
    if (id) {
        suffix =   '<i class="fa fa-link"></i>\
                    <i class="fa fa-link"></i>\
                    <i class="fa fa-link"></i>';
        prefix =   '<i class="fa fa-link fa-flip-horizontal"></i>\
                    <i class="fa fa-link fa-flip-horizontal"></i>\
                    <i class="fa fa-link fa-flip-horizontal"></i>';
        $el = $el.prepend($("<a />").addClass("header-link").attr("href", "#" + id).html(prefix));
        return $el.append($("<a />").addClass("header-link").attr("href", "#" + id).html(suffix));
    }
  });
});

$(function() {
  return $("h5").each(function(i, el) {
    var $el, suffix, prefix, id;
    $el = $(el);
    id = $el.attr('id');
    if (id) {
        suffix =   '<i class="fa fa-link"></i>\
                    <i class="fa fa-link"></i>\
                    <i class="fa fa-link"></i>\
                    <i class="fa fa-link"></i>';
        prefix =   '<i class="fa fa-link fa-flip-horizontal"></i>\
                    <i class="fa fa-link fa-flip-horizontal"></i>\
                    <i class="fa fa-link fa-flip-horizontal"></i>\
                    <i class="fa fa-link fa-flip-horizontal"></i>';
        $el = $el.prepend($("<a />").addClass("header-link").attr("href", "#" + id).html(prefix));
        return $el.append($("<a />").addClass("header-link").attr("href", "#" + id).html(suffix));
    }
  });
});

$(function() {
  return $("h6").each(function(i, el) {
    var $el, suffix, prefix, id;
    $el = $(el);
    id = $el.attr('id');
    if (id) {
        suffix =   '<i class="fa fa-link"></i>\
                    <i class="fa fa-link"></i>\
                    <i class="fa fa-link"></i>\
                    <i class="fa fa-link"></i>\
                    <i class="fa fa-link"></i>';
        prefix =   '<i class="fa fa-link fa-flip-horizontal"></i>\
                    <i class="fa fa-link fa-flip-horizontal"></i>\
                    <i class="fa fa-link fa-flip-horizontal"></i>\
                    <i class="fa fa-link fa-flip-horizontal"></i>\
                    <i class="fa fa-link fa-flip-horizontal"></i>';
        $el = $el.prepend($("<a />").addClass("header-link").attr("href", "#" + id).html(prefix));
        return $el.append($("<a />").addClass("header-link").attr("href", "#" + id).html(suffix));
    }
  });
});