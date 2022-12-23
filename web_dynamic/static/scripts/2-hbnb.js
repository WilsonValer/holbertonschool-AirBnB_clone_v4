$(document).ready(function () {
/** ****** display checkbox clicked in list *******/
  const checkList = [];
  $('.popover input').change(function () {
    const name = $(this).attr('data-name');
    if ($(this).is(':checked')) {
      checkList.push(name);
    } else {
      const index = checkList.indexOf(name);
      checkList.splice(index, 1);
    }
    let msgFiltered = checkList.join(', ');

    if (msgFiltered.length > 30) {
      msgFiltered = msgFiltered.slice(0, 30) + '...';
    }
    $('.amenities h4').text(msgFiltered);
  });
  $.ajax({
    type: 'GET',
    url: 'http://127.0.0.1:5001/api/v1/status/',
    success: function (data) {
      if (data.status === 'OK') {
        $('div#api_status').addClass('available');
      } else {
        $('div#api_status').removeClass('available');
      }
    },
    error: function () {
      $('div#api_status').removeClass('available');
      console.log('error');
    }
  });
});
