let vDom;
let prevDOM;

const data = { name: "" };
function changeData(label, value) {
  data[label] = value;
  updateDOM();
}

function createVDOM() {
  return [
    ["input", data.name, handle],
    ["p", `Hello ${data.name}`],
    ["li", "Awesome Work"],
  ];
}

function updateDOM() {
  if (!vDom) {
    vDom = createVDOM();
  } else {
    prevDOM = [...vDom];
    vDom = createVDOM();
    findDiff(prevDOM, vDom);
  }
  let elements = vDom.map(convert);
  document.body.replaceChildren(...elements);
}

function convert(node) {
  const ele = document.createElement(node[0]);
  ele.textContent = node[1];
  ele.value = node[1];
  ele.oninput = node[2];
  return ele;
}

function findDiff(prev, current) {
  for (let i = 0; i < current.length; i++) {
    if (JSON.stringify(prev[i]) != JSON.stringify(current[i])) {
      vDom[i].textContent = current[i][1];
      vDom[i].value = current[i][1];
      vDom[i].oninput = current[i][2];
    }
  }
}

function handle(e) {
  changeData("name", e.target.value);
}

updateDOM();
