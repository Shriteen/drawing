function* numGenerator(){
    let count=1;
    while(true)
	yield count++;
}

const numberGenerator= numGenerator();

export default numberGenerator;
