function ProdutoCard({ nome, preco, categoria, promocao, children }) {
  return (
    <div className={`produto-card ${promocao ? "promocao" : ""}`}>
      {promocao && <span className="selo-promocao">PROMOÇÃO</span>}

      <h2>{nome}</h2>

      <p className="categoria">{categoria}</p>

      <p className="preco">
        R$ {Number(preco).toFixed(2).replace(".", ",")}
      </p>

      {children}
    </div>
  );
}

export default ProdutoCard;