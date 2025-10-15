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
    likeButton.innerHTML = '&#9829; 0'; // Heart symbol with initial count
    likeButton.className = 'like-button';
    let likeCount = 0;

    likeButton.addEventListener('click', () => {
        likeCount++;
        likeButton.innerHTML = `&#9829; ${likeCount}`; // Update like count
    });

    blogPost.innerHTML = postContent;
    blogPost.appendChild(likeButton);

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