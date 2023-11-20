const form = document.getElementById('form')
    
async function handleSubmit(event) {
  event.preventDefault();
  let status = document.getElementById("form_status");
  const formData = new FormData(event.target);
  fetch(event.target.action, {
    method: form.method,
    body: formData,
    headers: {
        'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      status.innerHTML = "Your message has successfully delivered. Thank you!";
      form.reset()
    } else {
      response.json().then(data => {
        if (Object.hasOwn(data, 'errors')) {
          status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
        } else {
          status.innerHTML = "Oops! There was a problem submitting your form"
        }
      })
    }
  }).catch(() => {
    status.innerHTML = "Your message can not delivered. Try again later..."
  });
}
form.addEventListener("submit", handleSubmit)