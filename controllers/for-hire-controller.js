import { Octokit } from "octokit";

const octokit = new Octokit({
	auth: process.env.TOKEN
});

export async function isForHire(req, res) {
	try {
		const result = await octokit.request("GET /users/{username}", {
			username: req.params.username
		}),
			profile = result.data;

		if (profile.type !== "User") {
			throw new Error();
		}

		res.json({
			avatar_url: profile.avatar_url,
			hireable: profile.hireable
		});
	} catch (error) {
		if (error.response) {
			res.status(error.response.status).json({ message: error.response.data.message });
		} else {
			console.log(error);
		}
	}
}
