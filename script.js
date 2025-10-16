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


// Scroll to top by clicking button
document.getElementById('top-button').addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Show form when clicking "Create Post" button
addEventListener('click', (e) => {
    if (e.target === createPostButton) {
        document.getElementById('submit-post').classList.remove('hidden');
        createPostButton.classList.add('hidden');
    }
});


// Create blog post
function createPost(post) {
    const blogPost = document.createElement('div');
    blogPost.className = 'blog-post';

    const postContent = `
        <h2>${post.title}</h2>
        <h4>Author: ${post.username}</h4>
        <h4>Date: ${post.date}</h4>
        <p>${post.content}</p>
    `;


    // Like button
    const likeButton = document.createElement('button');
    likeButton.innerHTML = '&#x1F496; 0';
    likeButton.id = 'like-button';
    let likeCount = 0;
    
    likeButton.addEventListener('click', () => {
        likeCount++;
        likeButton.innerHTML = `&#x1F496; ${likeCount}`;
    });


    // Dislike button
    const dislikeButton = document.createElement('button');
    dislikeButton.innerHTML = '&#128078; 0';
    dislikeButton.id = 'dislike-button';
    let dislikeCount = 0;

    dislikeButton.addEventListener('click', () => {
        dislikeCount++;
        dislikeButton.innerHTML = `&#128078; ${dislikeCount}`;
    });


    // Delete button
    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete Post';
    deleteButton.id = 'delete-button';

    deleteButton.addEventListener('click', () => {
        if (confirm('Do you want to delete this post?')) {
            blogPost.remove();
        }
    });

    
    // Comment button
    const commentButton = document.createElement('button');
    commentButton.innerText = 'Comment';
    commentButton.id = 'comment-button';
    commentButton.style.marginTop = '1rem';
    
    commentButton.addEventListener('click', () => {
        commentSection.classList.toggle('hidden');
    });
    
    // Comment section
    const commentSection = document.createElement('div');
    commentSection.className = 'comment-section hidden';
    commentSection.style.marginTop = '1rem';

    const commentNameInput = document.createElement('input');
    commentNameInput.type = 'text';
    commentNameInput.placeholder = 'Your name';
    commentSection.appendChild(commentNameInput);
    
    const commentInput = document.createElement('textarea');
    commentInput.placeholder = 'Write a comment...';
    commentSection.appendChild(commentInput);

    const addCommentButton = document.createElement('button');
    addCommentButton.innerText = 'Send';
    commentSection.appendChild(addCommentButton);

    blogPost.innerHTML = postContent;
    
    // Create div for buttons
    const buttonRow = document.createElement('div');
    buttonRow.className = 'button-row';
    buttonRow.appendChild(likeButton);
    buttonRow.appendChild(dislikeButton);
    buttonRow.appendChild(deleteButton);
    
    blogPost.appendChild(buttonRow);
    
    // Add line break
    const hr = document.createElement('hr');
    blogPost.appendChild(hr);

    blogPost.appendChild(commentButton);
    blogPost.appendChild(commentSection);
    
    // Handle comment submission
    addCommentButton.addEventListener('click', () => {
        if (commentNameInput.value && commentInput.value) {
            const comment = document.createElement('div');
            comment.className = 'comment';
            comment.innerHTML = `<h4>${commentNameInput.value} ${postDate}:</h4><p>${commentInput.value.replace(/\n/g, '<br>')}</p>`;
            comment.style.marginTop = '2rem';
            blogPost.appendChild(comment);
            commentNameInput.value = '';
            commentInput.value = '';
            commentSection.classList.add('hidden');
        }

    });

    blogPost.appendChild(commentSection);

    document.getElementById('blog-post').appendChild(blogPost);
}


// Handle form submission
submitPost.addEventListener('submit', (e) => {
    e.preventDefault();

    const post = {
        username: usernameInput.value,
        date: postDate,
        title: titleInput.value,
        content: blogInput.value.replace(/\n/g, '<br>')
    };

    createPost(post);

    // Clear form and hide it
    usernameInput.value = '';
    titleInput.value = '';
    blogInput.value = '';

    document.getElementById('submit-post').classList.add('hidden');
    createPostButton.classList.remove('hidden');
});