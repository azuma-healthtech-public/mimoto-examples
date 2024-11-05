class ExchangeResponse {
  final String redirectUrl;

  const ExchangeResponse({required this.redirectUrl});

  factory ExchangeResponse.fromJson(Map<String, dynamic> json) {
    return switch (json) {
      {
        'redirectUrl': String redirectUrl,
      } =>
        ExchangeResponse(redirectUrl: redirectUrl),
      _ => throw const FormatException('Failed to parse exchange response.'),
    };
  }
}
