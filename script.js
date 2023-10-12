document.addEventListener('DOMContentLoaded', () => {
    fetchPhoneData();
    const addCommentButtons = document.querySelectorAll('.add-comment-button');

    addCommentButtons.forEach(button => {
        button.addEventListener('click', () => {
            const commentInput = button.parentElement.querySelector('.comment-input');
            const commentText = commentInput.value.trim();

            if (commentText) {
                const commentList = button.parentElement.parentElement.querySelector('.comment-list');
                const newComment = document.createElement('li');
                newComment.textContent = commentText;

                // Create a delete button for the comment
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.classList.add('delete-button');
                newComment.appendChild(deleteButton);

                // Attach a click event listener to the delete button
                deleteButton.addEventListener('click', () => {
                    deleteComment(newComment);
                });

                commentList.appendChild(newComment);

                // Clear the comment input field
                commentInput.value = '';
            }
        });
    });
});

// Function to delete a comment
function deleteComment(comment) {
    const commentList = comment.parentElement;
    commentList.removeChild(comment);
    // You can also make an API request to delete the comment on the server here.
}

// Function to fetch phone data from the local server
function fetchPhoneData() {
    fetch('http://localhost:3000/phones')
        .then(response => response.json())
        .then(data => {
            // Loop through the data and create product cards
            data.forEach(phone => {
                createProductCard(phone);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Function to create a product card for a phone
function createProductCard(phone) {
    // Create a Bootstrap card element
    const card = document.createElement('div');
    card.classList.add('col-md-4', 'mb-4');

    card.innerHTML = `
        <div class="card">
            <img src="${phone.image}" class="card-img-top" alt="${phone.name}">
            <div class="card-body">
                <h5 class="card-title">${phone.name}</h5>
                <p class="card-text">${phone.description}</p>
                <p class="card-text">$${phone.price}</p>
                <button class="btn btn-primary">Add to Cart</button>
            </div>
        </div>
    `;

    // Append the card to the product row
    document.getElementById('productRow').appendChild(card);
}
