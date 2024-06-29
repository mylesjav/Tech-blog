const newFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#blog-title').value.trim();
    const content = document.querySelector('#blog-content').value;
    
    if (title && content) {
      const response = await fetch(`/api/blog`, {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to create blog');
      }
    }
};
  
const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/blog/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to delete blog');
      }
    }
};
const updateButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
      const elementToShow = document.getElementById(`update-form${id}`);
      elementToShow.style.display = 'block';
      const blogTitle = document.getElementById(`blogTitle${id}`).innerHTML;
      const blogContent = document.getElementById(`blogContent${id}`).innerHTML;
      document.querySelector(`.title-form-input${id}`).value = blogTitle;
      document.querySelector(`.content-form-input${id}`).value = blogContent;
    }
}
const saveUpdateButtonHandler = async (event) => {
    event.preventDefault();
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');
        const title = document.querySelector(`.title-form-input${id}`).value;
        const content = document.querySelector(`.content-form-input${id}`).value;
        
        if (title && content) {
            const response = await fetch(`/api/blog/${id}`, {
              method: 'PUT',
              body: JSON.stringify({ id, title, content }),
              headers: {
                'Content-Type': 'application/json',
              },
            });
            if (response.ok) {
              document.location.replace('/dashboard');
            } else {
              alert('Failed to create blog');
            }
        }
    }
}

document
    .querySelector('.new-blog-form')
    .addEventListener('submit', newFormHandler);

for (let index = 0; index < document.querySelectorAll('.deletebutton')
.length; index++) {
    const delButton = document.querySelectorAll('.deletebutton')[index];
    delButton.addEventListener('click', delButtonHandler);
}

for (let index = 0; index < document.querySelectorAll('.updatebutton')
.length; index++) {
    const delButton = document.querySelectorAll('.updatebutton')[index];
    delButton.addEventListener('click', updateButtonHandler);
}

for (let index = 0; index < document.querySelectorAll('.saveUpdateButton')
.length; index++) {
    const delButton = document.querySelectorAll('.saveUpdateButton')[index];
    delButton.addEventListener('click', saveUpdateButtonHandler);
}