import {assert} from "chai"
import { Matches } from "./matches";
import { PredicateGenerator } from "./predicate-generator";

describe("PredicateGenerator", () => {
    describe("#withMatches", () => {
        let res = new PredicateGenerator().withMatches(new Matches())
        it("should have a predicate generator", () => {
            assert.isNotNull(res.matches)
        })
    });
})
