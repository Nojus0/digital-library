import "@testing-library/jest-dom"
import UserResultBook from "./UserResultBook";
import {render} from "@testing-library/react";

describe("test if render's properly", () => {

    test("test if text render's", () => {
        const Element = render(<UserResultBook username="Nojus" role="Administrator" />);

        expect(Element.getByText("N")).toBeDefined()
        expect(Element.container.querySelector(`a[href='/profile/Nojus']`)).toBeDefined()
        expect(Element.getByText("View Profile")).toBeDefined()
    })
})