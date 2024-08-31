import { Octokit } from '@octokit/rest';

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

export default async (req, res) => {
    if (req.method === 'GET') {
        try {
            const { data: fileData } = await octokit.repos.getContent({
                owner: 'your-github-username',
                repo: 'your-repo-name',
                path: 'users.json',
            });

            const users = JSON.parse(Buffer.from(fileData.content, 'base64').toString('utf8'));
            res.status(200).json(users);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to fetch users' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};
