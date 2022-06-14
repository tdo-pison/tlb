import  check from '../src/check';

test("Test check for 1 uncompleted task", () => {
  let md = `
  Task to be completed
  - [x] task 1
  - [ ] task 2
  - [x] task 3
  `;

  let results = check(md)
  expect(results.total).toBe(3);
  expect(results.remaining).toBe(1);
}); 
