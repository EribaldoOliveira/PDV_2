let itens = [];

function adicionarItem() {
  const nome = document.getElementById("produto-nome").value;
  const quantidade = parseInt(document.getElementById("produto-quantidade").value);
  const preco = parseFloat(document.getElementById("produto-preco").value);

  if (nome && quantidade > 0 && preco >= 0) {
    itens.push({ nome, quantidade, preco });
    atualizarLista();
    calcularTotais();
  }
}

function atualizarLista() {
  const lista = document.getElementById("lista-itens");
  lista.innerHTML = "";
  itens.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.nome} - ${item.quantidade} x R$ ${item.preco.toFixed(2)} = R$ ${(item.quantidade * item.preco).toFixed(2)}`;
    lista.appendChild(li);
  });
}

function calcularTotais() {
  const desconto = parseFloat(document.getElementById("desconto").value) || 0;
  const total = itens.reduce((sum, item) => sum + item.quantidade * item.preco, 0);
  const totalComDesconto = Math.max(total - desconto, 0);

  document.getElementById("total").textContent = total.toFixed(2);
  document.getElementById("total-com-desconto").textContent = totalComDesconto.toFixed(2);
}

function imprimirRecibo(tipo) {
  const nomeCliente = document.getElementById("cliente-nome").value || "---";
  const cpf = document.getElementById("cliente-cpf").value || "---";
  const cnpj = document.getElementById("cliente-cnpj").value || "---";
  const desconto = parseFloat(document.getElementById("desconto").value) || 0;
  const pagamento = document.getElementById("meioPagamento").value;

  const total = itens.reduce((sum, item) => sum + item.quantidade * item.preco, 0);
  const totalComDesconto = Math.max(total - desconto, 0);

  let reciboHTML = "";

  if (tipo === "nota") {
    reciboHTML += `
      <h2>Nota Fiscal</h2>
      <p><strong>Cliente:</strong> ${nomeCliente}</p>
      <p><strong>CPF:</strong> ${cpf}</p>
      <p><strong>CNPJ:</strong> ${cnpj}</p>
      <hr>
      <ul>
        ${itens.map(i => `<li>${i.nome} - ${i.quantidade} x R$ ${i.preco.toFixed(2)} = R$ ${(i.quantidade * i.preco).toFixed(2)}</li>`).join('')}
      </ul>
      <hr>
      <p><strong>Desconto:</strong> R$ ${desconto.toFixed(2)}</p>
      <p><strong>Total:</strong> R$ ${total.toFixed(2)}</p>
      <p><strong>Total com Desconto:</strong> R$ ${totalComDesconto.toFixed(2)}</p>
      <p><strong>Pagamento:</strong> ${pagamento}</p>
    `;
  } else if (tipo === "termica") {
    reciboHTML += `
      <pre style="font-family: monospace;">
********* RECIBO *********
Cliente: ${nomeCliente}
CPF: ${cpf}
CNPJ: ${cnpj}
--------------------------
${itens.map(i => `${i.nome} (${i.quantidade}x) R$ ${i.preco.toFixed(2)}\nSubtotal: R$ ${(i.quantidade * i.preco).toFixed(2)}`).join('\n--------------------------\n')}
--------------------------
Desconto: R$ ${desconto.toFixed(2)}
TOTAL:    R$ ${totalComDesconto.toFixed(2)}
Pagamento: ${pagamento}
***************************
      </pre>
    `;
  }

  const reciboDiv = document.getElementById("recibo-impressao");
  reciboDiv.innerHTML = reciboHTML;

  window.print();
}
