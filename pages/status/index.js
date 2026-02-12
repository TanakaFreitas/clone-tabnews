import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <UpdateAt />
      <h2>Database</h2>
      <DatabaseStatus />
    </>
  );
}

function UpdateAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let updatedAtText = "Carregando...";
  if (!isLoading && data) {
    const updatedAt = new Date(data.updated_at);
    updatedAtText = updatedAt.toLocaleString("pt-BR", {
      dateStyle: "short",
      timeStyle: "medium",
    });
  }

  return <div>Última atualização: {updatedAtText}</div>;
}

function DatabaseStatus() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  if (isLoading || !data) {
    return (
      <>
        <div>Versão do banco de dados: Carregando...</div>
        <div>Máximo de conexões: Carregando...</div>
        <div>Conexões abertas: Carregando...</div>
      </>
    );
  }

  return (
    <>
      <div>Versão do banco de dados: {data.dependencies.database.version}</div>
      <div>
        Máximo de conexões: {data.dependencies.database.max_connections}
      </div>
      <div>
        Conexões abertas: {data.dependencies.database.opened_connections}
      </div>
    </>
  );
}
