import {render} from '@testing-library/react'
import '@testing-library/jest-dom'
import Book from "./Book";

describe("tests book entry", () => {

    test("test with props", () => {

        const BookElement = render(<Book imageUrl="https://myimage.com" title="Great Title" description="Great Description" />)

        expect(BookElement.container.querySelector("[src='https://myimage.com']")).toBeDefined()
        expect(BookElement.getByText("Great Title")).toBeDefined()
    })
});