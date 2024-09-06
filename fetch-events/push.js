const fs = require('fs');

async function push(username, myData) {
    const response = await fetch(`https://api.github.com/users/${username}/events`);
    const data = await response.json();
    data.forEach(event => {
        if (event.type === 'PushEvent') {
            if (myData.push_commit.find(push => push.name === event.repo.name) === undefined) {
                myData.push_commit.push({ name: event.repo.name, count: 0 });
            } 

            event.payload.commits.forEach(commit => {
                myData.push_commit.find(push => push.name === event.repo.name).count++;
            });
        }
    });
    fs.writeFileSync('./data.json', JSON.stringify(myData, null, 2));
}

module.exports = push;


