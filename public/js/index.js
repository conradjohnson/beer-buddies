function showStuff(show, hide) {
    //show this element by id
    document.getElementById(show).style.display = 'block';
    //hide this element by id
    document.getElementById(hide).style.display = 'none';
  
}


const addCommentHandler = async (event) => {
 
    event.preventDefault();
    const post_id = event.target.querySelector('#post-id').value;
    const body = await event.target.querySelector(`#comment-body-${post_id}`).value.trim();
    
    
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

if (document.querySelector('.hp-comment-form')){

    const commentForms = document.querySelectorAll('.hp-comment-form');
    for (let i=0; i< commentForms.length; i++){
        let newCF = commentForms[i];
        newCF.addEventListener('submit', addCommentHandler);
    }
}




