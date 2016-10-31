# Simple-GraphQL-API

###query-project
Project table에서 특정 id를 가진 프로젝트 정보를 가져오는 API입니다.

1. Install all dependencies
  ```
  npm install
  ```

2. Run server in `http://localhost:3000`
  ```
  babel-node index.js
  ```
3. Send test request

  ```
  curl -X POST -H "Content-Type: application/json; charset=utf-8" -d '{"query":"{project(id:6613){id,title,shortDescription}}"}' http://localhost:3000/graphql
  ```
response looks like below
  
  ```
  {
    "data": {
      "project": {
        "id": "6613",
        "title": "1325명을 지키는 한사람이 있습니다. 그는 소방관입니다.",
        "shortDescription": "소방활동과 관련된 여러가지 리워드를 제작하여 함께 공유하고 수익금을 소방관에게 후원합니다."
      }
    }
  }
  ```
