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
const pAequorFactory = (number, arr) => {
  const pAequor = {
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
      let equal = 0;
      for (let i = 0 ; i < 15 ; i++) {
        if (other.dna[i] === this.dna[i]) equal++;
      }
      console.log(`specimen #${this.specimenNum} and specimen #${other.specimenNum} have ${Math.round((equal / 15) * 100)}% DNA in common.`);
    },
    willLikelySurvive() {
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
  }
  return pAequor;
}

// With the factory function set up, your team requests that you create 30 instances of pAequor that can survive in their natural environment. Store these instances in an array for your team to study later.
const pAequor30 = [30];

for (let i = 0 ; i < 30 ; i++) {
  pAequor30[i] = pAequorFactory(i, mockUpStrand());
  if (!pAequor30[i].willLikelySurvive()) i--;
}

console.log(pAequor30[0].dna);
console.log(pAequor30[0].complementStrand());



// testing the code !!!!!!

