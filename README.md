# Simple-GraphQL-API

###express-query-project
nodjs와 express를 이용하여 구현한 간단한 GraphQL입니다. project id와 함께 request를 보내면 해당 project의 정보를 얻을 수 있습니다. 얻을 수 있는 정보는 `id`, `title`, `permalink`, `fundingGoal`, `shortDescription`로 총 5가지입니다.

1. 의존성 모듈 설치
  ```
  npm install
  ```

2. 서버 시작하기
  ```
  babel-node index.js
  ```
3. 테스트 요청 보내기

  ```
  curl -X POST -H "Content-Type: application/json; charset=utf-8" -d '{"query":"{project(id:6613){id,title,shortDescription}}"}' http://localhost:3000/graphql
  ```
아래와 같은 구조의 응답이 돌아옵니다.
  
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


###apex-query-project
[Apex](https://github.com/apex/apex)를 이용해 project의 정보를 가져오는 Lambda function을 생성 및 배포합니다. 또한 AWS API Gateway를 이용해 endpoint를 만들고 endpoint를 이용해 Lambda function을 호출할 수 있습니다. 프로그램을 실행하기 위해서는 [Apex](http://apex.run/)와 [Terraform](https://www.terraform.io/downloads.html)이 설치되어 있어야 합니다. 

1. 의존성 모듈 설치
  ```
  npm install
  ```
2. AWS 이용을 위해  AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION 값을 환경설정 파일에 입력, 저장합니다. 
3. `project.json` 에서 role 값을 변경해줍니다.
4. `functions/graphql/src/db.js`에서 DB host, user, password, database 값을 입력합니다.

5. graphql function 배포
  ```
  apex deploy
  ```

6. AWS API Gateway를 이용한 endpoint 생성을 위해 먼저, `apex infra plan`을 실행하고 `apex infra apply`를 실행합니다.
7. 배포된 graphql function을 테스트 해봅니다.
  ```
  curl -X POST -H "Content-Type: application/json; charset=utf-8" -d '{"query":"{project(id:6318){id,title,shortDescription}}"}' https://your.graphql.endpoint
  ```


