const postComment = async (event) => {
  event.preventDefault();
  if (event.target.hasAttribute('data-id')) {
      const blog_id = event.target.getAttribute('data-id');
      const content = document.querySelector(`#comment${blog_id}`).value;
      
      if (content) {
          const response = await fetch(`/api/comments`, {
            method: 'POST',
            body: JSON.stringify({ content, blog_id  }),
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (response.ok) {
            window.location.reload();
          } else {
            alert('Failed to post comment');
          }
      }
  }
}

document
  .querySelector('#commentButton')
  .addEventListener('click', postComment);