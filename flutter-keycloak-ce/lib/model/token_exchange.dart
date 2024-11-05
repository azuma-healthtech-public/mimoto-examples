class TokenExchangeResponse {
  final String accessToken;
  final String idToken;

  const TokenExchangeResponse({required this.accessToken, required this.idToken});

  factory TokenExchangeResponse.fromJson(Map<String, dynamic> json) {
    return switch (json) {
      {
        'access_token': String accessToken,
        'id_token': String idToken,
      } =>
          TokenExchangeResponse(accessToken: accessToken, idToken: idToken),
      _ => throw const FormatException('Failed to parse exchange response.'),
    };
  }
}
