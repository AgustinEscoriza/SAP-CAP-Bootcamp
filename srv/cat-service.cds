using {my.bookshop as my} from '../db/Books';

// service CatalogService @(
//     path    : '/test',
//     requires: 'authenticated-user'
// ) {
//     entity Books as projection on my.Books
//         actions {
//             action   buyBook()  returns String;
//             function getStock() returns Integer;
//         };

//     function calculateTotalStock() returns Integer;
//     action   resetAllBooks()       returns String;

// }

service CatalogService @(path: '/test') {
    entity Books as projection on my.Books
        actions {
            action   buyBook()  returns String;
            function getStock() returns Integer;
        };

    function calculateTotalStock() returns Integer;
    action   resetAllBooks()       returns String;
}
