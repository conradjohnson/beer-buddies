
const addCommentHandler = async (event) => {
    event.preventDefault();

    // const body = await nl2br(document.querySelector('#comment-body').value.trim());
    // const post_id = document.querySelector('#post-id').value;
    const comment = document.querySelector('input[name="post-id"]').value
    const body = document.querySelector('textarea[name="comment-body"]').value

    if (comment && post_id) {
        const response = await fetch(`/api/posts/${post_id}/comment`, {
            
            method: 'POST',
            body: JSON.stringify({ body, comment }),
            headers: {
                'Content-Type': 'application/json',
            },
        });console.log(response)

        if (response.ok) {
            document.location.reload();
        } else {
            alert('Failed to create project');
        }
    }

};
document
  .querySelector('.media')
  .addEventListener('submit', addCommentHandler);