document.addEventListener('DOMContentLoaded', function () {
  const starLabels = document.querySelectorAll('.star-rating label');
  console.log(localStorage);
  starLabels.forEach(function (label, index) {
    label.addEventListener('click', function () {
      const rating = index + 1;
      marcarEstrellasSeleccionadas(index);
    });
  });

  const commentForm = document.getElementById('commentForm');
  commentForm && commentForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const productId = obtenerIdProduct();

    const commentText = document.getElementById('commentText');
    let rating = 0;
    const checkedStar = document.querySelectorAll('.star-rating label.checked');
    if (checkedStar) {
      rating = checkedStar.length;
    }

    const body = {
      commentText: commentText.value,
      rating
    }

    fetch(`/products/${productId}/comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    })
      .then(response =>
        response.json()
      )
      .then(review => {
        console.log(review);
        if (review.meta.status == 200) {
          const { comment, rating, created_at , firstName, lastName} = review.data;
          const commentDiv = document.createElement('div');
          commentDiv.classList.add('comment');
          const commentP = document.createElement('p');
          commentP.textContent = comment;
          const usuarioP = document.createElement('p');
          usuarioP.textContent = "Por: "+' '+firstName+' ' +lastName;
          const fechaP = document.createElement('p');
          fechaP.textContent = `Fecha: ${new Date(created_at).toDateString()}`;
          commentDiv.appendChild(commentP);
          commentDiv.appendChild(usuarioP)
          commentDiv.appendChild(fechaP);

          const ratingDiv = document.createElement('div');
          ratingDiv.classList.add('rating');
          for (let i = 0; i < rating; i++) {
            const starFulled = document.createElement('i');
            starFulled.classList.add('fas');
            starFulled.classList.add('fa-star');
            ratingDiv.appendChild(starFulled);
          }
          for (let i = rating; i < 5; i++) {
            const starEmpty = document.createElement('i');
            starEmpty.classList.add('far');
            starEmpty.classList.add('fa-star');
            ratingDiv.appendChild(starEmpty);

          }
          commentDiv.appendChild(ratingDiv);
          const comments = document.querySelector('.comments');
          comments.appendChild(commentDiv);
          console.log(commentText);
          commentText.value = "";
          console.log(commentText);
          checkedStar.forEach(label => label.classList.remove('checked'));
          mostrarToast(review.message);

          

        }
      })
      .catch(error => {
        console.error("Error al enviar el comentario:", error);
      })
  });
  const btnComment = document.getElementById('btnComment')
  console.log(btnComment);
  btnComment.addEventListener('click', ()=>{
    document.getElementById('noComment').classList.add('btnShow')
    commentForm.classList.add('btnShow')
  })

  function marcarEstrellasSeleccionadas(index) {
    const starLabels = document.querySelectorAll('.star-rating label');

    starLabels.forEach(function (label, i) {
      if (i <= index) {
        label.classList.add('checked');
      } else {
        label.classList.remove('checked');
      }
    });
  };

  function obtenerIdProduct() {
    const url = window.location.href;

    const urlParts = url.split('/');
    const lastPart = urlParts[urlParts.length - 1];
    const productId = parseInt(lastPart, 10);
    return productId;
  }

  function mostrarToast(mensaje) {
    const toast = document.getElementById('toast');
    toast.textContent = mensaje;
    toast.classList.add('show');
    setTimeout(function () {
      toast.classList.remove('show');
    }, 3000);
  }
});