$(document).ready(function () {
/******** display checkbox clicked in list *******/
  let checkList = [];
  $('.popover input').change(function() {
    let name = $(this).attr('data-name');
    if ($(this).is(':checked')) {
      checkList.push(name);
    } else {
      let index = checkList.indexOf(name);
	  checkList.splice(index, 1);
    }
	let msgFiltered = checkList.join(', ');
    
    if (msgFiltered.length > 30) {
      msgFiltered = msgFiltered.slice(0, 30) + '...';
    }
    $('.amenities h4').text(msgFiltered);
  });
});
