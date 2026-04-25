import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Bar,
  BarChart,
} from "recharts";

const data = [
  {
    name: "Semana 1",
    REMARCAÇÃO: 300,
    MAAS: 400,
    "PETC/UMNR": 240,
    "SPECIAL ASSIST.": 300,
    "ESAN/SVAN": 190,
    REEMBOLSO: 99,
  },
  {
    name: "Semana 2",
    REMARCAÇÃO: 170,
    MAAS: 221,
    "PETC/UMNR": 292,
    "SPECIAL ASSIST.": 411,
    "ESAN/SVAN": 60,
    REEMBOLSO: 533,
  },
  {
    name: "Semana 3",
    REMARCAÇÃO: 420,
    MAAS: 255,
    "PETC/UMNR": 140,
    "SPECIAL ASSIST.": 200,
    "ESAN/SVAN": 20,
    REEMBOLSO: 600,
  },
  {
    name: "Semana 4",
    REMARCAÇÃO: 400,
    MAAS: 455,
    "PETC/UMNR": 140,
    "SPECIAL ASSIST.": 231,
    "ESAN/SVAN": 22,
    REEMBOLSO: 196,
  },
];

const data2 = [
  {
    name: "Arnaldo",
    quantidade: 600,
  },
  {
    name: "Fabiola",
    quantidade: 320,
  },
  {
    name: "Remarcos",
    quantidade: 160,
  },
  {
    name: "Oliveira",
    quantidade: 120,
  },
  {
    name: "Leidiane",
    quantidade: 45,
  },
];

const data3 = [
  {
    name: "Amanda",
    quantidade: 298,
  },
  {
    name: "Rafael",
    quantidade: 120,
  },
  {
    name: "Remarcos",
    quantidade: 54,
  },
  {
    name: "Bruna",
    quantidade: 43,
  },
  {
    name: "Alice",
    quantidade: 12,
  },
];

const colors = [
  "#6366f1",
  "#22c55e",
  "#f59e0b",
  "#ef4444",
  "#14b8a6",
  "#a855f7",
];

export default function DashboardTL() {
  const keys = Object.keys(data[0]).filter((key) => key !== "name");

  return (
    <>
      <div className="h-96 w-[90%] 2xl:h-120">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />

            {keys.map((key, index) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={colors[index % colors.length]}
                strokeWidth={2}
                dot={{ r: 3 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-10 flex w-[90%] justify-center">
        <div className="h-80 w-full 2xl:h-120">
          <h3 className="text-center font-semibold capitalize">
            Agentes com mais <b>ALERTAS</b> pendentes
          </h3>

          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data2}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              {/* 1. Adiciona uma grade leve ao fundo */}
              <CartesianGrid strokeDasharray="3 3" vertical={false} />

              {/* 2. Eixo X: Identifica o nome (troque 'name' pela chave do seu JSON) */}
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6b7280", fontSize: 12 }}
              />

              {/* 3. Eixo Y: Mostra a escala numérica */}
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6b7280", fontSize: 12 }}
              />

              {/* 4. Tooltip: Mostra o valor exato ao passar o mouse */}
              <Tooltip cursor={{ fill: "#f3f4f6" }} />

              <Bar
                dataKey="quantidade"
                fill="#8884d8"
                radius={[4, 4, 0, 0]} // Deixa o topo das barras arredondado
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="h-80 w-full 2xl:h-120">
          <h3 className="text-center font-semibold capitalize">
            Agentes com mais <b>ATENDIMENTOS</b> pendentes
          </h3>

          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data3}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              {/* 1. Adiciona uma grade leve ao fundo */}
              <CartesianGrid strokeDasharray="3 3" vertical={false} />

              {/* 2. Eixo X: Identifica o nome (troque 'name' pela chave do seu JSON) */}
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6b7280", fontSize: 12 }}
              />

              {/* 3. Eixo Y: Mostra a escala numérica */}
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6b7280", fontSize: 12 }}
              />

              {/* 4. Tooltip: Mostra o valor exato ao passar o mouse */}
              <Tooltip cursor={{ fill: "#f3f4f6" }} />

              <Bar
                dataKey="quantidade"
                fill="#8884d8"
                radius={[4, 4, 0, 0]} // Deixa o topo das barras arredondado
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}
