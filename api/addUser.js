import { Octokit } from '@octokit/rest';

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

export default async (req, res) => {
    if (req.method === 'POST') {
        const userData = req.body;
        const userId = Date.now(); // Generate unique ID for the user
        userData.id = userId;

        try {
            // Fetch the existing users from the GitHub repository
            const { data: fileData } = await octokit.repos.getContent({
                owner: 'your-github-username',
                repo: 'your-repo-name',
                path: 'users.json',
            });

            const users = JSON.parse(Buffer.from(fileData.content, 'base64').toString('utf8'));

            // Add the new user to the list
            users.push(userData);

            // Update the users.json file in the repository
            await octokit.repos.createOrUpdateFileContents({
                owner: 'your-github-username',
                repo: 'your-repo-name',
                path: 'users.json',
                message: `Add user ${userData.name}`,
                content: Buffer.from(JSON.stringify(users, null, 2)).toString('base64'),
                sha: fileData.sha, // Required to update the file
            });

            res.status(200).json({ userId });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to save user data' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};
