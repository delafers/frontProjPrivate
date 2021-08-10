import React from "react";
import { create } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe("Button component", () => {
    test("it shows the expected text when clicked (testing the wrong way!)", () => {
        const component = create(<ProfileStatus status="SUBSCRIBE" />);
        const instance = component.getInstance();
        expect(instance.state.text).toBe("SUBSCRIBE");
    });
    test("after creation span should be displayed", () => {
        const component = create(<ProfileStatus status="SUBSCRIBE" />);
        const root = component.root;
        expect(() => {
        let input = root.findByType("input")
        }).toThrow();
    });
});