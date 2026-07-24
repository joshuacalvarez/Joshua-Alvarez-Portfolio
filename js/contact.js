async function loadGitHubProfile() {
    try {
        const response = await fetch(
            "https://api.github.com/users/joshuacalvarez"
        );

        if (!response.ok) {
            throw new Error(`GitHub request failed: ${response.status}`);
        }

        const profile = await response.json();

        document.querySelector("#github-avatar").src = profile.avatar_url;
        document.querySelector("#github-name").textContent =
            profile.name || profile.login;
        document.querySelector("#github-bio").textContent =
            profile.bio || "Software developer and creative builder.";
        document.querySelector("#github-repos").textContent =
            profile.public_repos;
    } catch (error) {
        console.error(error);
        document.querySelector("#github-bio").textContent =
            "Visit my GitHub to explore my projects.";
    }
}

loadGitHubProfile();