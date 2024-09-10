const fs = require('fs');
const { program } = require('commander');

var data = [];

async function fetchData(username) {
    const response = await fetch(`https://api.github.com/users/${username}/events`);
    data = await response.json();
    data.forEach(event => {
        switch (event.type) {
            case 'CommitCommentEvent':
                console.log(`Commented on commit ${event.repo.name}`);
                break;
            case 'CreateEvent':
                console.log(`Created ${event.repo.name}`);
                break;
            case 'DeleteEvent':
                console.log(`Deleted ${event.repo.name}`);
                break;
            case 'ForkEvent':
                console.log(`Forked ${event.repo.name}`);
                break;
            case 'GollumEvent':
                console.log(`Edited wiki ${event.repo.name}`);
                break;
            case 'IssueCommentEvent':
                console.log(`Commented on issue ${event.repo.name}`);
                break;
            case 'IssuesEvent':
                console.log(`Opened a new issue ${event.repo.name}`);
                break;
            case 'MemberEvent':
                console.log(`${event.payload.member.login} was added to ${event.repo.name}`);
                break;
            case 'PublicEvent':
                console.log(`${event.repo.name} was made public`);
                break;
            case 'PullRequestEvent':
                console.log(`Pull Requested ${event.repo.name}`);
                break;
            case 'PullRequestReviewEvent':
                console.log(`Reviewed pull request ${event.repo.name}`);
                break;
            case 'PullRequestReviewCommentEvent':
                console.log(`Commented on pull request ${event.repo.name}`);
                break;
            case 'PullRequestReviewThreadEvent':
                console.log(`Reviewed pull request ${event.repo.name}`);
                break;
            case 'PushEvent':
                let count = 0;
                let commitMessage = [];
                event.payload.commits.forEach(commit => {
                    if (!commit.message.includes('Merge')){
                        count++;
                        commitMessage.push(commit.message);
                    }
                });
                console.log(`Push ${count} commit(s) to ${event.repo.name}`);
                count = 0;
                commitMessage.forEach(message => {
                    count++;
                    console.log(`\t${count}. ${message}`);
                });
                break;
            case 'ReleaseEvent':
                console.log(`Released ${event.repo.name}`);
                break;
            case 'SponsorshipEvent':
                console.log(`Sponsored ${event.repo.name}`);
                break;
            case 'WatchEvent':
                console.log(`Starred ${event.repo.name}`);
                break;
            default:
                console.log(`Unknown event type: ${event.type}`);
                break;
        }
    });
}

program
    .command('github-motion <username>')
    .action(fetchData);

program.parse(process.argv);