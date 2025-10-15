const submitPost = document.getElementById('submit-post');
const usernameInput = document.getElementById('username');
const titleInput = document.getElementById('post-title');
const blogInput = document.getElementById('blog-input');
const today = new Date();
const createPostButton = document.getElementById('new-post-button');


let postDate = today.toLocaleDateString('sv-SE', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
});

addEventListener('click', (e) => {
    if (e.target === createPostButton) {
        document.getElementById('submit-post').classList.remove('hidden');
        createPostButton.classList.add('hidden');
    }
});

function createPost(post) {
    const blogPost = document.createElement('div');
    blogPost.className = 'blog-post';

    const postContent = `
        <h2>${post.title}</h2>
        <h4>Författare: ${post.username}</h4>
        <h4>Datum: ${post.date}</h4>
        <p>${post.content}</p>
    `;

    const likeButton = document.createElement('button');
    likeButton.innerHTML = '&#x1F496; 0'; // Heart symbol with initial count
    likeButton.id = 'like-button';
    let likeCount = 0;

    const dislikeButton = document.createElement('button');
    dislikeButton.innerHTML = '&#128078; 0'; // Thumbs down symbol with initial count
    dislikeButton.id = 'dislike-button';
    let dislikeCount = 0;

    likeButton.addEventListener('click', () => {
        likeCount++;
        likeButton.innerHTML = `&#x1F496; ${likeCount}`; // Update like count
    });

    dislikeButton.addEventListener('click', () => {
        dislikeCount++;
        dislikeButton.innerHTML = `&#128078; ${dislikeCount}`; // Update dislike count
    });

    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Radera inlägg';
    deleteButton.id = 'delete-button';

    deleteButton.addEventListener('click', () => {
        blogPost.remove();
    })

    blogPost.innerHTML = postContent;

    const buttonRow = document.createElement('div');
    buttonRow.className = 'button-row';
    buttonRow.appendChild(likeButton);
    buttonRow.appendChild(dislikeButton);
    buttonRow.appendChild(deleteButton);

    blogPost.appendChild(buttonRow);

    document.getElementById('blog-post').appendChild(blogPost);
}

submitPost.addEventListener('submit', (e) => {
    e.preventDefault();

    const post = {
        username: usernameInput.value,
        date: postDate,
        title: titleInput.value,
        content: blogInput.value.replace(/\n/g, '<br>') // Preserve line breaks
    };

    createPost(post);

    // Clear form fields after submission
    usernameInput.value = '';
    titleInput.value = '';
    blogInput.value = '';

    document.getElementById('submit-post').classList.add('hidden');
    createPostButton.classList.remove('hidden');
});