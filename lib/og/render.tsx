import { SITE_NAME } from "@/lib/seo/site";

export function renderSocialImage() {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        background: "#ffffff",
        padding: "80px",
        flexDirection: "column",
        justifyContent: "space-between"
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            display: "flex",
            width: 96,
            height: 96,
            borderRadius: 24,
            background: "#d91023",
            color: "#ffffff",
            fontSize: 40,
            fontWeight: 700,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          CL
        </div>
        <div
          style={{
            display: "flex",
            marginLeft: 24,
            fontSize: 30,
            fontWeight: 700,
            color: "#16161a"
          }}
        >
          {SITE_NAME}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: "#16161a",
            lineHeight: 1.1
          }}
        >
          Calculadoras laborales en Perú
        </div>
        <div style={{ fontSize: 30, color: "#667085", marginTop: 20 }}>
          Sueldo neto · CTS · Gratificación
        </div>
      </div>

      <div style={{ display: "flex", fontSize: 26, color: "#d91023", fontWeight: 700 }}>
        Calcula lo que te corresponde en segundos
      </div>
    </div>
  );
}
