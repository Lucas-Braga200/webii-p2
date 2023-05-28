const util = {};

util.post = function(url, fields) {
  var $form = $('<form>', {
    action: url,
    method: 'post'
  });
  $.each(fields, function(key, val) {
    $('<input>').attr({
      type: "hidden",
      name: key,
      value: val
    }).appendTo($form);
  });
  $form.appendTo('body').submit();
}
