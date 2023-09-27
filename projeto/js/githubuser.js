export class GithubUser {
  static search(userName) {
    const endpoint = `https://api.github.com/users/${userName}`;

    return fetch(endpoint)
      .then((data) => data.json())
      .then((data) => {
        const { login, name, public_repos, followers } = data;

        return { login, name, public_repos, followers };
      });
  }
}