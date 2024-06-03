function adicionarImagem() {
    const input = document.getElementById("imagemInput");
    const imagensContainer = document.getElementById("imagensContainer");

   
    if (input.files.length > 0) {
        const imagem = input.files[0];
        const reader = new FileReader();

        reader.onload = function (event) {
            const imagemBase64 = event.target.result;

       
            const numImagens = localStorage.getItem("numImagens") || 0;
            localStorage.setItem(`imagem${numImagens}`, imagemBase64);
            localStorage.setItem("numImagens", parseInt(numImagens) + 1);

  
            exibirImagens();
        };

        reader.readAsDataURL(imagem);
    }
}

function exibirImagens() {
    const imagensContainer = document.getElementById("imagensContainer");
    imagensContainer.innerHTML = "";

    const numImagens = localStorage.getItem("numImagens") || 0;
    for (let i = 0; i < numImagens; i++) {
        const imagemBase64 = localStorage.getItem(`imagem${i}`);
        const imgElement = document.createElement("img");
        imgElement.classList.add("ImagensAll");
        imgElement.src = imagemBase64;
     


        const botaoRemover = document.createElement("button");
        botaoRemover.textContent = "Remover";
        botaoRemover.classList.add("botaoRemover");

        botaoRemover.onclick = function () {
            removerImagem(i);
        };

  
        const container = document.createElement("div");
        container.classList.add("container");

        container.appendChild(imgElement);
        container.appendChild(botaoRemover);

        imagensContainer.appendChild(container);
    }
}

function removerImagem(indice) {
    localStorage.removeItem(`imagem${indice}`);


    exibirImagens();
}


exibirImagens();