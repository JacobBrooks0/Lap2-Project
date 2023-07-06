const { renderDOM } = require("./helpers");

let dom;
let document;
let window;
let oldWindowLocation;

describe("skillsboost/skills", () => {
    const mockWinAssign = jest.fn();
    
  beforeAll(async () => {
    dom = await renderDOM("./skillsboost/skills.html");
      document = await dom.window.document;
      window = dom.window;

    oldWindowLocation = window.location;
    delete window.location;

    dom.window.location = Object.defineProperties(
      {},
      {
        ...Object.getOwnPropertyDescriptors(oldWindowLocation),
        assign: {
          configurable: true,
          value: mockWinAssign,
        },
      }
    );
  });

  afterAll(() => {
    window.location = oldWindowLocation;
  });

//   beforeEach(async () => {
//     dom = await renderDOM("./skillsboost/skills.html");
//     document = await dom.window.document;
//   });

  it("clicking on the 'create skills class' button leads you to create 'createClass.html' page", async () => {
    const classform = document.querySelector("#class-form");
    expect(classform).toBe(null);

    const button = document.querySelector("#create");
    await button.click();

      console.log(mockWinAssign)
    expect(mockWinAssign).toHaveBeenCalledWith('/skillsboos');
  });
});
