$(document).ready(function () {
    // Load characters from JSON file
    $.ajax({
        url: 'data/characters.json',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            // Populate characters table
            populateTable(data);

            // Add event listeners
            $('#search').on('input', function () {
                searchByName($(this).val());
            });

            $('#filter-am').on('click', function () {
                filterByLastName('A', 'M');
            });

            $('#filter-nz').on('click', function () {
                filterByLastName('N', 'Z');
            });
        },
        error: function (error) {
            console.error('Error loading characters:', error);
        }
    });
});

function populateTable(characters) {
    // Clear table
    $('#characters-table tbody').empty();

    // Add table rows
    characters.forEach(function (character) {
        $('#characters-table tbody').append('<tr><td>' + character.firstName + '</td><td>' + character.lastName + '</td><td>' + character.age + '</td><td>' + character.occupation + '</td><td>' + character.show + '</td></tr>');
    });

    updateFilterCounts();
}

function searchByName(searchTerm) {
    // Reset styles
    $('#characters-table tbody tr').css({ 'background-color': '', 'color': '' });

    // Highlight rows matching the search term
    $('#characters-table tbody td:first-child:contains("' + searchTerm + '")').closest('tr').addClass('highlighted');
}

function filterByLastName(startRange, endRange) {
    // Reset styles
    $('#characters-table tbody tr').css({ 'display': '', 'background-color': '', 'color': '' });

    // Hide rows outside the specified range
    $('#characters-table tbody td:nth-child(2)').filter(function () {
        var lastName = $(this).text();
        return !(lastName >= startRange && lastName <= endRange);
    }).closest('tr').css('display', 'none');

    updateFilterCounts();
}

function updateFilterCounts() {
    var countAM = $('#characters-table tbody td:nth-child(2)').filter(function () {
        var lastName = $(this).text();
        return lastName >= 'A' && lastName <= 'M';
    }).length;

    var countNZ = $('#characters-table tbody td:nth-child(2)').filter(function () {
        var lastName = $(this).text();
        return lastName >= 'N' && lastName <= 'Z';
    }).length;

    $('#filter-am').text('A - M (' + countAM + ')');
    $('#filter-nz').text('N - Z (' + countNZ + ')');
}
