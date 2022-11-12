const form = document.getElementById('create_form')

form.addEventListener('submit', (e) => {
  form.classList.add('was-validated')
  if (!form.checkValidity()) {
    e.preventDefault()
    e.stopPropagation()
  }
})