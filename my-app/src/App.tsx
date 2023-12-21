import { BookList } from "./bookShelf/BookList";
import { AddBook } from "./bookShelf/AddBook";
import {createSignal} from "solid-js";

export type Book = {
    title: string;
    author: string;
};
interface BookshelfProps {
    name: string;
}

const initialBooks: Book[] = [
    {title: "Code Complete", author: "Steve McConnell"},
    {title: "The Hobbit", author: "J.R.R. Tolkien"},
    {title: "Living a Feminist Life", author: "Sarah Ahmed"},
];

function Bookshelf(props: BookshelfProps) {
    const [books, setBooks] = createSignal(initialBooks);
    return (
        <div>
            <h1>{props.name}'s Bookshelf</h1>
            <BookList books={books()} />
            <AddBook setBooks={setBooks} />
        </div>
    );
}
function App() {
    return (
        <Bookshelf name="solid"/>
    );
}
export default App;