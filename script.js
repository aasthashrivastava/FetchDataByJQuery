$(document).ready(function () {

  $("button").click(function () {
    AllFunctions.getData(function (data) {
      AllFunctions.populateArea();
      AllFunctions.renderTable()
    })
  });

  $('#sortButton').on('click', function () {
    $('.sortOrder').toggle();
  });

  $('.sortOrder').on('change', function () {
    const columnIndex = $('.sortOrder').index(this);
    AllFunctions.sortColumn = columnIndex;
    const sortDirection = $(this).val();
    AllFunctions.sortTableRow(sortDirection);
  })

  $('#groupBy').on('change', AllFunctions.renderTable);

})

