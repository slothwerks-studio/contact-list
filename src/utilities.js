// Build function to generate unique identifiers (UUID)
// https://en.wikipedia.org/wiki/Universally_unique_identifier
// https://www.w3resource.com/javascript-exercises/javascript-math-exercise-23.php
export function uuid(){
  let dt = new Date().getTime();
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (dt + Math.random()*16)%16 | 0;
    dt = Math.floor(dt/16);
    return (c == 'x' ? r :(r&0x3|0x8)).toString(16);
  });
  return uuid;
}