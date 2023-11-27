const AllFunctions = (function () {
    let limit = 5;
    let sortColumn = 0;
    let data;

    function getData(callback) {
        $.get("https://jsonplaceholder.typicode.com/users?_limit=" + limit, function (response) {
            console.log(response, "Data1")
            data = response;
            callback(data);
        });
    }

    function populateArea() {
        const areas = Array.from(
            new Set(data.map(item => item.address.city))
        );
        $('#filterArea').html(
            '<option value="">All areas</option>' +
            areas.map(area => `<option value="${area}">${area}</option>`).join('')
        )
    }

    function renderTable() {
        const areaFilterValue = $('#filterArea').val();
        const filterData = areaFilterValue ? data.filter(item => item.address.city === areaFilterValue) : data;
        const groupByValue = $("#groupBy").val();
        const groupedData = groupByValue ? groupBy(filterData, groupByValue) : { '': filterData };
        tableGroupedData(groupedData);
    }

    function groupBy(data, value) {
        const groupedData = {};
        data.forEach(item => {
            const key = item[value];
            if (!groupedData[key]) {
                groupedData[key] = [];
            }
            groupedData[key].push(item);
        });
        return groupedData;
    }

    function tableGroupedData(groupedData) {
        $("#dataTable tbody").empty();
        Object.keys(groupedData).forEach(groupKey => {
            groupedData[groupKey].forEach(item => {
                $("#dataTable tbody").append(`
            <tr>
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.username}</td>
            <td>${item.email}</td>
            <td>${item.address.city}</td>
            <td>${item.address.street}</td>
            <td>${item.address.zipcode}</td>
            <td>${item.phone}</td>
            <td>${item.website}</td>
            <td>${item.company.name}</td>
            </tr>
            `)
            })
        });
    }

    function sortTableRow(sortDirection) {
        const row = $('#dataTable tbody tr').get();

        row.sort(function (a, b) {
            const cellA = $(a).children('td').eq(sortColumn).text().toUpperCase();
            const cellB = $(b).children('td').eq(sortColumn).text().toUpperCase();

            let comparison = 0;
            if (cellA > cellB) {
                comparison = 1;
            } else if (cellA < cellB) {
                comparison = -1;
            }
            return sortDirection === 'desc' ? comparison * -1 : comparison;
        });

        $('#dataTable tbody').empty();
        $.map(row, (row) => {
            $('#dataTable tbody').append(row);
        })
    }

    return {
        getData: getData,
        populateArea: populateArea,
        renderTable: renderTable,
        groupBy: groupBy,
        tableGroupedData: tableGroupedData,
        sortTableRow: sortTableRow
    }
})();