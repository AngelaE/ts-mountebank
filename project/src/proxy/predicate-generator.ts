import { Matches } from './matches';

// this class is not nearly complete,
// should contain more options for proxy generation.
export class PredicateGenerator {
  matches?: Matches = undefined;

  withMatches(matches: Matches): PredicateGenerator {
    this.matches = matches;
    return this;
  }
}
