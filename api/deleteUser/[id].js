import { Octokit } from '@octokit/rest';

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

export default async (req, res) => {
    const { id } = req.query;

    if (req.method === 'DELETE') {
        try {
            const { data: fileData } = await octokit.repos.getContent({
                owner: 'your-github-username',
                repo: 'your-repo-name',
                path: 'users.json',
            });

            let users = JSON.parse(Buffer.from(fileData.content, 'base64').toString('utf8'));

            // Filter out the user to delete
            users = users.filter(user => user.id !== parseInt(id));

            // Update the users.json file in the repository
            await octokit.repos.createOrUpdateFileContents({
                owner: 'your-github-username',
                repo: 'your-repo-name',
                path: 'users.json',
                message: `Delete user ID ${id}`,
                content: Buffer.from(JSON.stringify(users, null, 2)).toString('base64'),
                sha: fileData.sha,
            });

            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to delete user' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};
