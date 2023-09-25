//classe que vai conter a lógica dos dados
//como os dados serão estruturados
export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root);
    this.load();
  }

  load() {
    this.entries = [
      {
        login: "",
        name: "",
        public_repos: "",
        followers: "",
      },
    ];
  }

  delete(entries) {
    const filteredUsers = this.entries.filter((entry) => {
      entry.login !== user.login;
    });
  }
}

//classe que vai criar a vizualização e eventos do HTML
export class FavoritesView extends Favorites {
  //ligação e extensão da Favorites
  constructor(root) {
    super(root); //link entre os construtores
    this.tbody = this.root.querySelector("table tbody");
    this.update();
  }

  update() {
    this.removeAllTr();

    this.entries.forEach((entries) => {
      const row = this.createRow();

      row.querySelector(
        ".user img"
      ).src = `https://github.com/${entries.login}.png`;
      row.querySelector(".user img").alt = `imagem de ${entries.name}`;
      row.querySelector(".user p").textContent = entries.name;
      row.querySelector(".user span").textContent = entries.login;
      row.querySelector(".repositories").textContent = entries.public_repos;
      row.querySelector(".followers").textContent = entries.followers;

      row.querySelector(".remove").onclick = () => {
        const isOK = confirm("Tem certeza que deseja deletar essa linha?");
        if (isOK) {
          this.delete(entries);
        }
      };

      this.tbody.append(row);
    });
  }

  createRow() {
    const tr = document.createElement("tr");

    const data = `
      <td class="user">
        <img
          src="https://github.com/VagnerNatvidade.png"
          alt="imagem de VagnerNatvidade"
        />
        <a href="https://github.com/VagnerNatvidade"
          ><p>Vagner Natividade</p>
          <span>VagnerNatividade</span></a
        >
      </td>
      <td class="repositories">12</td>
      <td class="followers">9898</td>
      <td><button class="remove">&times;</button></td>
      `;

    tr.innerHTML = data;

    return tr;
  }

  removeAllTr() {
    this.tbody.querySelectorAll("tr").forEach((tr) => {
      tr.remove();
    });
  }
}
