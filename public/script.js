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

const chart = new d3.OrgChart().container('#chart');

async function refresh() {
  const data = await fetchEmployees();
  const formatted = data.map(e => ({ id: e.id, parentId: e.managerId, name: e.name }));
  chart.data(formatted).render();
}

refresh();

document.getElementById('employeeForm').addEventListener('submit', async e => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const managerId = document.getElementById('managerId').value;
  await addEmployee(name, managerId);
  e.target.reset();
  refresh();
});
