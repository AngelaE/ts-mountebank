import {assert} from "chai"
import {Response} from "./response"

describe("Response", () => {
    describe("#withHeader", () => {
        let res = new Response().withHeader("authorization", "bearer")

        it("should have a port", () => {
            assert.equal("bearer", res.headers.get("authorization"))
        })
    })
    describe("#withBody", () => {
        let res = new Response().withJSONBody({ name: "name" })
        it("should have a body", () => {
            assert.isNotNull(res.body)
        })
        it("should have a content-type header", () => {
            assert.equal("application/json", res.headers.get("Content-Type"))
        })
    });
})
