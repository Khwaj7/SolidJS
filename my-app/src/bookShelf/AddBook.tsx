import {createResource, createSignal, For, JSX, Setter, Show} from "solid-js";
import {Book} from "../App";
import {searchBook} from "./searchBook";
import Button from "@suid/material/Button";

interface AddBookProps {
    setBooks: Setter<Book[]>;
}

const emptyBook: Book = {
    author: "",
    title: ""
}

export function AddBook(props: AddBookProps) {
    const [input, setInput] = createSignal('');
    const [query, setQuery] = createSignal('');

    const [isDisabled, setIsDisabled] = createSignal(false);

    const [data] = createResource(query, searchBook);

    return (
        <>
            <form>
                <div>
                    <label for="title">Book name</label>
                    <input id="title" onInput={(e) => {
                        setInput(e.currentTarget.value);
                        console.log(input());
                    }}/>
                </div>
                <Button disabled={isDisabled()} variant="contained" type="submit" onClick={(e) => {
                    e.preventDefault();
                    setIsDisabled(true);
                    setQuery(input);
                }}>Find book
                </Button>
            </form>
            <Show when={!data.loading} fallback={<>Searching...</>}>
                <For each={data()}>
                    {(book) => (
                        <li>
                            {book.title} by {book.author}
                            <Button variant="contained"
                                    aria-label={`Add ${book.title} by ${book.author} to the bookshelf`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setIsDisabled(false);
                                        props.setBooks((books) => [...books, book]);
                                    }}
                            >Add
                            </Button>
                        </li>
                    )}
                </For>
            </ Show>
        </>
    );
}