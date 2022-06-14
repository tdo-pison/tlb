import  check from '../src/check';

test("Test check for 1 uncompleted task", () => {
  let md: string = `
  Task to be completed
  - [x] task 1
  - [ ] task 2
  - [x] task 3
  `;
  let results = check(md)
  expect(results.total).toBe(3);
  expect(results.remaining).toBe(1);
}); 

test("Test check for no task found", () => {
  let md: string = `No tasks here`;
  let results = check(md)
  expect(results.total).toBe(0)
  expect(results.remaining).toBe(0)
})

test("Test for optional tasks", () => {
  let md: string = `
  Tasks to be completed with optional
  - [x] task 1
  - [ ] task 2 <!-- optional task -->
  - [x] task 3
  `;
  let results = check(md)
  expect(results.total).toBe(2)
  expect(results.remaining).toBe(0)
}) 
