const usernameInput = document.getElementById("username"),
	checkForHire = document.querySelector("button"),
	notAUserNotice = document.querySelector(".not-a-user-notice"),
	userInfo = document.querySelector(".user-info"),

	hireable = document.querySelector("strong"),
	profilePicture = document.querySelector("img"),
	link = document.getElementById("profile-link");

function isForHire() {
	const username = usernameInput.value;

	fetch(`/api/is-for-hire/${username}`)
		.then(res => {
			if (!res.ok) {
				throw new Error();
			}

			return res.json();
		})
		.then(profile => {
			profilePicture.setAttribute("src", profile.avatar_url);
			link.setAttribute("href", `https://github.com/${username}`);

			if (profile.hireable) {
				hireable.textContent = "Yes";
				hireable.style.color = "rgb(123, 239, 128)";
			} else {
				hireable.textContent = "No";
				hireable.style.color = "rgb(249, 115, 115)";
			}

			if (userInfo.style.visibility !== "visible") {
				userInfo.style.visibility = "visible";
			}
		})
		.catch(() => {
			notAUserNotice.style.visibility = "visible";
			setTimeout(() => notAUserNotice.style.visibility = "hidden", 1400);
		});
}

checkForHire.addEventListener("click", isForHire);
usernameInput.addEventListener("keyup", event => {
	switch (event.key) {
		case "Enter":
			isForHire();
			break;
	}
});
