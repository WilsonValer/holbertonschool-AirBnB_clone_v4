$(document).ready(function () {
/** ****** display checkbox clicked in list *******/
  const checkList = [];
  const checkListIds = [];
  $('.popover input').change(function () {
    const name = $(this).attr('data-name');
	const id = $(this).attr('data-id');
    const isChecked = $(`.popover input[data-id='${id}']`).is(':checked');
    if ($(this).is(':checked')) {
      checkList.push(name);
	  checkListIds.push(id);
    } else {
      const indexName = checkList.indexOf(name);
      checkList.splice(indexName, 1);
      const indexId = checkListIds.indexOf(id);
      checkListIds.splice(indexId, 1);
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
  $.ajax({
    type: 'POST',
    url: 'http://127.0.0.1:5001/api/v1/places_search/',
    data: '{}',
    contentType: 'application/json',
    success: function (data) {
      for (const places of data) {
        $('section.places').append(`
        <article>
          <div class="title_box">
            <h2>${places.name}</h2>
            <div class="price_by_night">$${places.price_by_night}</div>
          </div>
          <div class="information">
            <div class="max_guest">${places.max_guest} Guest${places.max_guest !== 1 ? 's' : ''}</div>
            <div class="number_rooms">${places.number_rooms} Bedroom${places.number_rooms !== 1 ? 's' : ''}</div>
            <div class="number_bathrooms">${places.number_bathrooms} Bathroom${places.number_bathrooms !== 1 ? 's' : ''}</div>
          </div>
          <div class="user">
            <b>Owner:</b> ${places.userFname} ${places.userLname}
          </div>
          <div class="description">
            ${places.description}
          </div>
        </article>`);
      }
    },
    dataType: 'json'
  });

  $('button[type="button"]').click(function () {
    $.ajax({
	  type: 'POST',
      url: 'http://127.0.0.1:5001/api/v1/places_search/',
      data: JSON.stringify({ amenities: checkListIds }),
	  contentType: 'application/json',
	  success: function (data) {
	    $('section.places').empty();
		console.log(data);
        for (const places of data) {
          $('section.places').append(`
            <article>
              <div class="title_box">
                <h2>${places.name}</h2>
                <div class="price_by_night">$${places.price_by_night}</div>
              </div>
              <div class="information">
                <div class="max_guest">${places.max_guest} Guest${places.max_guest !== 1 ? 's' : ''}</div>
                <div class="number_rooms">${places.number_rooms} Bedroom${places.number_rooms !== 1 ? 's' : ''}</div>
                <div class="number_bathrooms">${places.number_bathrooms} Bathroom${places.number_bathrooms !== 1 ? 's' : ''}</div>
              </div>
              <div class="user">
                <b>Owner:</b> -------
              </div>
              <div class="description">
                ${places.description}
              </div>
            </article>`);
        }
    
	  },
	  dataType: 'json'
	});
  });
});
