const fs = require('fs');

const baseData = `{
    "commit_comment": [],
    "create": [],
    "delete": [],
    "fork": [],
    "gollum": [],
    "issue_comment": [],
    "issues": [],
    "member": [],
    "public": [],
    "pull_request_review_comment": [],
    "pull_request": [],
    "push_commit": [],
    "repository_dispatch": [],
    "status": [],
    "team_add": [],
    "watch": []
  }`;
  
  async function clear() {
      await fs.writeFileSync('./data.json', baseData);
  }

module.exports = clear;