import {BookList} from "./bookShelf/BookList";
import {AddBook} from "./bookShelf/AddBook";
import {createSignal, Show} from "solid-js";

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
    const [showForm, setShowForm] = createSignal(false);
    return (
        <div>
            <h1>{props.name}'s Bookshelf</h1>
            <BookList books={books()}/>
            <Show when={showForm()} fallback={<button onClick={() => setShowForm(!showForm())}>Add a new book</button>}>
                <AddBook setBooks={setBooks}/>
                <button onClick={() => setShowForm(!showForm())}>Close add book form</button>
            </Show>
        </div>
    );
}

function App() {
    return (
        <Bookshelf name="solid"/>
    );
}

export default App;