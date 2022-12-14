
const addCommentHandler = async (event) => {
    event.preventDefault();
  
    const body = await document.querySelector('#comment-body').value.trim();
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


// event listener for the submit comment button.
if (document.querySelector('.new-comment-form')){
    document
      .querySelector('.new-comment-form')
      .addEventListener('submit', addCommentHandler);
    }

