function test() {

  {
    console.log('block scope:')
    var xVar = 'var';
    let xLet = 'let';
    const xConst = 'const';

    console.log('xVar:', xVar);
    console.log('xLet:', xLet);
    console.log('xConst:', xConst);
  }

  console.log('function scope:');
  try {
  console.log('xVar:', xVar);
  }
  catch(e) {
    console.log(e.message);
  }
  try {
    console.log('xLet:', xLet);
  } catch (e) {
    console.log(e.message);
  }
  try {
    console.log('xConst:', xConst);
  } catch (e) {
    console.log(e.message);
  }
}

test();

console.log('global scope:');
try {
  console.log('xVar:', xVar);
}
catch (e) {
  console.log(e.message);
}
try {
  console.log('xLet:', xLet);
} catch (e) {
  console.log(e.message);
}
try {
  console.log('xConst:', xConst);
} catch (e) {
  console.log(e.message);
}
