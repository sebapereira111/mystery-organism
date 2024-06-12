// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

/*
  Returns an object that contains the properties specimenNum and dna that correspond to the 
  parameters provided. The first parameter is a number (no two organisms should have the same 
  number). The second parameter is an array of 15 DNA bases.

  .mutate() is responsible for randomly selecting a base in the object’s dna property and changing 
  the current base to a different base. Then .mutate() will return the object’s dna.
 
  .compareDNA() has one parameter, another pAequor object. Does not return anything, but prints a 
  message that states the percentage of DNA the two objects have in common.
 
  .willLikelySurvive() returns true if the object’s .dna array contains at least 60% 'C' or 'G' 
  bases. Otherwise, .willLikelySurvive() returns false.

  Further challenge
  .complementStrand() method that returns the complementary DNA strand. The rules are that 'A's match 
  with 'T's and vice versa. Also, 'C's match with 'G's and vice versa.
*/
function pAequorFactory(number, arr) {
  return {
    specimenNum: number,
    dna: arr,
    mutate() {
      // base selected to be mutated
      const base = Math.floor(Math.random() * 15);
      // posible new bases (the original is excluded)
      let dnaBases = ['A', 'T', 'C', 'G'];
      dnaBases = dnaBases.filter(element => element !== this.dna[base]);
      // mutation
      this.dna[base] = dnaBases[Math.floor(Math.random() * 3)];
      // returning the objects dna
      return this.dna;
    },
    compareDNA(other) {
      // variable to count equal bases
      let equal = 0;
      for (let i = 0 ; i < 15 ; i++) {
        // we compare both bases, if they are the same equal is incremented.
        if (other.dna[i] === this.dna[i]) equal++;
      }
      // the percentage is calculated (equal/15)*100 and rounded
      // uncomment following lines to print the comparation between dnas (as in original requirements)
      // console.log(`specimen #${this.specimenNum} and specimen #${other.specimenNum} have ${Math.round((equal / 15) * 100)}% DNA in common.`);
      // uncomment following lines to return the percentage (only number rounded) as in project extension
      return Math.round((equal / 15) * 100)
    },
    willLikelySurvive() {
      // chance variable is incremented if the base is 'C' or 'G'. If it is 9 or more (>=60%) returns true
      let chance = 0;
      this.dna.forEach(element => {if (element === 'C' || element === 'G') chance++;});
      if (chance >= 9) return true;
      return false;
    },
    complementStrand() {
      return this.dna.map(element => {
        switch (element) {
          case 'A':
            return 'T';
          case 'T':
            return 'A';
          case 'C':
            return 'G';
          case 'G':
            return 'C';
        }
      })
    }
  };
}

// With the factory function set up, your team requests that you create 30 instances of pAequor that can survive in their natural environment. Store these instances in an array for your team to study later.
const pAequor30 = [30];

for (let i = 0 ; i < 30 ; i++) {
  pAequor30[i] = pAequorFactory(i, mockUpStrand());
  if (!pAequor30[i].willLikelySurvive()) i--;
}

/*
  Use the .compareDNA() to find the two most related instances of pAequor.
*/
// object to store the two most related instances
const mostRelated = {
  // the 2 most related instances
  spec1: 0,
  spec2: 0,
  // the percentage they are related
  relatedPerc: 0,
  // how many times that percentage was found
  cant: 0
};
let tempPerc;
// all specimens are compared with each other
for (i = 0 ; i < 30 ; i++) {
  for (let j = i + 1 ; j < 30 ; j++) {
    tempPerc = pAequor30[i].compareDNA(pAequor30[j]);
    if (tempPerc  > mostRelated.relatedPerc) {
      // if a percentage above the one stored is found, this is the new one to store
      mostRelated.spec1 = i;
      mostRelated.spec2 = j;
      mostRelated.relatedPerc = tempPerc;
      mostRelated.cant = 1;
    } else if (tempPerc === mostRelated.relatedPerc) {
      // if an equal percentage is found, only the quantity is incremented but the specimens stored are not changed
      mostRelated.cant++;
    }
  }
};
console.log(mostRelated);