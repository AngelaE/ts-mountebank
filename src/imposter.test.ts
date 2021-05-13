import {DefaultImposter} from "./imposter"
import {HttpMethod} from "./http-method";
import {assert} from "chai"

describe("DefaultImposter", () => {
    let imp = new DefaultImposter("/path",HttpMethod.POST, { name: "test123" }, 200);

    it("should have a default stub", () => {
        assert.isNotNull(imp.stubs[0]);
    })
})
