
// function to help us convert line breaks in text entry to '<br/>' for db text storage.
function nl2br (str) {   
  return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ '<br />' +'$2');
}


// event handler for submitting a new blog post.  Will collect and then send the information to our API.
const newPostHandler = async (event) => {
  event.preventDefault();
  
  const title = document.querySelector('#post-title').value.trim();
  const body = nl2br(document.querySelector('#post-body').value.trim());
  const author = document.querySelector('#post-author').value;

  if (title && body && author) {
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({ title, body, author }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create post');
    }
  }
};

// event handler for the delete blog post command.  Will send this information to the API. 
const delButtonHandler = async (event) => {
  event.preventDefault();
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete project');
    }
  }
};

// event handler for the edit blog post link.  Will send user to a form that can edit the blog post.
const editButtonHandler = async (event) => {
  event.preventDefault();
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
    if (id){
      document.location.replace(`/edit-post/${id}`);
    } else {
      alert('Cannot find that project to edit');
    }
      
  }
};

const addCommentHandler = async (event) => {
  event.preventDefault();

  const body = await nl2br(document.querySelector('#comment-body').value.trim());
  const post_id = document.querySelector('#post-id').value;
  
  if (body && post_id) {
      const response = await fetch(`/api/posts/${post_id}/comment`, {
        method: 'POST',
        body: JSON.stringify({ body }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to create project');
      }
    }


  
};

//event listener for submitting a new blog post.
document
  .querySelector('.new-post-form')
  .addEventListener('submit', newPostHandler);

// event listener for the submit comment button.
document
  .querySelector('.new-comment-form')
  .addEventListener('submit', addCommentHandler);

// event listeners for all of the delete buttons for blog posts.
const deleteButtons = document.querySelectorAll('.delete-post-button');
for (let i=0; i< deleteButtons.length; i++){
  deleteButtons[i].addEventListener('click', delButtonHandler);
}

// event listeners for all of the edit buttons for blog posts.
const editButtons = document.querySelectorAll('.edit-post-button');
for (let i=0; i< editButtons.length; i++){
  editButtons[i].addEventListener('click', editButtonHandler);
}
  