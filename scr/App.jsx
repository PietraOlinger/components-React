import { useEffect, useState } from "react";
import ProdutoCard from "../src/components/ProdutoCard";
import ProdutoForm from "../src/components/ProdutoForm";
import produtosIniciais from "./data/produtos";
import "./styles.css";

function App() {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todos");
  const [busca, setBusca] = useState("");

  useEffect(() => {
    const controlador = new AbortController();

    async function carregarProdutos() {
      try {
        const resposta = await fetch("/produtos.json", {
          signal: controlador.signal,
        });

        if (!resposta.ok) {
          throw new Error("Não foi possível carregar os produtos.");
        }

        const produtosCarregados = await resposta.json();
        setProdutos(produtosCarregados);
      } catch (error) {
        if (error.name !== "AbortError") {
          setErro("Não foi possível carregar os produtos.");
          setProdutos(produtosIniciais);
        }
      } finally {
        if (!controlador.signal.aborted) {
          setCarregando(false);
        }
      }
    }

    carregarProdutos();

    return () => controlador.abort();
  }, []);

  function adicionarProduto(novoProduto) {
    setProdutos((produtosAtuais) => [
      ...produtosAtuais,
      novoProduto,
    ]);
  }

  function removerProduto(id) {
    setProdutos((produtosAtuais) =>
      produtosAtuais.filter((produto) => produto.id !== id)
    );
  }

  const produtosFiltrados = produtos.filter((produto) => {
    const correspondeCategoria =
      categoriaSelecionada === "Todos" ||
      produto.categoria === categoriaSelecionada;

    const correspondeBusca = produto.nome
      .toLowerCase()
      .includes(busca.toLowerCase());

    return correspondeCategoria && correspondeBusca;
  });

  return (
    <div className="pagina">
      <header className="topo">
        <div>
          <p className="marca">TechStore</p>
          <h1>Catálogo de Produtos</h1>
          <p>Encontre os melhores produtos de tecnologia.</p>
        </div>

        <div className="quantidade">
          {produtos.length} produtos cadastrados
        </div>
      </header>

      <ProdutoForm onAdicionar={adicionarProduto} />

      {erro && <p className="mensagem-erro">{erro}</p>}

      <section className="filtros">
        <div>
          <label>Buscar produto</label>

          <input
            type="text"
            placeholder="Digite o nome..."
            value={busca}
            onChange={(event) => setBusca(event.target.value)}
          />
        </div>

        <div>
          <label>Filtrar por categoria</label>

          <select
            value={categoriaSelecionada}
            onChange={(event) =>
              setCategoriaSelecionada(event.target.value)
            }
          >
            <option value="Todos">Todos</option>
            <option value="Informática">Informática</option>
            <option value="Celulares">Celulares</option>
            <option value="Áudio">Áudio</option>
            <option value="Acessórios">Acessórios</option>
          </select>
        </div>
      </section>

      <section>
        <h2 className="titulo-secao">Produtos</h2>

        {carregando ? (
          <p className="sem-produtos">Carregando produtos...</p>
        ) : produtosFiltrados.length === 0 ? (
          <p className="sem-produtos">
            Nenhum produto encontrado.
          </p>
        ) : (
          <div className="produtos-grid">
            {produtosFiltrados.map((produto) => (
              <ProdutoCard
                key={produto.id}
                nome={produto.nome}
                preco={produto.preco}
                categoria={produto.categoria}
                promocao={produto.promocao}
              >
                <button
                  className="botao-comprar"
                  onClick={() =>
                    alert(`${produto.nome} adicionado ao carrinho!`)
                  }
                >
                  Comprar
                </button>

                <button
                  className="botao-remover"
                  onClick={() => removerProduto(produto.id)}
                >
                  Remover
                </button>
              </ProdutoCard>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default App;