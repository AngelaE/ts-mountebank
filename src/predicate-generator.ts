import { Matches } from "./matches";

// this class is not nearly complete, 
// should 
export class PredicateGenerator {
    matches?: Matches = undefined;
    
    withMatches(matches: Matches) : PredicateGenerator {
        this.matches = matches;
        return this;
    }
}
