import {assert} from "chai"
import {FlexiPredicate, Operator} from "./predicate"

describe("Predicate", () => {
    describe("FlexiPredicate", () => {
        describe("#withStartsWith", () => {
            const path = '/here/is/my/path';
            let pred = new FlexiPredicate()
                .withOperator(Operator.startsWith)
                .withPath(path)
                .toJSON();
            console.log(pred);
            it("should have a startsWith operator", () => {
                assert.property(pred, 'startsWith');
            })

            it("should have the expected Path", () => {
                assert.equal(pred.startsWith.path, path);
            })
        })

    })
})
