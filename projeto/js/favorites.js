import { GithubUser } from "./githubuser.js";

//classe que vai conter a lógica dos dados
//como os dados serão estruturados
export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root);
    this.load();
  }

  load() {
    this.entries = JSON.parse(localStorage.getItem("@github-favorites:")) || [];
  }

  save() {
    localStorage.setItem(`@github-favorites:`, JSON.stringify(this.entries));
  }

  async add(userName) {
    try {
      const user = await GithubUser.search(userName);

      if (user.login == undefined) {
        const userExist = this.entries.find(
          (entry) => entry.login === userName
        );

        if (userExist) {
          throw new Error("Usuário já cadastrado");
        }

        throw new Error("Usuário não encontrado");
      }

      this.entries = [user, ...this.entries];
      this.update();
      this.save();
    } catch (error) {
      alert(error.message);
    }
  }

  delete(user) {
    const filteredEntries = this.entries.filter((entry) => {
      entry.login !== user.login;
    });

    this.entries = filteredEntries;
    this.update();
    this.save();
  }
}

//classe que vai criar a vizualização e eventos do HTML
export class FavoritesView extends Favorites {
  //ligação e extensão da Favorites
  constructor(root) {
    super(root); //link entre os construtores
    this.tbody = this.root.querySelector("table tbody");
    this.update();
    this.onadd();
  }

  onadd() {
    const addButton = this.root.querySelector(".search button");
    addButton.onclick = () => {
      const { value } = this.root.querySelector(".search input");

      this.add(value);
    };
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
      row.querySelector(".user a").href = `https://github.com/${user.login}`;
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
