import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from "recharts";
import { fetchDashboard } from "../api";
import { CLASS_COLORS_HEX } from "../constants";

export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboard()
      .then(setData)
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <p className="error-banner">{error}</p>;
  if (!data) return <p className="loading-text">Chargement des données du notebook…</p>;

  const bestModel = [...data.modelComparison].sort((a, b) => b.testAccuracy - a.testAccuracy)[0];

  return (
    <div className="tab-section">
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-value">{data.totalImages.toLocaleString("fr-FR")}</div>
          <div className="stat-label">Images au total</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{data.classes.length}</div>
          <div className="stat-label">Types de sol</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{(bestModel.testAccuracy * 100).toFixed(1)}%</div>
          <div className="stat-label">Meilleure précision — {bestModel.model}</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{data.splitTotals.train + data.splitTotals.val + data.splitTotals.test}</div>
          <div className="stat-label">Images train + val + test</div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <div className="card-title">Répartition des classes</div>
          <div className="card-subtitle">Dataset complet (CyAUG-Dataset, {data.totalImages.toLocaleString("fr-FR")} images)</div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={data.classDistribution} margin={{ left: -10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(43,29,19,0.08)" vertical={false} />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 10.5, fill: "#6b5842" }}
                tickFormatter={(v) => v.replace("_Soil", "")}
              />
              <YAxis tick={{ fontSize: 11, fill: "#6b5842" }} />
              <Tooltip
                formatter={(value, key, props) => [`${value} images (${props.payload.pct}%)`, "Quantité"]}
                contentStyle={{ fontFamily: "IBM Plex Mono", fontSize: 12, borderRadius: 8 }}
              />
              <Bar dataKey="count" radius={[5, 5, 0, 0]}>
                {data.classDistribution.map((entry) => (
                  <Cell key={entry.name} fill={CLASS_COLORS_HEX[entry.name]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <div className="card-title">Répartition train / val / test</div>
          <div className="card-subtitle">{data.splitTotals.train} / {data.splitTotals.val} / {data.splitTotals.test} images</div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={data.splitDistribution} layout="vertical" margin={{ left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(43,29,19,0.08)" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: "#6b5842" }} />
              <YAxis
                type="category"
                dataKey="name"
                width={90}
                tick={{ fontSize: 10, fill: "#6b5842" }}
                tickFormatter={(v) => v.replace("_Soil", "")}
              />
              <Tooltip contentStyle={{ fontFamily: "IBM Plex Mono", fontSize: 12, borderRadius: 8 }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="train" stackId="a" fill="#2b1d13" name="Train" />
              <Bar dataKey="val" stackId="a" fill="#c1531b" name="Validation" />
              <Bar dataKey="test" stackId="a" fill="#d9a441" name="Test" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card">
        <div className="card-title">Comparaison des modèles</div>
        <div className="card-subtitle">Précision et top-3 sur le jeu de test, pour les 4 stratégies entraînées dans le notebook</div>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data.modelComparison} margin={{ left: -10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(43,29,19,0.08)" vertical={false} />
            <XAxis dataKey="model" tick={{ fontSize: 10.5, fill: "#6b5842" }} />
            <YAxis domain={[0, 1]} tickFormatter={(v) => `${(v * 100).toFixed(0)}%`} tick={{ fontSize: 11, fill: "#6b5842" }} />
            <Tooltip
              formatter={(value) => `${(value * 100).toFixed(2)}%`}
              contentStyle={{ fontFamily: "IBM Plex Mono", fontSize: 12, borderRadius: 8 }}
            />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Bar dataKey="testAccuracy" name="Précision" fill="#c1531b" radius={[5, 5, 0, 0]} />
            <Bar dataKey="testTop3Accuracy" name="Top-3" fill="#d9a441" radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="card">
        <div className="card-title">Rapport de classification détaillé</div>
        <div className="card-subtitle">{data.classificationReport.model} — précision globale {(data.classificationReport.accuracy * 100).toFixed(0)}% sur {data.classificationReport.totalSupport} images de test</div>
        <table className="report-table">
          <thead>
            <tr>
              <th>Classe</th>
              <th>Précision</th>
              <th>Rappel</th>
              <th>F1-score</th>
              <th>Support</th>
            </tr>
          </thead>
          <tbody>
            {data.classificationReport.rows.map((row) => (
              <tr key={row.name}>
                <td>{row.name.replace("_", " ")}</td>
                <td>{row.precision.toFixed(2)}</td>
                <td>{row.recall.toFixed(2)}</td>
                <td>{row.f1.toFixed(2)}</td>
                <td>{row.support}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
