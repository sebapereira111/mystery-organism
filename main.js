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
   number). The second parameter is an array of 15 DNA bases. .mutate() is responsible for randomly 
   selecting a base in the object’s dna property and changing the current base to a different base. 
   Then .mutate() will return the object’s dna. .compareDNA() has one parameter, another pAequor 
   object. Does not return anything, but prints a message that states the percentage of DNA the two 
   objects have in common.

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
    }
  }
  // .willLikelySurvive() returns true if the object’s .dna array contains at least 60% 'C' or 'G' bases. Otherwise, .willLikelySurvive() returns false.
  return pAequor;
}


// With the factory function set up, your team requests that you create 30 instances of pAequor that can survive in their natural environment. Store these instances in an array for your team to study later.

let prueba1 = pAequorFactory(1, mockUpStrand());

let prueba2 = pAequorFactory(2, mockUpStrand());

console.log(prueba1.dna);
console.log(prueba2.dna);

prueba1.compareDNA(prueba2);
