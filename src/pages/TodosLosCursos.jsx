// src/pages/TodosLosCursos.jsx

import React from "react";

const CURSOS = [
  {
    title: "Tech Total",
    price: 180,
    img: "https://scontent.fpbc2-4.fna.fbcdn.net/v/t39.30808-6/523364387_122105342996944899_657353088638963353_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=127cfc&_nc_ohc=xHLyJz7zLPMQ7kNvwGxeNyt&_nc_oc=AdlH_SChcFqVOemmQIvHd8ZWDLWVAlzMjiuIVxPTBZQse3Ex639XgTGg_1iwy7leXrI&_nc_zt=23&_nc_ht=scontent.fpbc2-4.fna&_nc_gid=TT7SAGzNBHoypMEh0T0KnA&oh=00_AfS00EkDjSDsPDlU5FWrolUmF43mInRwqNtlsQ82zy76cg&oe=68885B63"
  },
  {
    title: "Marketing 360°",
    price: 180,
    img: "https://scontent.fpbc2-4.fna.fbcdn.net/v/t39.30808-6/522981193_122105343032944899_5066629268854598313_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_ohc=OzeyAHCVgMoQ7kNvwEML5mX&_nc_oc=Adlx4LOy8W5yanaX-s861nHIg1rUqER-L3AiRaxdN30zIsS_dijl-EKf-yprW4Qvb-U&_nc_zt=23&_nc_ht=scontent.fpbc2-4.fna&_nc_gid=m0Bs6h-PNlEqABC44SJCAA&oh=00_AfRxm3E4Yz5rUN44tWOnm7tt02x7jB2dAHJxwmjjFb8isw&oe=68884C94"
  },
  {
    title: "Multimedia & Diseño",
    price: 180,
    img: "https://scontent.fpbc2-4.fna.fbcdn.net/v/t39.30808-6/523056064_122105342900944899_3070534625551033663_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=127cfc&_nc_ohc=IqaSx0O39cwQ7kNvwGv-HuC&_nc_oc=AdmiBxVg-yhML91QvhTWi5N8xDWxR4hFoFuCz10GodtdcXKs3tTIKoAS7dX46faviVU&_nc_zt=23&_nc_ht=scontent.fpbc2-4.fna&_nc_gid=sCypC-1UM-bLyvOjgNhRoA&oh=00_AfSc0ZZ657M5plsQzJI_1qeek431BgWgsbHyFFacX8ycew&oe=688876D2"
  },
  {
    title: "Educación Académica",
    price: 180,
    img: "https://scontent.fpbc2-2.fna.fbcdn.net/v/t39.30808-6/522740894_122105343200944899_2644818188344136305_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_ohc=nhF4IBaRrlAQ7kNvwFGkHe3&_nc_oc=Adm2KXBjKDTN34NwaLbRZt6mdsCfJXkgfdQEjr2NVSoPfvBosv5bxQRH6XJu7NQol2E&_nc_zt=23&_nc_ht=scontent.fpbc2-2.fna&_nc_gid=2-QfTjmYWs2VYPLBFCfHqw&oh=00_AfQAOWVdVjyBeHI_QedHwjFyJhSKlSj29lMqQljebH6RxA&oe=688866F7"
  },
  {
    title: "Psicología & Neurociencia",
    price: 180,
    img: "https://scontent.fpbc2-5.fna.fbcdn.net/v/t39.30808-6/523151207_122105342888944899_1440244960909851735_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_ohc=3wLZtA-tRXMQ7kNvwE4hWsh&_nc_oc=AdnGeYLKRyXof77rDE5D16nqa_irv5UgqDco700jd88J-rwH-RlvLeEUNjQpYvuSvMo&_nc_zt=23&_nc_ht=scontent.fpbc2-5.fna&_nc_gid=riBlxb8gJ7yaYewG-cNPAw&oh=00_AfQklTMmejlXUG8PCZmKew2HiFfGfvDUpDlWWfoxJ8dE8Q&oe=688856B8"
  },
  {
    title: "Desarrollo Personal & Mentalidad",
    price: 180,
    img: "https://scontent.fpbc2-5.fna.fbcdn.net/v/t39.30808-6/522641991_122105342894944899_740111498453887178_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=127cfc&_nc_ohc=ytzz_tF9Xg4Q7kNvwFdjx6L&_nc_oc=AdmQNSFcqgQWnqEa-pC5jKlgHRGuZKoV4WZDsz5AMNDKaQyWXECTd-F33c_kp-mTkdo&_nc_zt=23&_nc_ht=scontent.fpbc2-5.fna&_nc_gid=27083AjS-63kSTfYbKemUg&oh=00_AfQ1rvFDVyGVfWXcgDkZWOpDZDTvNHb3Yc8w2Ba3-7_nyA&oe=68885004"
  },
  {
    title: "Librería Digital",
    price: 180,
    img: "https://scontent.fpbc2-4.fna.fbcdn.net/v/t39.30808-6/523285080_122105343344944899_6963865329374069917_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=127cfc&_nc_ohc=bNe-2m23e_oQ7kNvwHdlpxm&_nc_oc=AdktvU7fsaqf-RwN9QQN-g-KjLbt4vNT2X8QNT4opWo9xqYkCje8cxNEwIswmaWeTBI&_nc_zt=23&_nc_ht=scontent.fpbc2-4.fna&_nc_gid=Er3GjS1jxND97e7Fs45odA&oh=00_AfSWJZAKxDmbDWq06hTeWywutOsXJIABRFF7F7ru0dKW4w&oe=68884A49"
  },
  {
    title: "Paquete Idiomas, Pasiones y Finanzas Personales",
    price: 180,
    img: "https://scontent.fpbc2-2.fna.fbcdn.net/v/t39.30808-6/523450832_122105343230944899_8612566556006024417_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_ohc=Kb9Bc3U0awEQ7kNvwE9puiI&_nc_oc=AdkHVYndVBc1IsD7FBADYNEwVLamFYAUYyjMKGdJBaZWSKwcAdFg23HP6BZ1gZHb4K4&_nc_zt=23&_nc_ht=scontent.fpbc2-2.fna&_nc_gid=pW-UtFo7zeCl6bcTzrYOGg&oh=00_AfShdXzttx9zYmcSlg0ykZkKKkMiQeRXic75KFDcop0aPQ&oe=6888616F"
  },
  {
    title: "Habilidades y Manualidades Pro",
    price: 180,
    img: "https://scontent.fpbc2-2.fna.fbcdn.net/v/t39.30808-6/519040441_122105343362944899_4917100436543384696_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_ohc=rlcMm49dY-0Q7kNvwF3oz96&_nc_oc=AdmncNYH4CgxwXXiSSEvSVFDPekozkpnMabHE7ew1-i0YV9jgeil4EcPAXHBsfqLWOo&_nc_zt=23&_nc_ht=scontent.fpbc2-2.fna&_nc_gid=ZyYVfJ1xX-pQCe7MxMB-Zg&oh=00_AfQWN-V3FXyUhDiTAl1mHWwmjchVxBz2dsHoOumEG2j-Fg&oe=68886A5E"
  },
  {
    title: "Gastronomía Completa",
    price: 180,
    img: "https://scontent.fpbc2-2.fna.fbcdn.net/v/t39.30808-6/523272632_122105342822944899_4984505013223839867_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_ohc=UDnhE_i_UoIQ7kNvwH0Xi5C&_nc_oc=AdmlKnERPHArPxQNUWj8WhEHm5DepSlzZQpU9J-WXuV5prCEwMvHB0GEYdTednFntUo&_nc_zt=23&_nc_ht=scontent.fpbc2-2.fna&_nc_gid=eqXpSZVhdd9A1Zc6umG4wQ&oh=00_AfT9eeQxQRVsua8D8cZZ5J9D959QVQjeONu3ct8bo46EFw&oe=688850A3"
  },
  {
    title: "Hacking y Ciberseguridad",
    price: 180,
    img: "https://scontent.fpbc2-4.fna.fbcdn.net/v/t39.30808-6/522979027_122105343224944899_3578293180460841397_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=127cfc&_nc_ohc=NIRgY4cmTCoQ7kNvwEsL6zC&_nc_oc=Adn6HiN-Xz-jmJKa4G3ELaDIVU6g2pyvm_QUcli3eWYvfgUjphRrpMDJVspRHRL3Zp4&_nc_zt=23&_nc_ht=scontent.fpbc2-4.fna&_nc_gid=CG3CPZLIsYhQujhW29-Rag&oh=00_AfTTs7jQSosHUqCMKhktVb13so_MSnD0BjFJj-s1THo2Dw&oe=688850A6"
  },
  {
    title: "Desarrollo Web & Apps",
    price: 180,
    img: "https://scontent.fpbc2-5.fna.fbcdn.net/v/t39.30808-6/523981437_122105343038944899_7985721263466321604_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_ohc=7Z9PAG0y-BEQ7kNvwH2AN88&_nc_oc=AdlX6zD9ITRzRDv0H3ULFmz_vC3c-sE4x5X0p3MrIqt4WEfzDOl3meBYem_IoJ0DkeE&_nc_zt=23&_nc_ht=scontent.fpbc2-5.fna&_nc_gid=16rk8vMPp9Z52cDfJvJKHA&oh=00_AfRryxR2IGESZdUS2b-uL36nQZ5inAb-XJQ67maXLbrDpQ&oe=6888731C"
  }
];

export default function TodosLosCursos() {
  const waLink = (curso) =>
    `https://wa.me/5212321443592?text=${encodeURIComponent(
      `Hola, quiero el curso ${curso}`
    )}`;

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Catálogo de Todos los Cursos</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1rem",
          marginTop: "1rem"
        }}
      >
        {CURSOS.map(({ title, price, img }) => (
          <div
            key={title}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
            }}
          >
            {/* Imagen cargada desde Unsplash */}
            <div style={{ height: "120px", background: "#f5f5f5" }}>
              <img
                src={img}
                alt={title}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

            <div style={{ padding: "0.75rem" }}>
              <h3 style={{ margin: "0 0 0.5rem" }}>{title}</h3>
              <p style={{ margin: "0.5rem 0", fontWeight: "bold" }}>
                ${price} MXN
              </p>
              <a
                href={waLink(title)}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "inline-block",
                  padding: "0.5rem 1rem",
                  background: "#25D366",
                  color: "#fff",
                  borderRadius: "4px",
                  textDecoration: "none"
                }}
              >
                Ver detalles
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}