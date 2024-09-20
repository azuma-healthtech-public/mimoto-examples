class AuthResponse {
  final String url;

  const AuthResponse({required this.url});

  factory AuthResponse.fromJson(Map<String, dynamic> json) {
    return switch (json) {
      {
        'url': String url,
      } =>
        AuthResponse(url: url),
      _ => throw const FormatException('Failed to parse auth response.'),
    };
  }
}
