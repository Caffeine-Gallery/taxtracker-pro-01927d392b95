import { backend } from 'declarations/backend';

document.addEventListener('DOMContentLoaded', async () => {
    const addTaxPayerForm = document.getElementById('addTaxPayerForm');
    const taxPayerList = document.getElementById('taxPayerList');
    const searchButton = document.getElementById('searchButton');
    const searchResult = document.getElementById('searchResult');

    async function refreshTaxPayerList() {
        const taxPayers = await backend.getAllTaxPayers();
        taxPayerList.innerHTML = '';
        taxPayers.forEach(taxPayer => {
            const li = document.createElement('li');
            li.textContent = `TID: ${taxPayer.tid}, Name: ${taxPayer.firstName} ${taxPayer.lastName}, Address: ${taxPayer.address}`;
            taxPayerList.appendChild(li);
        });
    }

    addTaxPayerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const tid = document.getElementById('tid').value;
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const address = document.getElementById('address').value;

        await backend.addTaxPayer(tid, firstName, lastName, address);
        addTaxPayerForm.reset();
        await refreshTaxPayerList();
    });

    searchButton.addEventListener('click', async () => {
        const searchTid = document.getElementById('searchTid').value;
        const result = await backend.searchTaxPayer(searchTid);
        if (result.length > 0) {
            const taxPayer = result[0];
            searchResult.textContent = `Found: TID: ${taxPayer.tid}, Name: ${taxPayer.firstName} ${taxPayer.lastName}, Address: ${taxPayer.address}`;
        } else {
            searchResult.textContent = 'TaxPayer not found';
        }
    });

    await refreshTaxPayerList();
});
