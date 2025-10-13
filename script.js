const submitPost = document.getElementById('submit-post');
const usernameInput = document.getElementById('username');
const postTimeInput = document.getElementById('post-time');
const titleInput = document.getElementById('post-title');
const blogInput = document.getElementById('blog-input');


function createPost(post) {
    const blogPost = document.createElement('div');
    blogPost.className = 'blog-post';

    const postContent = `
        <h2>${post.title}</h2>
        <h4>Författare: ${post.username}</h4>
        <h4>Datum: ${post.date}</h4>
        <p>${post.content}</p>
    `;

    blogPost.innerHTML = postContent;

    document.getElementById('blog-post').appendChild(blogPost);
}

submitPost.addEventListener('submit', (e) => {
    e.preventDefault();

    const post = {
        username: usernameInput.value,
        date: postTimeInput.value,
        title: titleInput.value,
        content: blogInput.value.replace(/\n/g, '<br>') // Preserve line breaks
    };

    createPost(post);

    // Clear form fields after submission
    usernameInput.value = '';
    postTimeInput.value = '';
    titleInput.value = '';
    blogInput.value = '';
});