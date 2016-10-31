resource "aws_api_gateway_rest_api" "GraphQL" {
  name = "GraphQL"
}

resource "aws_api_gateway_method" "GraphQLMethod" {
  rest_api_id = "${aws_api_gateway_rest_api.GraphQL.id}"
  resource_id = "${aws_api_gateway_rest_api.GraphQL.root_resource_id}"
  http_method = "POST"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "GraphQLIntegration" {
  rest_api_id = "${aws_api_gateway_rest_api.GraphQL.id}"
  resource_id = "${aws_api_gateway_rest_api.GraphQL.root_resource_id}"
  http_method = "${aws_api_gateway_method.GraphQLMethod.http_method}"
  type = "AWS"
  integration_http_method = "POST"
  uri = "arn:aws:apigateway:${var.aws_region}:lambda:path/2015-03-31/functions/${var.apex_function_graphql}/invocations"
}

resource "aws_api_gateway_method_response" "200" {
  rest_api_id = "${aws_api_gateway_rest_api.GraphQL.id}"
  resource_id = "${aws_api_gateway_rest_api.GraphQL.root_resource_id}"
  http_method = "${aws_api_gateway_method.GraphQLMethod.http_method}"
  status_code = "200"
}

resource "aws_api_gateway_deployment" "GraphQLDeployment" {
  depends_on = [
    "aws_api_gateway_integration.GraphQLIntegration",
    "aws_api_gateway_method.GraphQLMethod",
    "aws_api_gateway_method_response.200",
    "aws_api_gateway_integration_response.GraphQLIntegrationResponse"
  ]

  rest_api_id = "${aws_api_gateway_rest_api.GraphQL.id}"
  stage_name = "dev"
}

resource "aws_api_gateway_integration_response" "GraphQLIntegrationResponse" {
  rest_api_id = "${aws_api_gateway_rest_api.GraphQL.id}"
  resource_id = "${aws_api_gateway_rest_api.GraphQL.root_resource_id}"
  http_method = "${aws_api_gateway_method.GraphQLMethod.http_method}"
  status_code = "${aws_api_gateway_method_response.200.status_code}"
}

resource "aws_lambda_permission" "permission_allow_calling_post_from_apigateway" {
    statement_id = "permission_allow_calling_post_from_apigateway"
    action = "lambda:InvokeFunction"
    function_name = "${var.apex_function_graphql}"
    principal = "apigateway.amazonaws.com"
}