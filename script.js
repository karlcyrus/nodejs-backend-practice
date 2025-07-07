fetch('/data')
      .then(response => response.json())
      .then(data => {
        const tbody = document.getElementById('data-body');
        tbody.innerHTML = ''; // Clear previous rows

        data.forEach((row, index) => {
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td>${row.ID}</td>
            <td>${row.FirstName}</td>
            <td>${row.LastName}</td>
          `;
          tbody.appendChild(tr);
        });
      })
      .catch(err => console.error('Error loading data:', err));