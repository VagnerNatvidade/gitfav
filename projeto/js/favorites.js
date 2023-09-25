//classe que vai conter a lógica dos dados
//como os dados serão estruturados
export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root);
    this.load();
  }

  load() {
    this.user = [
      {
        login: "",
        name: "",
        public_repos: "",
        followers: "",
      },
    ];
  }

  delete(user) {
    const filteredUsers = this.user.filter((entry) => {
      
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

    this.user.forEach((user) => {
      const row = this.createRow();

      row.querySelector(
        ".user img"
      ).src = `https://github.com/${user.login}.png`;
      row.querySelector(".user img").alt = `imagem de ${user.name}`;
      row.querySelector(".user p").textContent = user.name;
      row.querySelector(".user span").textContent = user.login;
      row.querySelector(".repositories").textContent = user.public_repos;
      row.querySelector(".followers").textContent = user.followers;

      row.querySelector(".remove").onclick = () => {
        const isOK = confirm("Tem certeza que deseja deletar essa linha?");
        if (isOK) {
          this.delete(user);
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
