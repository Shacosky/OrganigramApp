async function fetchEmployees() {
  const res = await fetch('/api/employees');
  return res.json();
}

async function addEmployee(name, managerId) {
  await fetch('/api/employees', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, managerId: managerId ? Number(managerId) : null })
  });
}

function createHierarchy(data) {
  const map = new Map();
  data.forEach(emp => map.set(emp.id, { ...emp, children: [] }));
  let root = null;
  data.forEach(emp => {
    const node = map.get(emp.id);
    if (emp.managerId) {
      const manager = map.get(emp.managerId);
      if (manager) manager.children.push(node);
    } else {
      root = node;
    }
  });
  return root;
}

function renderChart(rootData) {
  d3.select('#chart').selectAll('*').remove();
  const width = document.getElementById('chart').clientWidth;
  const dx = 10;
  const dy = width / 6;
  const tree = d3.tree().nodeSize([dx, dy]);
  const root = d3.hierarchy(rootData);
  tree(root);

  let x0 = Infinity;
  let x1 = -x0;
  root.each(d => {
    if (d.x > x1) x1 = d.x;
    if (d.x < x0) x0 = d.x;
  });

  const svg = d3.select('#chart')
    .append('svg')
    .attr('viewBox', [0, 0, width, x1 - x0 + dx * 2])
    .style('font', '10px sans-serif');

  const g = svg.append('g')
    .attr('transform', `translate(${dy / 3},${dx - x0})`);

  const link = g.append('g')
    .attr('fill', 'none')
    .attr('stroke', '#555')
    .attr('stroke-opacity', 0.4)
    .attr('stroke-width', 1.5)
    .selectAll('path')
    .data(root.links())
    .join('path')
    .attr('d', d3.linkHorizontal()
      .x(d => d.y)
      .y(d => d.x));

  const node = g.append('g')
    .attr('stroke-linejoin', 'round')
    .attr('stroke-width', 3)
    .selectAll('g')
    .data(root.descendants())
    .join('g')
    .attr('transform', d => `translate(${d.y},${d.x})`);

  node.append('circle')
    .attr('fill', d => d.children ? '#555' : '#999')
    .attr('r', 5);

  node.append('text')
    .attr('dy', '0.31em')
    .attr('x', d => d.children ? -6 : 6)
    .attr('text-anchor', d => d.children ? 'end' : 'start')
    .text(d => d.data.name)
    .clone(true).lower()
    .attr('stroke', 'white');
}

async function refresh() {
  const data = await fetchEmployees();
  if (!data.length) return;
  const root = createHierarchy(data);
  renderChart(root);
}

refresh();

const form = document.getElementById('employeeForm');
form.addEventListener('submit', async e => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const managerId = document.getElementById('managerId').value;
  await addEmployee(name, managerId);
  form.reset();
  refresh();
});
