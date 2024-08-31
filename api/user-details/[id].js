// /user-details/[id].js

import { Octokit } from '@octokit/rest';

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

export default async function handler(req, res) {
    const { id } = req.query;

    if (req.method === 'GET') {
        try {
            const { data: fileData } = await octokit.repos.getContent({
                owner: 'your-github-username',
                repo: 'your-repo-name',
                path: 'users.json',
            });

            const users = JSON.parse(Buffer.from(fileData.content, 'base64').toString('utf8'));
            const user = users.find(u => u.id === parseInt(id));

            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to fetch user data' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
