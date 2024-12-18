
//This handles the fetching the data from the database and helps present them
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Fetch User_Data table
        const userResponse = await fetch('/api/table/user-data');
        const userData = await userResponse.json();
        console.log('User Data:', userData); // Debug: Check if data is fetched
        const userBody = document.getElementById('user-data-body');
        //id, email, password
        userData.forEach(row => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${row.id}</td>
                <td>${row.email}</td>
                <td>${row.password}</td>
            `;
            userBody.appendChild(tr);
        });

        // Fetch Collection table
        const collectionResponse = await fetch('/api/table/collection-data');
        const collectionData = await collectionResponse.json();
        console.log('Collection Data:', collectionData); // Debug: Check if data is fetched
        const collectionBody = document.getElementById('collection-data-body');
        //id, user id, card id, card name, and card image
        collectionData.forEach(row => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${row.id}</td>
                <td>${row.user_id}</td>
                <td>${row.card_id}</td>
                <td>${row.card_name}</td>
                <td><img src="${row.card_image}" alt="${row.card_name}" width="50"></td>
            `;
            collectionBody.appendChild(tr);
        });
    } catch (error) {
        console.error('Error fetching table data:', error); // Debug: Log any errors
    }
});
