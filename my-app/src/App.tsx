import {BookList} from "./bookShelf/BookList";
import {AddBook} from "./bookShelf/AddBook";
import {createSignal, Show} from "solid-js";
import Button from "@suid/material/Button";

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
            <Show when={showForm()}
                  fallback={<Button variant="contained" onClick={() => setShowForm(!showForm())}>Add a new
                      book</Button>}>
                <AddBook setBooks={setBooks}/>
                <Button variant="contained" onClick={() => setShowForm(!showForm())}>Close add book form</Button>
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