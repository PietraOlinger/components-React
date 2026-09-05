import { useState } from "react";

function ProdutoForm({ onAdicionar }) {
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [categoria, setCategoria] = useState("");

  function enviarFormulario(event) {
    event.preventDefault();

    if (!nome || !preco || !categoria) {
      alert("Preencha todos os campos.");
      return;
    }

    const novoProduto = {
      id: Date.now(),
      nome,
      preco: Number(preco),
      categoria,
      promocao: false,
    };

    onAdicionar(novoProduto);

    setNome("");
    setPreco("");
    setCategoria("");
  }

  return (
    <form className="produto-form" onSubmit={enviarFormulario}>
      <h2>Adicionar produto</h2>

      <div className="campos-form">
        <input
          type="text"
          placeholder="Nome do produto"
          value={nome}
          onChange={(event) => setNome(event.target.value)}
        />

        <input
          type="number"
          placeholder="Preço"
          min="0"
          step="0.01"
          value={preco}
          onChange={(event) => setPreco(event.target.value)}
        />

        <select
          value={categoria}
          onChange={(event) => setCategoria(event.target.value)}
        >
          <option value="">Selecione a categoria</option>
          <option value="Informática">Informática</option>
          <option value="Celulares">Celulares</option>
          <option value="Áudio">Áudio</option>
          <option value="Acessórios">Acessórios</option>
        </select>

        <button type="submit">Adicionar produto</button>
      </div>
    </form>
  );
}

export default ProdutoForm;