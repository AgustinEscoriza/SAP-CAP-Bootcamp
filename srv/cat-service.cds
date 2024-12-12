using {my.bookshop as my} from '../db/Books';


service CatalogService {
    // @readonly entity Books as projection on my.Books;
    entity Books as projection on my.Books;
    function calculateTotalStock() returns Integer;
    action   resetAllBooks()       returns String;

}
