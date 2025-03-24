const $body = document.querySelector('body')
const $form = document.querySelector("form");
const $inputSearch = document.querySelector(".input-search-username");
const $darkMode = document.querySelector('.dark-mode')

$darkMode.addEventListener('click', () => {
  if(document.body.classList.contains('dark-mode')) {
    document.body.classList.remove('dark-mode')
  } else {
    document.body.classList.add('dark-mode')
  }
})  

function updatedDataUsername(githubData) {
  const $userPicture = document.querySelector(".user-profile");
  const $usernameMain = document.querySelector(".main-username");
  const $usernameLogin = document.querySelector(".username");
  const $usernameBio = document.querySelector(".user-biography");
  const $reposNumber = document.querySelector(".repos-number");
  const $followersNumber = document.querySelector(".followers-number");
  const $followingNumber = document.querySelector(".following-number");
  const $usernameLocation = document.querySelector(".user-location");
  const $usernameLink = document.querySelector(".user-link");
  const $usernameSocial = document.querySelector(".user-social");
  const $usernameEnterprise = document.querySelector(".user-enterprise");

  $userPicture.src = githubData.avatar_url;
  $usernameMain.textContent = githubData.name;
  $usernameLogin.textContent = "@" + githubData.login;
  $usernameBio.textContent = githubData.bio;
  $reposNumber.textContent = githubData.public_repos;
  $followersNumber.textContent = githubData.followers;
  $followingNumber.textContent = githubData.following;
  $usernameLocation.textContent = githubData.location;
  $usernameLink.textContent = githubData.html_url;
  $usernameLink.setAttribute("href", githubData.html_url);

  if (githubData.twitter_username) {
    $usernameSocial.textContent = githubData.twitter_username;
  }

  if (githubData.company) {
    $usernameEnterprise.textContent = githubData.company;
  }
}

function resetData() {
  if ($inputSearch.value === "") {
    $usernameLogin.textContent = "@nofind"
    // $userPicture.textContent = "Il n'y a pas de photo de profil";
    $usernameBio.textContent = "This profile has no bio";
  }
}

async function getUserInfo(searchedUser) {
  const res = await fetch(`https://api.github.com/users/${searchedUser}`, {
    headers: {
      Authorization: `token ${TOKEN}`,
    },
  });

  const userData = await res.json();
  console.log(userData);
  updatedDataUsername(userData);
}

$form.addEventListener("submit", (event) => {
  event.preventDefault();

  let searchValue = $inputSearch.value.trim();
  getUserInfo(searchValue);
  resetData();
});
