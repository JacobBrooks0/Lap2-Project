const { renderDOM } = require("./helpers");

let dom;
let document;

describe("skillsboost/skills", () => {
  beforeEach(async () => {
    dom = await renderDOM("./skills.html");
    document = await dom.window.document;
  });

  it("clicking on the 'create skills class' button leads you to create 'createClass.html' page", async () => {
    const button = document.querySelector("#create");
    expect(button).not.toBe(null);
  });
});
